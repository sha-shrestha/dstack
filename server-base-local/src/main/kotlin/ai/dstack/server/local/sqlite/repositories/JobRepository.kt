package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.JobId
import ai.dstack.server.local.sqlite.model.JobItem
import org.springframework.data.repository.CrudRepository

interface JobRepository : CrudRepository<JobItem, JobId> {
    fun findAllByUser(user: String): Iterable<JobItem>

    fun findAllBySchedule(user: String): Iterable<JobItem>
}