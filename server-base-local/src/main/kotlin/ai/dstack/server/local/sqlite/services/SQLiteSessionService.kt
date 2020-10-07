package ai.dstack.server.local.sqlite.services

import ai.dstack.server.model.Session
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.services.SessionService
import ai.dstack.server.local.sqlite.model.SessionItem
import ai.dstack.server.local.sqlite.repositories.SessionRepository
import ai.dstack.server.local.sqlite.toNullable

class SQLiteSessionService(private val repository: SessionRepository) : SessionService {
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
