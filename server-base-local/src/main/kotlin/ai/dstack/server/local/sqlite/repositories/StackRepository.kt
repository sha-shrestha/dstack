package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.StackId
import ai.dstack.server.local.sqlite.model.StackItem
import org.springframework.data.repository.CrudRepository

interface StackRepository : CrudRepository<StackItem, StackId> {
    fun findAllByUser(user: String): Iterable<StackItem>
}