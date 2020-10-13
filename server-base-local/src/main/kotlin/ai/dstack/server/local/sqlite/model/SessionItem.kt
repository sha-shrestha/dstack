package ai.dstack.server.local.sqlite.model

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(
    name = "sessions"
)
data class SessionItem(
    @Id
    @Column(name = "session_id")
    val id: String,

    @Column(name = "user_name")
    val user: String,

    @Column(name = "expires_at")
    val expiresAt: Long
)