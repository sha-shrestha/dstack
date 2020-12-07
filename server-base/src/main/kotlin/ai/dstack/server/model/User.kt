package ai.dstack.server.model

import java.time.LocalDate

@Deprecated("Must be dropped in January")
enum class UserPlan{
    Free,
    Team;

    companion object {
        fun fromCode(code: String): UserPlan {
            return values().find { it.name.toLowerCase() == code }!!
        }
    }

    val code: String
        get() {
            return name.toLowerCase()
        }
}

enum class UserRole{
    Admin,
    Write,
    Read;

    companion object {
        fun fromCode(code: String): UserRole {
            return values().find { it.name.toLowerCase() == code }!!
        }
    }

    val code: String
        get() {
            return name.toLowerCase()
        }
}

data class User(
    val name: String,
    val email: String?,
    val password: String,
    val token: String,
    // TODO: If code is not changed, it's not secure
    val verificationCode: String,
    val verified: Boolean,
    @Deprecated("Will be dropped in January")
    val plan: UserPlan,
    val role: UserRole,
    val createdDate: LocalDate,
    val settings: Settings,
    val unverifiedName: String
)

