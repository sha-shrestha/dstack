package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.FrameId
import ai.dstack.server.local.cli.sqlite.model.FrameItem
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param
import org.springframework.stereotype.Repository
import org.springframework.transaction.annotation.Transactional

@Repository
interface FrameRepository : CrudRepository<FrameItem, FrameId> {
    fun findAllByStack(stackPath: String): Iterable<FrameItem>
    @Modifying
    @Query("delete from FrameItem b where b.stack=:stack")
    @Transactional
    fun deleteAllByStack(@Param("stack") stackPath: String)
}