package ai.dstack.server.local.cli.sqlite.services

import ai.dstack.server.model.Comment
import ai.dstack.server.services.CommentService
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.local.cli.sqlite.model.CommentItem
import ai.dstack.server.local.cli.sqlite.repositories.CommentRepository
import ai.dstack.server.local.cli.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteCommentService @Autowired constructor(private val repository: CommentRepository) : CommentService {
    override fun get(id: String): Comment? {
        return repository.findById(id).toNullable()?.toComment()
    }

    override fun findByStackPath(path: String): List<Comment> {
        return repository.findAllByStackPath(path).asSequence().map { it.toComment() }.toList()
    }

    override fun create(comment: Comment) {
        if (!repository.existsById(comment.id)) {
            repository.save(comment.toCommentItem())
        } else throw EntityAlreadyExists()
    }

    override fun delete(comment: Comment) {
        repository.deleteById(comment.id)
    }

    override fun update(comment: Comment) {
        repository.save(comment.toCommentItem())
    }

    override fun deleteByStackPath(stackPath: String) {
        repository.deleteAll(repository.findAllByStackPath(stackPath))
    }

    private fun CommentItem.toComment(): Comment {
        return this.let { c ->
            Comment(c.id, c.stackPath, c.user, c.timestamp, c.text)
        }
    }

    private fun Comment.toCommentItem(): CommentItem {
        return this.let { c ->
            CommentItem(
                c.id,
                c.stackPath,
                c.timestampMillis,
                c.userName,
                c.text
            )
        }
    }
}
