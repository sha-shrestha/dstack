package ai.dstack.server.local.cli.sqlite.model

import java.io.Serializable
import javax.persistence.*

class JobId(
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
    name = "jobs",
    indexes = [Index(columnList = "job_name", unique = false), Index(columnList = "schedule", unique = false)]
)
@IdClass(JobId::class)
data class JobItem(
    @Id
    @Column(name = "user_name")
    val user: String,

    @Id
    @Column(name = "job_name")
    val id: String,

    @Column
    val title: String?,

    @Column
    val runtime: String,

    @Column
    val code: String?,

    @Column
    val schedule: String,

    @Column
    val status: String,

    @Column
    val logs: String?,

    @Column(name = "started_at")
    val started: Long?,

    @Column(name = "finished_at")
    val finished: Long?,

    @Column(name = "estimated_duration")
    val estimatedDuration: Long?
)