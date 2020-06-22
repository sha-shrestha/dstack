package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.StackId
import ai.dstack.core.backend.local.server.sqlite.model.StackItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface StackRepository : CrudRepository<StackItem, StackId> {
    fun findAllByUser(user: String): Iterable<StackItem>
}