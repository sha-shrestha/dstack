package ai.dstack.server.model

import java.time.LocalDateTime
import java.time.ZoneOffset

data class Session(
    val id: String,
    val userName: String,
    val expiresAtEpochSecond: Long
) {
    val valid: Boolean
        get() = expiresAtEpochSecond > LocalDateTime.now(ZoneOffset.UTC).toEpochSecond(ZoneOffset.UTC)
}