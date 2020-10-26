package ai.dstack.server.local.sqlite.model

import java.io.Serializable
import javax.persistence.*

class DashboardId(
    var user: String = "",
    var id: String = ""
) : Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as StackId

        if (user != other.user) return false
        if (id != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        var result = user.hashCode()
        result = 31 * result + id.hashCode()
        return result
    }
}


@Entity
@Table(
    name = "dashboards",
    indexes = [Index(columnList = "dashboard_id", unique = false)]
)
@IdClass(DashboardId::class)
data class DashboardItem(
    @Id
    @Column(name = "user_name")
    val user: String,

    @Id
    @Column(name = "dashboard_id")
    val id: String,

    @Column
    val private: Boolean,

    @Column
    val timestamp: Long,

    @Column
    val title: String?,

    @Column
    val description: String?
)