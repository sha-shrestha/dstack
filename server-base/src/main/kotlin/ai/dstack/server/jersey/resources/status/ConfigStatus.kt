package ai.dstack.server.jersey.resources.status

data class ConfigStatus(
    val runtimes: List<RuntimeInfo>,
    val email: Boolean
)