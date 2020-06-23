package ai.dstack.server.services

import ai.dstack.server.model.Stack

interface StackService {
    fun get(user: String, name: String): Stack?
    fun findByUser(user: String, consistent: Boolean = true): Sequence<Stack>
    fun create(stack: Stack)
    fun delete(stack: Stack)
    fun update(stack: Stack)
}