package ai.dstack.server.model

@Deprecated("Gonna be removed in October")
data class Comment(
    val id: String,
    val stackPath: String,
    val userName: String,
    val timestampMillis: Long,
    val text: String
)