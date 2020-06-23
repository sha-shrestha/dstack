package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty
import java.lang.IllegalArgumentException

@JsonInclude(JsonInclude.Include.NON_NULL)
data class PermissionInfo(
    val user: String?,
    val email: String?
) {
    init {
        if (user == null && email == null) {
            throw IllegalArgumentException("Both user and email can't be null")
        }
    }
}

@JsonInclude(JsonInclude.Include.NON_NULL)
data class BasicFrameInfo(
    val id: String,
    @JsonProperty("timestamp")
    val timestampMillis: Long,
    @JsonProperty("description")
    val message: String?
)

@JsonInclude(JsonInclude.Include.NON_NULL)
data class StackInfo(
    val user: String,
    val name: String,
    val private: Boolean,
    val head: FrameInfo?,
    val permissions: List<PermissionInfo>?,
    val comments: List<CommentInfo>,
    val frames: List<BasicFrameInfo>
)