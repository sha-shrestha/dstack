package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.CommentItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Deprecated("Gonna be removed in October")
@Repository
interface CommentRepository : CrudRepository<CommentItem, String> {
    fun findAllByStackPath(stackPath: String): Iterable<CommentItem>
}