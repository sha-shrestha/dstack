package ai.dstack.core.api.services

import java.lang.RuntimeException

class EntityAlreadyExists(cause: Throwable? = null) : RuntimeException("Entity already exists", cause)