package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.SessionItem
import org.springframework.data.repository.CrudRepository

/**
 * TODO: Implement TTl
 */
interface SessionRepository : CrudRepository<SessionItem, String>