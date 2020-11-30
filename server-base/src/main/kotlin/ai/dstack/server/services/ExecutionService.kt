package ai.dstack.server.services

import ai.dstack.server.model.*

interface ExecutionService {
    fun execute(stackPath: String, attachment: Attachment, views: List<Map<String, Any?>>?, apply: Boolean): Execution
    fun poll(id: String): Execution?
}