package ai.dstack.core.api.services

import ai.dstack.core.api.model.Job
import ai.dstack.core.api.model.User

interface SchedulerService {
    fun schedule(schedule: String)
    fun schedule(job: Job, user: User)
}