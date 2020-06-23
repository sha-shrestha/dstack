package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.UserItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.time.LocalDate
import java.util.*

@Repository
interface UserRepository : CrudRepository<UserItem, String> {
    fun findAllByEmail(email: String): Iterable<UserItem>

    fun findByToken(token: String): Optional<UserItem>

    fun findAllByCreatedDate(createdDate: LocalDate): Iterable<UserItem>

    fun findAllByUnverifiedName(unverifiedName: String): Iterable<UserItem>
}