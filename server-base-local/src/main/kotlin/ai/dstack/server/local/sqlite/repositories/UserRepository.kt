package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.UserItem
import org.springframework.data.repository.CrudRepository
import java.time.LocalDate
import java.util.*

interface UserRepository : CrudRepository<UserItem, String> {
    fun findAllByEmail(email: String): Iterable<UserItem>

    fun findByToken(token: String): Optional<UserItem>

    fun findAllByCreatedDate(createdDate: LocalDate): Iterable<UserItem>

    fun findAllByUnverifiedName(unverifiedName: String): Iterable<UserItem>
}