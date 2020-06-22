package ai.dstack.core.api.model

import java.lang.IllegalStateException

data class Permission(
    val path: String,
    val identity: String
) {
    val isEmail: Boolean
        get() = identity.contains("@")

    val userNameOrThrow
        get() = if (!isEmail) identity else throw IllegalStateException()

    val userName
        get() = if (!isEmail) identity else null

    val emailOrThrow
        get() = if (isEmail) identity else throw IllegalStateException()

    val email
        get() = if (isEmail) identity else null
}