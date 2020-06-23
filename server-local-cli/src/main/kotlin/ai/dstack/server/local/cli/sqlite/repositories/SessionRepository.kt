package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.SessionItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

/**
 * TODO: Implement TTl
 */
@Repository
interface SessionRepository : CrudRepository<SessionItem, String>