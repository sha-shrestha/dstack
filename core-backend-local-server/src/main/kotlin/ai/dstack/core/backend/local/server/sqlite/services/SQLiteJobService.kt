package ai.dstack.core.backend.local.server.sqlite.services

import ai.dstack.core.api.model.Job
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.JobService
import ai.dstack.core.backend.local.server.sqlite.model.JobId
import ai.dstack.core.backend.local.server.sqlite.model.JobItem
import ai.dstack.core.backend.local.server.sqlite.repositories.JobRepository
import ai.dstack.core.backend.local.server.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteJobService @Autowired constructor(private val repository: JobRepository) : JobService {
    override fun get(user: String, id: String): Job? {
        return repository.findById(mapId(user, id)).toNullable()?.toJob()
    }

    override fun findByUser(user: String, consistent: Boolean): Sequence<Job> {
        return repository.findAllByUser(user).asSequence().map { it.toJob() }
    }

    override fun create(job: Job) {
        if (!repository.existsById(job.mapId)) {
            repository.save(job.toJobItem())
        } else throw EntityAlreadyExists()
    }

    override fun delete(job: Job) {
        repository.deleteById(job.mapId)
    }

    override fun update(job: Job) {
        repository.save(job.toJobItem())
    }

    override fun getJobsBySchedule(schedule: String): List<Job> {
        return repository.findAllBySchedule(schedule).asSequence().map { it.toJob() }.toList()
    }

    private val Job.mapId
        get() = mapId(userName, id)

    private fun mapId(user: String, name: String) =
        JobId(user, name)

    private fun JobItem.toJob(): Job {
        return this.let { j ->
            ai.dstack.core.api.model.Job(
                j.user,
                j.id,
                j.title.orEmpty(),
                j.runtime,
                j.code.orEmpty(),
                ai.dstack.core.api.model.JobSchedule.fromCode(j.schedule),
                ai.dstack.core.api.model.JobStatus.fromCode(j.status),
                j.logs,
                j.started,
                j.finished,
                j.estimatedDuration
            )
        }
    }

    private fun Job.toJobItem(): JobItem {
        return this.let { s ->
            JobItem(
                s.userName,
                s.id,
                if (s.title.isNotBlank()) s.title else null,
                s.runtime,
                if (s.code.isNotBlank()) s.code else null,
                s.schedule.code,
                s.status.code,
                s.logs,
                s.startedAtMillis,
                s.finishedAtMillis,
                s.estimatedDurationMillis
            )
        }
    }
}