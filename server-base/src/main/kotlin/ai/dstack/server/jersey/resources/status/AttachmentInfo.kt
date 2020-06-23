package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
data class AttachmentInfo(
    val description: String?,
    @Deprecated("Is replaced by application, content_type, storage_format")
    val type: String,
    val application: String,
    @JsonProperty("content_type")
    val contentType: String,
    @JsonProperty("storage_format")
    val storageFormat: String,
    val params: Map<String, Any>,
    val settings: Map<String, Any>,
    val length: Long,
    val data: String? = null,
    @JsonProperty("download_url")
    val downloadUrl: String? = null,
    val preview: Boolean? =null,
    val index: Int? = null
)