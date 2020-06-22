package ai.dstack.core.backend.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class UpdateDashboardPayload(
    val user: String?,
    val id: String?,
    val title: String?,
    val private: Boolean?
)