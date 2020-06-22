package ai.dstack.core.backend.local.server.sqlite.services

import ai.dstack.core.api.model.Stack
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.StackService
import ai.dstack.core.backend.local.server.sqlite.model.StackId
import ai.dstack.core.backend.local.server.sqlite.model.StackItem
import ai.dstack.core.backend.local.server.sqlite.model.StackItemHead
import ai.dstack.core.backend.local.server.sqlite.repositories.StackRepository
import ai.dstack.core.backend.local.server.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteStackService @Autowired constructor(private val repository: StackRepository) : StackService {
    override fun get(user: String, name: String): Stack? {
        return repository.findById(mapId(user, name)).toNullable()?.toStack()
    }

    override fun findByUser(user: String, consistent: Boolean): Sequence<Stack> {
        return repository.findAllByUser(user).asSequence().map { it.toStack() }
    }

    override fun create(stack: Stack) {
        if (!repository.existsById(stack.mapId)) {
            repository.save(stack.toStackItem())
        } else throw EntityAlreadyExists()
    }

    override fun delete(stack: Stack) {
        repository.deleteById(stack.mapId)
    }

    override fun update(stack: Stack) {
        repository.save(stack.toStackItem())
    }

    private val Stack.mapId
        get() = mapId(userName, name)

    private fun mapId(user: String, name: String) =
        StackId(user, name)

    private fun StackItem.toStack(): Stack {
        return this.let { s ->
            ai.dstack.core.api.model.Stack(s.user, s.name, s.private, s.head?.let { h ->
                ai.dstack.core.api.model.Head(h.id, h.timestampMillis)
            })
        }
    }

    private fun Stack.toStackItem(): StackItem {
        return this.let { s ->
            StackItem(
                s.userName,
                s.name,
                s.private,
                s.head?.let { h ->
                    StackItemHead(
                        h.id,
                        h.timestampMillis
                    )
                })
        }
    }
}