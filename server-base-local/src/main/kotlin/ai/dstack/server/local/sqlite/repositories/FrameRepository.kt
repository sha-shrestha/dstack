package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.FrameId
import ai.dstack.server.local.sqlite.model.FrameItem
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.transaction.annotation.Transactional

interface FrameRepository : CrudRepository<FrameItem, FrameId> {
    fun findAllByStack(stackPath: String): Iterable<FrameItem>
    @Modifying
    @Query("delete from FrameItem b where b.stack=:stack")
    @Transactional
    fun deleteAllByStack(@Param("stack") stackPath: String)
}