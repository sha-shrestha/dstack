package ai.dstack.core.backend.local.server.sqlite.services

import ai.dstack.core.api.model.Session
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.SessionService
import ai.dstack.core.backend.local.server.sqlite.model.SessionItem
import ai.dstack.core.backend.local.server.sqlite.repositories.SessionRepository
import ai.dstack.core.backend.local.server.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteSessionService @Autowired constructor(private val repository: SessionRepository) : SessionService {
    override fun get(id: String): Session? {
        return repository.findById(id).toNullable()?.toSession()
    }

    override fun create(session: Session) {
        if (!repository.existsById(session.id)) {
            repository.save(session.toSessionItem())
        } else throw EntityAlreadyExists()
    }

    override fun update(session: Session) {
        repository.save(session.toSessionItem())
    }

    private fun SessionItem.toSession(): Session {
        return Session(id, user, expiresAt)
    }

    private fun Session.toSessionItem(): SessionItem {
        return SessionItem(
            id,
            userName,
            expiresAtEpochSecond
        )
    }
}
