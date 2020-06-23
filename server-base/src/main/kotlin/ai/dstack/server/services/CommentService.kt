package ai.dstack.server.services

import ai.dstack.server.model.Comment

interface CommentService {
    fun get(id: String): Comment?
    fun findByStackPath(path: String): List<Comment>
    fun create(comment: Comment)
    fun update(comment: Comment)
    fun delete(comment: Comment)
    fun deleteByStackPath(stackPath: String)
}