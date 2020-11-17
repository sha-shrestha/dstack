package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonProperty

data class ConfigStatus(
    val runtimes: List<RuntimeInfo>,
    @JsonProperty("email_enabled")
    val emailEnabled: Boolean
)