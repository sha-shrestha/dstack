package ai.dstack.server.jersey.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class UpdateJobPayload(
    val user: String?,
    val id: String?,
    val title: String?,
    val runtime: String?,
    val code: String?,
    val schedule: String?,
    val status: String?,
    val logs: String?,
    @JsonProperty("started_at")
    val startedAt: Long?,
    @JsonProperty("finished_at")
    val finishedAt: Long?
)