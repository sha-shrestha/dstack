package ai.dstack.server.jersey.resources.status

data class CardBasicInfo(
    val stack: String,
    val index: Int,
    val title: String,
    val description: String?,
    val columns: Int,
    val head: BasicFrameInfo?
)

data class DashboardBasicInfo(
    val user: String,
    val id: String,
    val title: String,
    val private: Boolean,
    val cards: List<CardBasicInfo>,
    val permissions: List<PermissionInfo>?
)

data class GetDashboardsStatus(val dashboards: List<DashboardBasicInfo>)