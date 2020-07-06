package ai.dstack.server.jersey.services

import ai.dstack.server.model.Dashboard
import ai.dstack.server.model.Job
import ai.dstack.server.services.DashboardService
import ai.dstack.server.services.EntityAlreadyExists

class InMemoryDashboardService: DashboardService {
    private val dashboards = mutableListOf<Dashboard>()

    override fun create(dashboard: Dashboard) {
        if (dashboards.find { it.userName == dashboard.userName && it.id == dashboard.id } == null) {
            dashboards.add(dashboard)
        } else {
            throw EntityAlreadyExists()
        }
    }

    override fun get(userName: String, id: String): Dashboard? {
        return dashboards.find { it.userName == userName && it.id == id }
    }

    override fun update(dashboard: Dashboard) {
        val index = dashboards.indexOfFirst { it.userName == dashboard.userName && it.id == dashboard.id }
        if (index >= 0) {
            dashboards.set(index, dashboard)
        }
        // TODO: Throw exception if not updatedTODO("Not yet implemented")
    }

    override fun delete(dashboard: Dashboard) {
        dashboards.removeIf { it.userName == dashboard.userName && it.id == dashboard.id }
    }

    override fun findByUserName(userName: String): List<Dashboard> {
        return dashboards.filter { it.userName == userName }
    }

    fun reset(dashboards: List<Dashboard> = emptyList()) {
        this.dashboards.clear()
        this.dashboards.addAll(dashboards)
    }
}