package ai.dstack.server.local.sqlite.model

import java.io.Serializable
import javax.persistence.*

class CardId(
    var dashboard: String = "",
    var stack: String = ""
) : Serializable {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (javaClass != other?.javaClass) return false

        other as StackId

        if (dashboard != other.user) return false
        if (stack != other.name) return false

        return true
    }

    override fun hashCode(): Int {
        var result = dashboard.hashCode()
        result = 31 * result + stack.hashCode()
        return result
    }
}

@Entity
@Table(
    name = "cards",
    indexes = [Index(columnList = "stack_path", unique = false)]
)
@IdClass(CardId::class)
data class CardItem(
    @Id
    @Column(name = "dashboard_path")
    val dashboard: String,

    @Id
    @Column(name = "stack_path")
    val stack: String,

    @Column(name = "\"index\"")
    val index: Int,

    @Column
    val title: String
)