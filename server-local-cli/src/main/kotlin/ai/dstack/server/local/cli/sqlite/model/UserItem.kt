package ai.dstack.server.local.cli.sqlite.model

import ai.dstack.server.model.AccessLevel
import java.time.LocalDate
import javax.persistence.*

@Embeddable
data class UserItemSettings(
    @Embedded
    val general: UserItemSettingsGeneral,
    @Embedded
    val notifications: UserItemSettingNotifications
)

@Embeddable
data class UserItemSettingsGeneral(
    @Column(name = "default_access_level")
    val defaultAccessLevel: AccessLevel
)

@Embeddable
data class UserItemSettingNotifications(
    @Column
    val comments: Boolean,
    @Column
    val newsletter: Boolean
)

@Entity
@Table(
    name = "users",
    indexes = [Index(columnList = "email", unique = false),
        Index(columnList = "token", unique = true),
        Index(columnList = "created_date", unique = false),
        Index(columnList = "unverified_user_name", unique = false)]
)
data class UserItem(
    @Id
    @Column(name = "user_name")
    val name: String,

    @Column
    val email: String,

    @Column
    val password: String,

    @Column
    val token: String,

    @Column(name = "verification_code")
    val verificationCode: String,

    @Column
    val verified: Boolean,

    @Column
    val plan: String,

    @Column(name = "created_date")
    val createdDate: LocalDate,

    @Column
    val settings: UserItemSettings,

    @Column(name = "unverified_user_name")
    var unverifiedName: String
)