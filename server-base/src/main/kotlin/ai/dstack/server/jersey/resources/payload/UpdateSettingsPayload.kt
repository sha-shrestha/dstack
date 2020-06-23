package ai.dstack.server.jersey.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

data class UpdateSettingsPayloadGeneral(
    @JsonProperty("default_access_level")
    val defaultAccessLevel: String?
)

data class UpdateSettingsPayloadNotifications(
    val comments: Boolean?,
    val newsletter: Boolean?
)

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class UpdateSettingsPayload(
    val user: String?,
    val general: UpdateSettingsPayloadGeneral?,
    val notifications: UpdateSettingsPayloadNotifications?
)