package ai.dstack.server.model

data class Dashboard(
    val userName: String,
    val id: String,
    val title: String,
    val timestampMillis: Long,
    val private: Boolean
) {
    val path: String
        get() = path(userName, id)

    companion object {
        fun path(userName: String, id: String) = "$userName/d/$id"
    }
}