package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.AttachId
import ai.dstack.server.local.cli.sqlite.model.AttachmentItem
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface AttachmentRepository : CrudRepository<AttachmentItem, AttachId> {
    fun findAllByFrame(frame: String): Iterable<AttachmentItem>
    @Modifying
    @Query("delete from AttachmentItem b where b.frame like :stack%")
    @Transactional
    fun deleteAllByStack(@Param("stack") stackPath: String)
}