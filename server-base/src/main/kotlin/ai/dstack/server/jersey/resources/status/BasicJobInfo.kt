package ai.dstack.server.jersey.resources.status

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.annotation.JsonProperty

@JsonInclude(JsonInclude.Include.NON_NULL)
data class BasicJobInfo(
    val id: String,
    val title: String,
    val runtime: String,
    val schedule: String,
    val status: String,
    val started: Long?,
    val finished: Long?,
    @JsonProperty("estimated_duration")
    val estimatedDuration: Long?
)