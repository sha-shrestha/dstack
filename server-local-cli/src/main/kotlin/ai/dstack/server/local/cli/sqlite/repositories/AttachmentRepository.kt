package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.AttachId
import ai.dstack.server.local.cli.sqlite.model.AttachmentItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface AttachmentRepository : CrudRepository<AttachmentItem, AttachId> {
    fun findAllByFrame(frame: String): Iterable<AttachmentItem>
}