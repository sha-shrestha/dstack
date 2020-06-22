package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.DashboardId
import ai.dstack.core.backend.local.server.sqlite.model.DashboardItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DashboardRepository : CrudRepository<DashboardItem, DashboardId> {
    fun findAllByUser(user: String): Iterable<DashboardItem>
}