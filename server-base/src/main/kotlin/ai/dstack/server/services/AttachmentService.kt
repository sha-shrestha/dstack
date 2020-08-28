package ai.dstack.server.services

import ai.dstack.server.model.Attachment
import ai.dstack.server.model.Stack

interface AttachmentService {
    fun create(attachment: Attachment)
    fun findByFrame(frame: String): List<Attachment>
    fun get(frame: String, index: Int): Attachment?
    fun deleteByStackPath(stackPath: String)
}