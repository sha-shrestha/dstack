package ai.dstack.server.model

import java.time.LocalDate

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

data class User(
    val name: String,
    val email: String,
    val password: String,
    val token: String,
    // TODO: If code is not changed, it's not secure
    val verificationCode: String,
    val verified: Boolean,
    val plan: UserPlan,
    val createdDate: LocalDate,
    val settings: Settings,
    val unverifiedName: String
)

