package ai.dstack.core.api.services

import ai.dstack.core.api.model.Job

interface JobService {
    fun get(user: String, id: String): Job?
    fun findByUser(user: String, consistent: Boolean = true): Sequence<Job>
    fun create(job: Job)
    fun delete(job: Job)
    fun update(job: Job)
    fun getJobsBySchedule(schedule: String): List<Job>
}