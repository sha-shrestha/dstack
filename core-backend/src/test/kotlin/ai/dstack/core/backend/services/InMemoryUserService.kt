package ai.dstack.core.backend.services

import ai.dstack.core.api.model.User
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.UserService
import java.time.LocalDate

class InMemoryUserService(): UserService {
    private val users = mutableListOf<User>()

    override fun get(name: String): User? {
        return users.find { it.name == name }
    }

    override fun findByEmail(email: String): User? {
        return users.find { it.email == email && it.verified }
    }

    override fun findByToken(token: String): User? {
        return users.find { it.token == token && it.verified }
    }

    override fun findByCreatedDate(createdDate: LocalDate): Sequence<User> {
        return users.filter { it.createdDate == createdDate }.asSequence()
    }

    override fun create(user: User) {
        if (users.find { it.name == user.name } == null) {
            users.add(user)
        } else {
            throw EntityAlreadyExists()
        }
    }

    override fun update(user: User) {
        val index = users.indexOfFirst { it.name == user.name }
        if (index >= 0) {
            users.set(index, user)
        }
        // TODO: Throw exception if not updated
    }

    override fun delete(user: User) {
        users.removeIf { it.name == user.name }
    }

    override fun findUnverified(unverifiedName: String, verificationCode: String?, password: String?): User? {
        return users.find { it.unverifiedName == unverifiedName
                && (verificationCode == null || verificationCode == it.verificationCode)
                && (password == null || password == it.password)}
    }

    fun reset(users: List<User> = emptyList()) {
        this.users.clear()
        this.users.addAll(users)
    }
}