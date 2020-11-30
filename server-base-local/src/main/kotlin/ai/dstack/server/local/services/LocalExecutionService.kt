package ai.dstack.server.local.services

import ai.dstack.server.model.*
import ai.dstack.server.services.*
import com.fasterxml.jackson.core.type.TypeReference
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

            val executionFile = executionFile(id)
            if (apply) {
                writeExecutionFile(userName, executionFile, id, views)
            }

            val p = getProcess(attachment, userName)
            val command = mutableMapOf<String, Any?>()
            command["views"] = views
            return if (apply) {
                command["id"] = id
                command["user"] = userName
                sendCommand(p, command)
                poll(id)!!
            } else {
                val viewsJson = synchronized(p) {
                    sendCommand(p, command)
                    receiveResponse(p)
                }
                Execution(userName, id, viewsJson.toViews(), ExecutionStatus.Ready, null, null)
            }
        } else {
            Execution(userName, id = id, views = emptyList(), status = ExecutionStatus.Failed, output = null,
                    logs = "The Python executable is not configured.")
        }
    }

    private fun receiveResponse(p: Process) = p.inputStream.bufferedReader().readLine()

    private fun sendCommand(p: Process, command: MutableMap<String, Any?>) {
        p.outputStream.write((commandObjectMapper.writeValueAsString(command) + "\n").toByteArray())
        p.outputStream.flush()
    }

    private fun String?.toViews() =
            commandObjectMapper.readValue(this, object : TypeReference<List<Map<String, Any>>>() {})

    private val processes = mutableMapOf<String, Process>()

    private fun getProcess(attachment: Attachment, userName: String): Process {
        val p = processes.getOrPut(attachment.filePath) {
            val executorFile = executorFile(attachment)
            val commands = mutableListOf(config.pythonExecutable, executorFile.name, executionHome, userName)
            ProcessBuilder(commands).directory(destDir(attachment)).start().also {
                LocalSchedulerService.ErrorLogger(it.errorStream).start()
            }
        }
        return if (p.isAlive) {
            p
        } else {
            processes.remove(attachment.filePath, p)
            getProcess(attachment, userName)
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
    private val commandObjectMapper = ObjectMapper()

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

    private val executorVersion = 2

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
            "with open(\"function.pickle\", \"rb\") as f:\n    func = cloudpickle.load(f)"
        }

        val script = """
            |import cloudpickle
            |import sys
            |import json
            |import traceback
            |from pathlib import Path
            |from dstack.controls import unpack_view
            |from dstack import AutoHandler
            |
            |executions_home = sys.argv[1]
            |
            |with open("controller.pickle", "rb") as f:
            |    controller = cloudpickle.load(f)
            |
            |for c in controller.map.values():
            |    for i in range(len(c._parents)):
            |        c._parents[i] = controller.map[c._parents[i]._id]
            |
            |
            |$loadFuncScript
            |
            |def apply(views, execution_id, user_name):
            |    executions = Path(executions_home)
            |    executions.mkdir(exist_ok=True)
            |    execution_file = executions / (execution_id + '.json')
            |    
            |    execution = {
            |        'user': user_name,
            |        'id': execution_id,
            |        'status': 'RUNNING' if apply else 'READY',
            |        'views': [v.pack() for v in views]
            |    }
            |    
            |    execution_file.write_text(json.dumps(execution))
            |    
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
            |
            |
            |def parse_command(command):
            |    command_json = json.loads(command)
            |    _views = command_json.get("views")
            |    execution_id = command_json.get("id")
            |    views = [unpack_view(v) for v in _views] if _views else None
            |    user_name = command_json.get("user")
            |    return views, execution_id, user_name
            |
            |
            |def print_views_stdout(views):
            |    sys.stdout.write(json.dumps([v.pack() for v in (views or [])], indent=None, separators=(",",":")) + "\n")
            |    sys.stdout.flush()
            |
            |
            |while True:
            |    # TODO: Support timeout in future
            |    command = sys.stdin.readline()
            |    views, execution_id, user_name = parse_command(command)
            |    if views and execution_id and user_name:
            |        apply(views, execution_id, user_name)
            |    else:
            |        # TODO: Make it possible to transport the views state without transporting the entire data
            |        print_views_stdout(controller.list(views))
            |
            """.trimMargin()
        executorFile.writeText(script)
    }
}