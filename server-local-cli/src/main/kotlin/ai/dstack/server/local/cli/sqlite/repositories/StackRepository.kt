package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.StackId
import ai.dstack.server.local.cli.sqlite.model.StackItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface StackRepository : CrudRepository<StackItem, StackId> {
    fun findAllByUser(user: String): Iterable<StackItem>
}