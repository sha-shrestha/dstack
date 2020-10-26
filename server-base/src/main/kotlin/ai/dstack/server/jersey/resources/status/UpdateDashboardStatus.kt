package ai.dstack.server.jersey.resources.status

data class UpdateDashboardStatus(
    val dashboard: UpdateDashboardInfo
)

data class UpdateDashboardInfo(
    val user: String,
    val id: String,
    val title: String?,
    val description: String?,
    val private: Boolean,
    val cards: List<CardInfo>
)