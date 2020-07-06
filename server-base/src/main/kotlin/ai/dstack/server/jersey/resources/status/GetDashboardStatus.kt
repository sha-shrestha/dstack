package ai.dstack.server.jersey.resources.status

data class CardInfo(
    val stack: String,
    val index: Int,
    val title: String,
    val head: FrameInfo?
)

data class DashboardInfo(
    val user: String,
    val id: String,
    val title: String,
    val private: Boolean,
    val cards: List<CardInfo>,
    val permissions: List<PermissionInfo>?
)

data class GetDashboardStatus(val dashboard: DashboardInfo)