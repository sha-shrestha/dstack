package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.CommentItem
import org.springframework.data.repository.CrudRepository

@Deprecated("Gonna be removed in October")
interface CommentRepository : CrudRepository<CommentItem, String> {
    fun findAllByStackPath(stackPath: String): Iterable<CommentItem>
}