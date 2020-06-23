package ai.dstack.server.services

import ai.dstack.server.model.Job
import ai.dstack.server.model.User

interface SchedulerService {
    fun schedule(schedule: String)
    fun schedule(job: Job, user: User)
}