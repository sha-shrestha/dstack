package ai.dstack.server.services

import ai.dstack.server.model.Attachment

interface AttachmentService {
    fun create(attachment: Attachment)
    fun findByFrame(frame: String): List<Attachment>
    fun get(frame: String, index: Int): Attachment?
}