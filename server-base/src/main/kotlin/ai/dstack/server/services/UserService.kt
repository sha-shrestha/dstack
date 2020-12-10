package ai.dstack.server.services

import ai.dstack.server.model.User
import java.time.LocalDate

interface UserService {
    fun get(name: String): User?
    fun findAll(): Sequence<User>
    fun findByEmail(email: String): User?
    fun findByToken(token: String): User?
    fun findByCreatedDate(createdDate: LocalDate): Sequence<User>
    fun create(user: User)
    fun update(user: User)
    fun delete(user: User)
    fun findUnverified(unverifiedName: String, verificationCode: String? = null, password: String? = null): User?
}