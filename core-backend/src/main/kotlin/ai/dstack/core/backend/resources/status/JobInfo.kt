package ai.dstack.core.backend.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
data class JobInfo(
    val id: String,
    val title: String,
    val runtime: String,
    val schedule: String,
    val code: String,
    val status: String?,
    val started: Long?,
    val finished: Long?,
    val logs: String?,
    @JsonProperty("estimated_duration")
    val estimatedDuration: Long?
)