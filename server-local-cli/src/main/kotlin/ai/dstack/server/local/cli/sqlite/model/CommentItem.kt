package ai.dstack.server.local.cli.sqlite.model

import javax.persistence.*

@Entity
@Table(
    name = "comments",
    indexes = [Index(columnList = "stack_path", unique = false)]

)
data class CommentItem(
    @Id
    @Column
    val id: String,

    @Column(name = "stack_path")
    val stackPath: String,

    @Column
    val timestamp: Long,

    @Column(name = "user_id")
    val user: String,

    @Column
    val text: String
)