package ai.dstack.server.local.services

import ai.dstack.server.model.*
import ai.dstack.server.services.*
import com.fasterxml.jackson.databind.ObjectMapper
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.io.*
import java.util.zip.ZipInputStream
import java.io.IOException
import java.util.zip.ZipEntry
import java.io.FileOutputStream
import java.util.*
import java.util.concurrent.TimeUnit


@Component
class LocalExecutionService @Autowired constructor(
        private val config: AppConfig,
        private val fileService: FileService
) : ExecutionService {
    companion object : KLogging()

    private val executionHome = File(config.executionDirectory).absolutePath

    override fun execute(userName: String, attachment: Attachment, views: List<Map<String, Any?>>?, apply: Boolean): Execution {
        val id = UUID.randomUUID().toString()
        return if (config.pythonExecutable != null) {
            extractApplicationIfMissing(attachment)
            val executorFile = executorFile(attachment)

            val executionFile = executionFile(id)
            writeExecutionFile(userName, executionFile, id, views)

            val commands = mutableListOf(config.pythonExecutable, executorFile.name,
                    executionHome, userName, id, if (apply) "True" else "False")
            val p = ProcessBuilder(commands).directory(destDir(attachment)).start()
            LocalSchedulerService.ErrorLogger(p.errorStream).start()
            if (apply) {
                p.waitFor(1, TimeUnit.SECONDS)
            } else {
                p.waitFor()
            }
            poll(id)!!
        } else {
            Execution(userName, id = id, views = emptyList(), status = ExecutionStatus.Failed, output = null,
                    logs = "The Python executable is not configured.")
        }
    }

    override fun poll(id: String): Execution? {
        val executionFile = executionFile(id)
        return if (executionFile.exists()) {
            readExecution(executionFile, id)
        } else {
            null
        }
    }

    private val executionFileObjectMapper = ObjectMapper()

    private fun readExecution(executionFile: File, id: String): Execution {
        val execution = executionFileObjectMapper.readValue(executionFile, Map::class.java)
        val views = execution["views"] as List<Map<String, Any?>>?
        return Execution(execution["user"] as String, id, views,
                ExecutionStatus.fromCode(execution["status"]!!.toString()),
                execution["output"]?.let {
                    val output = it as Map<*, *>
                    ExecutionOutput(output["application"] as String,
                            output["content_type"] as String,
                            output["data"] as String?)
                }, execution["logs"] as String?
        )
    }

    private fun writeExecutionFile(userName: String, executionFile: File, id: String, views: List<Map<String, Any?>>?) {
        executionFile.parentFile.mkdirs()
        val execution = mutableMapOf<String, Any?>()
        execution["user"] = userName
        execution["id"] = id
        if (views != null) {
            execution["views"] = views
        }
        execution["status"] = "SCHEDULED"
        executionFileObjectMapper.writeValue(executionFile, execution)
    }

    private fun extractApplicationIfMissing(attachment: Attachment) {
        val destDir = destDir(attachment)
        val buffer = ByteArray(1024)
        if (!destDir.exists()) {
            destDir.mkdirs()
            val zis = ZipInputStream(ByteArrayInputStream(fileService.get(attachment.filePath)))
            var zipEntry = zis.nextEntry
            while (zipEntry != null) {
                val newFile = newFile(destDir, zipEntry)
                val fos = FileOutputStream(newFile)
                var len: Int
                while (zis.read(buffer).also { len = it } > 0) {
                    fos.write(buffer, 0, len)
                }
                fos.close()
                zipEntry = zis.nextEntry
            }
            zis.closeEntry()
            zis.close()
        }
        val executorFile = executorFile(attachment)
        if (!executorFile.exists()) {
            writeExecutorFile(attachment, executorFile)
        }
    }

    private fun destDir(attachment: Attachment) =
            File(config.appDirectory + "/" + attachment.filePath)

    private val executorVersion = 1

    private fun executorFile(attachment: Attachment) = File(destDir(attachment), "execute_v${executorVersion}.py")

    private fun executionFile(id: String) = File(File(config.executionDirectory), "$id.json")

    private fun newFile(destinationDir: File, zipEntry: ZipEntry): File {
        val destFile = File(destinationDir, zipEntry.name)
        val destDirPath = destinationDir.canonicalPath
        val destFilePath = destFile.canonicalPath
        if (!destFilePath.startsWith(destDirPath + File.separator)) {
            throw IOException("Entry is outside of the target dir: " + zipEntry.name)
        }
        return destFile
    }

    private fun writeExecutorFile(attachment: Attachment, executorFile: File) {
        val functionSettings = attachment.settings["function"] as Map<*, *>

        val loadFuncScript = if (functionSettings["type"] == "source") {
            fun getModuleAndFunc(fullName: String): Pair<String, String> {
                val path = fullName.split(".")
                return Pair(path.subList(0, path.size - 2).joinToString("."), path.last())
            }
            val (module, name) = getModuleAndFunc(functionSettings["data"] as String)
            "from $module import $name as func"
        } else {
            "with open(\"function.pickle\", \"rb\") as f:\n\tfunc = cloudpickle.load(f)"
        }

        val script = """
            |import cloudpickle
            |import sys
            |import json
            |import traceback
            |from pathlib import Path
            |from dstack.application.controls import unpack_view
            |from dstack import AutoHandler
            |
            |executions_home = sys.argv[1]
            |user_name = sys.argv[2]
            |execution_id = sys.argv[3]
            |apply = sys.argv[4] == 'True'
            |
            |with open("controller.pickle", "rb") as f:
            |    controller = cloudpickle.load(f)
            |
            |for c in controller.map.values():
            |    for i in range(len(c._parents)):
            |        c._parents[i] = controller.map[c._parents[i]._id]
            |
            |executions = Path(executions_home)
            |executions.mkdir(exist_ok=True)
            |execution_file = executions / (execution_id + '.json')
            |
            |if execution_file.exists():
            |    execution = json.loads(execution_file.read_bytes())
            |    _views = execution.get("views")
            |    if _views:
            |        views = controller.list([unpack_view(v) for v in _views])
            |    else:
            |        views = controller.list()
            |else:
            |    views = controller.list()
            |
            |execution = {
            |    'user': user_name,
            |    'id': execution_id,
            |    'status': 'RUNNING' if apply else 'READY',
            |    'views': [v.pack() for v in views]
            |}
            |
            |execution_file.write_text(json.dumps(execution))
            |
            |$loadFuncScript
            |
            |if apply:
            |    try:
            |        result = controller.apply(func, views)
            |        execution['status'] = 'FINISHED'
            |        output = {}
            |        encoder = AutoHandler()
            |        frame_data = encoder.encode(result, None, None)
            |        output['application'] = frame_data.application
            |        output['content_type'] = frame_data.content_type
            |        output['data'] = frame_data.data.base64value() 
            |        execution['output'] = output
            |    except Exception:
            |        execution['status'] = 'FAILED'
            |        execution['logs'] = str(traceback.format_exc())
            |    execution_file.write_text(json.dumps(execution))
            """.trimMargin()
        executorFile.writeText(script)
    }
}