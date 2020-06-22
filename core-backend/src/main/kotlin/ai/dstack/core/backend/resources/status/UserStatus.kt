package ai.dstack.core.backend.resources.status

import com.fasterxml.jackson.annotation.JsonProperty

data class UserStatus(
    val user: String,
    val token: String,
    val email: String,
    val verified: Boolean,
    val settings: SettingsInfo,
    @JsonProperty("created_date")
    val createdDate: String,
    val plan: String
)