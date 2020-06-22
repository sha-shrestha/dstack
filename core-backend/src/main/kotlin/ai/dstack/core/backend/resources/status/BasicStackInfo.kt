package ai.dstack.core.backend.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
data class BasicStackInfo(
    @JsonProperty("user")
    val userName: String,
    val name: String,
    val private: Boolean,
    @JsonProperty("head")
    val headId: String?,
    val permissions: List<PermissionInfo>?
)