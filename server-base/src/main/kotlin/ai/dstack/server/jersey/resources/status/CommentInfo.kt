package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class CommentInfo(
    val id: String,
    val timestamp: Long,
    val user: String,
    val text: String
)
