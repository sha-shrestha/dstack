package ai.dstack.core.api.services

import ai.dstack.core.api.model.Comment

interface CommentService {
    fun get(id: String): Comment?
    fun findByStackPath(path: String): List<Comment>
    fun create(comment: Comment)
    fun update(comment: Comment)
    fun delete(comment: Comment)
    fun deleteByStackPath(stackPath: String)
}