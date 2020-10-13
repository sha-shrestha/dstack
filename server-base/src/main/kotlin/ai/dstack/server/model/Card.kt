package ai.dstack.server.model

data class Card(
    val dashboardPath: String,
    val index: Int,
    val stackPath: String,
    val title: String,
    val description: String?,
    val columns: Int
)