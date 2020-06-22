package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.CommentItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CommentRepository : CrudRepository<CommentItem, String> {
    fun findAllByStackPath(stackPath: String): Iterable<CommentItem>
}