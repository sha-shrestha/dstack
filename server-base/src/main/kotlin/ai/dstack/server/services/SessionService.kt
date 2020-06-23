package ai.dstack.server.services

import ai.dstack.server.model.Session
import java.time.LocalDateTime
import java.time.ZoneOffset

interface SessionService {
    fun get(id: String): Session?
    fun create(session: Session)
    fun update(session: Session)

    fun renew(session: Session) {
        val expireAt = LocalDateTime.now(ZoneOffset.UTC).plusDays(30).toEpochSecond(ZoneOffset.UTC)
        update(session.copy(expiresAtEpochSecond = expireAt))
    }
}