package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.DashboardId
import ai.dstack.server.local.cli.sqlite.model.DashboardItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface DashboardRepository : CrudRepository<DashboardItem, DashboardId> {
    fun findAllByUser(user: String): Iterable<DashboardItem>
}