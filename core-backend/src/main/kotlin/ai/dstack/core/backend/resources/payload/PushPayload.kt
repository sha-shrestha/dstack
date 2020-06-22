package ai.dstack.core.backend.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class PushPayload(
    val stack: String?,
    val id: String?,
    val timestamp: Long?,
    val type: String?,
    @JsonProperty("application")
    val application: String?,
    @JsonProperty("content_type")
    val contentType: String?,
    @JsonProperty("storage_format")
    val storageFormat: String?,
    val index: Int?,
    val attachments: List<PushPayloadAttachment>?,
    val size: Int?,
    val message: String?
)

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class PushPayloadAttachment(
    val type: String?,
    @JsonProperty("application")
    val application: String?,
    @JsonProperty("content_type")
    val contentType: String?,
    @JsonProperty("storage_format")
    val storageFormat: String?,
    val data: String?,
    val length: Long?,
    val description: String?,
    val params: Map<String, Any>?,
    val settings: Map<String, Any>?
)