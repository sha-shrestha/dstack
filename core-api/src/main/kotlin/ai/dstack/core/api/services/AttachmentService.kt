package ai.dstack.core.api.services

import ai.dstack.core.api.model.Attachment

interface AttachmentService {
    fun create(attachment: Attachment)
    fun findByFrame(frame: String): List<Attachment>
    fun get(frame: String, index: Int): Attachment?
}