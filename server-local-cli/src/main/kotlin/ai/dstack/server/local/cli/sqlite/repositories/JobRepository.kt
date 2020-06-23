package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.JobId
import ai.dstack.server.local.cli.sqlite.model.JobItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface JobRepository : CrudRepository<JobItem, JobId> {
    fun findAllByUser(user: String): Iterable<JobItem>

    fun findAllBySchedule(user: String): Iterable<JobItem>
}