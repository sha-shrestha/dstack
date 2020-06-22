package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.SessionItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

/**
 * TODO: Implement TTl
 */
@Repository
interface SessionRepository : CrudRepository<SessionItem, String>