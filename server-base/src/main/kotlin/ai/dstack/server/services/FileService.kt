package ai.dstack.server.services

import ai.dstack.server.model.User
import java.net.URI

interface FileService {
    fun upload(path: String, user:User): URI
    fun save(path: String, data: ByteArray)
    fun get(path: String): ByteArray
    fun delete(prefix: String)
    fun preview(path: String, length: Long): ByteArray
    fun download(path: String, user: User, filename: String, type: String): URI

    // TODO: New attachment will have "image/svg+xml" type. This code is for legacy attachments.
    fun patchContentType(type: String?) = if (type == "image/svg") "image/svg+xml" else type
}