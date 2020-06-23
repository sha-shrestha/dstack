package ai.dstack.server.local.services

import ai.dstack.server.model.User
import ai.dstack.server.services.AppConfig
import ai.dstack.server.services.FileService
import org.apache.commons.io.input.BoundedInputStream
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.io.File
import java.net.URI
import java.net.URLEncoder
import java.nio.charset.StandardCharsets

// TODO: Implement async Jersery controllers for downloading
// https://allegro.tech/2014/10/async-rest.html
// https://stackoverflow.com/questions/40743623/stream-large-responses-with-jersey-asynchronously
@Component
class LocalFileService(@Autowired val config: AppConfig) : FileService {
    init {
        File(config.fileDirectory).mkdirs()
    }

    override fun upload(path: String, user: User): URI {
        return URI.create("${config.address}/api/files/$path?user=${user.name}&code=${user.verificationCode}")
    }

    override fun save(path: String, data: ByteArray) {
        val file = File("${config.fileDirectory}/$path")
        file.parentFile.mkdirs()
        file.writeBytes(data)
    }

    override fun get(path: String): ByteArray {
        return File("${config.fileDirectory}/$path").readBytes()
    }

    override fun delete(prefix: String) {
        File("${config.fileDirectory}/$prefix").deleteRecursively()
    }

    override fun preview(path: String, length: Long): ByteArray {
        return BoundedInputStream(File("${config.fileDirectory}/$path").inputStream(), length).use {
            it.readBytes()
        }
    }

    override fun download(path: String, user: User, filename: String, type: String): URI {
        return URI.create(
            "${config.address}/api/files/$path?user=${user.name}&code=${user.verificationCode}&filename=${filename}&type=${URLEncoder.encode(
                patchContentType(type), StandardCharsets.UTF_8.toString()
            )}"
        )
    }
}