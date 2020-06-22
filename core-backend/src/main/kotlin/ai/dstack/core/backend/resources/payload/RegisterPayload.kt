package ai.dstack.core.backend.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class RegisterPayload(
    val name: String?,
    val email: String?,
    val password: String?,
    val code: String? = null,
    val plan: String? = null
)