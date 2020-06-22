package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.FrameId
import ai.dstack.core.backend.local.server.sqlite.model.FrameItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface FrameRepository : CrudRepository<FrameItem, FrameId> {
    fun findAllByStack(stackPath: String): Iterable<FrameItem>
}