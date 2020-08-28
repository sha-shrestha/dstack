package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

data class HeadInfo(
    val id: String,
    @JsonProperty("timestamp")
    val timestampMillis: Long
)

@JsonInclude(JsonInclude.Include.NON_NULL)
data class BasicStackInfo(
    @JsonProperty("user")
    val userName: String,
    val name: String,
    val private: Boolean,
    val head: HeadInfo?,
    val permissions: List<PermissionInfo>?
)