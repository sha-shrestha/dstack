package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.AttachId
import ai.dstack.core.backend.local.server.sqlite.model.AttachmentItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface AttachmentRepository : CrudRepository<AttachmentItem, AttachId> {
    fun findAllByFrame(frame: String): Iterable<AttachmentItem>
}