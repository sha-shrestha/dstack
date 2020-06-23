package ai.dstack.server.services

import java.lang.RuntimeException

class EntityAlreadyExists(cause: Throwable? = null) : RuntimeException("Entity already exists", cause)