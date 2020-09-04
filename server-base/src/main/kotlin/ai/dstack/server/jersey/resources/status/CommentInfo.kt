package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonInclude

@Deprecated("Gonna be removed in October")
@JsonInclude(JsonInclude.Include.NON_NULL)
data class CommentInfo(
    val id: String,
    val timestamp: Long,
    val user: String,
    val text: String
)
