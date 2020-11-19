package ai.dstack.server.services

import ai.dstack.server.model.*

interface ExecutionService {
    fun execute(userName: String, attachment: Attachment, views: List<Map<String, Any?>>?, apply: Boolean): Execution
    fun poll(id: String): Execution?
}