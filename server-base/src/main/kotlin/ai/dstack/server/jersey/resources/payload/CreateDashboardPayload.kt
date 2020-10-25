package ai.dstack.server.jersey.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class CreateDashboardPayload(
    val user: String?,
    val title: String?,
    val description: String?,
    val private: Boolean?
)