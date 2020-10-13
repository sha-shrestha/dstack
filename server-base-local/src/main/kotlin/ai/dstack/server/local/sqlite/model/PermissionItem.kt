package ai.dstack.server.local.sqlite.model

import java.io.Serializable
import javax.persistence.*

class PermissionId(
    var path: String = "",
    var identity: String = ""
) : Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as StackId

        if (path != other.user) return false
        if (identity != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        var result = path.hashCode()
        result = 31 * result + identity.hashCode()
        return result
    }
}


@Entity
@Table(
    name = "permissions",
    indexes = [Index(columnList = "user_name", unique = false)]
)
@IdClass(PermissionId::class)
data class PermissionItem(
    @Id
    @Column(name = "stack_path")
    val path: String,

    @Id
    @Column(name = "user_name")
    val identity: String
)