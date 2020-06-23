package ai.dstack.server.services

import ai.dstack.server.model.Dashboard

interface DashboardService {
    fun create(dashboard: Dashboard)
    fun get(userName: String, id: String): Dashboard?
    fun update(dashboard: Dashboard)
    fun delete(dashboard: Dashboard)
    fun findByUserName(userName: String): List<Dashboard>
}