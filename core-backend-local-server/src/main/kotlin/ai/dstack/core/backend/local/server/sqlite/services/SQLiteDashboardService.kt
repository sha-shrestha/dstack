package ai.dstack.core.backend.local.server.sqlite.services

import ai.dstack.core.api.model.Dashboard
import ai.dstack.core.api.services.DashboardService
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.backend.local.server.sqlite.model.DashboardId
import ai.dstack.core.backend.local.server.sqlite.model.DashboardItem
import ai.dstack.core.backend.local.server.sqlite.repositories.DashboardRepository
import ai.dstack.core.backend.local.server.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteDashboardService @Autowired constructor(private val repository: DashboardRepository) : DashboardService {
    override fun create(dashboard: Dashboard) {
        if (!repository.existsById(dashboard.mapId)) {
            repository.save(dashboard.toDashboardItem())
        } else throw EntityAlreadyExists()
    }

    override fun get(userName: String, id: String): Dashboard? {
        return repository.findById(mapId(userName, id)).toNullable()?.toDashboard()
    }

    override fun update(dashboard: Dashboard) {
        repository.save(dashboard.toDashboardItem())
    }

    override fun delete(dashboard: Dashboard) {
        repository.delete(dashboard.toDashboardItem())
    }

    override fun findByUserName(userName: String): List<Dashboard> {
        return repository.findAllByUser(userName).asSequence().map { it.toDashboard() }.toList()
    }

    private val Dashboard.mapId
        get() = mapId(userName, id)

    private fun mapId(user: String, id: String) =
        DashboardId(user, id)

    private fun DashboardItem.toDashboard(): Dashboard {
        return this.let { d ->
            ai.dstack.core.api.model.Dashboard(d.user, d.id, d.title.orEmpty(), d.timestamp, d.private)
        }
    }

    private fun Dashboard.toDashboardItem(): DashboardItem {
        return this.let { d ->
            DashboardItem(
                d.userName, d.id, d.private, d.timestampMillis,
                if (d.title.isNotBlank()) d.title else null
            )
        }
    }
}