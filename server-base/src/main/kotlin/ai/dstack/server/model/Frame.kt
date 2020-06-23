package ai.dstack.server.model

data class Frame(
    val stackPath: String,
    val id: String,
    val timestampMillis: Long,
    val size: Int?,
    val message: String?
) {
    val path: String
        get() = "$stackPath/$id"
}