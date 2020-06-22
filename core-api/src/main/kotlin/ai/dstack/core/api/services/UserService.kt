package ai.dstack.core.api.services

import ai.dstack.core.api.model.User
import java.time.LocalDate

interface UserService {
    fun get(name: String): User?
    fun findByEmail(email: String): User?
    fun findByToken(token: String): User?
    fun findByCreatedDate(createdDate: LocalDate): Sequence<User>
    fun create(user: User)
    fun update(user: User)
    fun delete(user: User)
    fun findUnverified(unverifiedName: String, verificationCode: String? = null, password: String? = null): User?
}