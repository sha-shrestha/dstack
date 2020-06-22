package ai.dstack.core.backend.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

data class AttachmentUploadInfo(val index: Int, @JsonProperty("upload_url") val uploadUrl: String)

@JsonInclude(JsonInclude.Include.NON_NULL)
data class PushStatus(val url: String, val attachments: List<AttachmentUploadInfo>?)