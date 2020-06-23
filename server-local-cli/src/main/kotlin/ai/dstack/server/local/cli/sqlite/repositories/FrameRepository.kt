package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.FrameId
import ai.dstack.server.local.cli.sqlite.model.FrameItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface FrameRepository : CrudRepository<FrameItem, FrameId> {
    fun findAllByStack(stackPath: String): Iterable<FrameItem>
}