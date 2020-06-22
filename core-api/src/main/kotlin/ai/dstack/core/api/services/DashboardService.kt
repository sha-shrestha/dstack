package ai.dstack.core.api.services

import ai.dstack.core.api.model.Dashboard

interface DashboardService {
    fun create(dashboard: Dashboard)
    fun get(userName: String, id: String): Dashboard?
    fun update(dashboard: Dashboard)
    fun delete(dashboard: Dashboard)
    fun findByUserName(userName: String): List<Dashboard>
}