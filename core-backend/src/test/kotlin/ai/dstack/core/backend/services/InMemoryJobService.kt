package ai.dstack.core.backend.services

import ai.dstack.core.api.model.Job
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.JobService

class InMemoryJobService() : JobService {
    private val jobs = mutableListOf<Job>()

    override fun get(user: String, id: String): Job? {
        return jobs.find { it.userName == user && it.id == id }
    }

    override fun findByUser(user: String, consistent: Boolean): Sequence<Job> {
        return jobs.filter { it.userName == user }.asSequence()
    }

    override fun create(job: Job) {
        if (jobs.find { it.userName == job.userName && it.id == job.id } == null) {
            jobs.add(job)
        } else {
            throw EntityAlreadyExists()
        }
    }

    override fun delete(job: Job) {
        jobs.removeIf { it.userName == job.userName && it.id == job.id }
    }

    override fun update(job: Job) {
        val index = jobs.indexOfFirst { it.userName == job.userName && it.id == job.id }
        if (index >= 0) {
            jobs.set(index, job)
        }
        // TODO: Throw exception if not updated
    }

    override fun getJobsBySchedule(schedule: String): List<Job> {
        return jobs.filter { it.schedule.code == schedule }.toList()
    }

    fun reset(users: List<Job> = emptyList()) {
        this.jobs.clear()
        this.jobs.addAll(users)
    }
}