package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.AttachId
import ai.dstack.server.local.sqlite.model.AttachmentItem
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface AttachmentRepository : CrudRepository<AttachmentItem, AttachId> {
    fun findAllByFrame(frame: String): Iterable<AttachmentItem>
    @Modifying
    @Query("delete from AttachmentItem b where b.frame like :stack%")
    @Transactional
    fun deleteAllByStack(@Param("stack") stackPath: String)
}