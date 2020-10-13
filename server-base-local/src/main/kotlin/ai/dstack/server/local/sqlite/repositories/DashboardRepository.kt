package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.DashboardId
import ai.dstack.server.local.sqlite.model.DashboardItem
import org.springframework.data.repository.CrudRepository

interface DashboardRepository : CrudRepository<DashboardItem, DashboardId> {
    fun findAllByUser(user: String): Iterable<DashboardItem>
}