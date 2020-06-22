package ai.dstack.core.api.services

import ai.dstack.core.api.model.Stack

interface StackService {
    fun get(user: String, name: String): Stack?
    fun findByUser(user: String, consistent: Boolean = true): Sequence<Stack>
    fun create(stack: Stack)
    fun delete(stack: Stack)
    fun update(stack: Stack)
}