package ai.dstack.core.backend.services

import ai.dstack.core.api.model.Session
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.SessionService

class InMemorySessionService() : SessionService {
    private val sessions = mutableListOf<Session>()

    override fun get(id: String): Session? {
        return sessions.find { it.id == id }
    }

    override fun create(session: Session) {
        if (sessions.find { it.id == session.id } == null) {
            sessions.add(session)
        } else {
            throw EntityAlreadyExists()
        }
    }

    override fun update(session: Session) {
        val index = sessions.indexOfFirst { it.id == session.id }
        if (index >= 0) {
            sessions.set(index, session)
        }
        // TODO: Throw exception if not updated
    }

    fun reset(sessions: List<Session> = emptyList()) {
        this.sessions.clear()
        this.sessions.addAll(sessions)
    }
}