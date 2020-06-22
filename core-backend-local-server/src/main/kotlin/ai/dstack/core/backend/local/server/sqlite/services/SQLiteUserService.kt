package ai.dstack.core.backend.local.server.sqlite.services

import ai.dstack.core.api.model.*
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.UserService
import ai.dstack.core.backend.local.server.sqlite.model.UserItem
import ai.dstack.core.backend.local.server.sqlite.model.UserItemSettingNotifications
import ai.dstack.core.backend.local.server.sqlite.model.UserItemSettings
import ai.dstack.core.backend.local.server.sqlite.model.UserItemSettingsGeneral
import ai.dstack.core.backend.local.server.sqlite.repositories.UserRepository
import ai.dstack.core.backend.local.server.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component
import java.time.LocalDate

@Component
class SQLiteUserService @Autowired constructor(private val repository: UserRepository) : UserService {
    override fun get(name: String): User? {
        return repository.findById(name).toNullable()?.toUser()
    }

    override fun findByEmail(email: String): User? {
        return repository.findAllByEmail(email).firstOrNull { it.verified }?.toUser()
    }

    override fun findByToken(token: String): User? {
        return repository.findByToken(token).toNullable()?.toUser()
    }

    override fun findByCreatedDate(createdDate: LocalDate): Sequence<User> {
        return repository.findAllByCreatedDate(createdDate).asSequence().map { it.toUser() }
    }

    override fun create(user: User) {
        if (!repository.existsById(user.name)) {
            repository.save(user.toUserItem())
        } else throw EntityAlreadyExists()
    }

    private fun User.toUserItem(): UserItem {
        return UserItem(
            name = name,
            email = email,
            password = password,
            token = token,
            verificationCode = verificationCode,
            verified = verified,
            plan = plan.code,
            createdDate = createdDate,
            settings = settings.let {
                UserItemSettings(
                    UserItemSettingsGeneral(it.general.defaultAccessLevel),
                    it.notifications.let { n ->
                        UserItemSettingNotifications(
                            n.comments,
                            n.newsletter
                        )
                    }
                )
            },
            unverifiedName = unverifiedName
        )
    }

    override fun update(user: User) {
        repository.save(user.toUserItem())
    }

    override fun delete(user: User) {
        repository.deleteById(user.name)
    }

    override fun findUnverified(unverifiedName: String, verificationCode: String?, password: String?): User? {
        return repository.findAllByUnverifiedName(unverifiedName).asSequence()
            .map { it.toUser() }
            .firstOrNull {
                (verificationCode != null && it.verificationCode == verificationCode
                        || password != null && it.password == password)
            }
    }

    private fun UserItem.toUser(): User {
        return this.let { u ->
            ai.dstack.core.api.model.User(
                u.name, u.email, u.password,
                u.token, u.verificationCode, u.verified, ai.dstack.core.api.model.UserPlan.fromCode(u.plan),
                u.createdDate, u.settings.let { s ->
                    ai.dstack.core.api.model.Settings(
                        ai.dstack.core.api.model.General(s.general.defaultAccessLevel),
                        s.notifications.let { n ->
                            ai.dstack.core.api.model.Notifications(n.comments, n.newsletter)
                        }
                    )
                }, u.unverifiedName
            )
        }
    }
}