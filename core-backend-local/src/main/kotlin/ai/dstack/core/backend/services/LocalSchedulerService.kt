package ai.dstack.core.backend.services

import ai.dstack.core.api.model.Job
import ai.dstack.core.api.model.JobStatus
import ai.dstack.core.api.model.User
import ai.dstack.core.api.services.JobService
import ai.dstack.core.api.services.SchedulerService
import ai.dstack.core.api.services.UserService
import mu.KLogging
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Component

@Component
class LocalSchedulerService @Autowired constructor(
    private val jobService: JobService,
    private val userService: UserService
) : SchedulerService {
    companion object : KLogging()

    @Scheduled(cron = "0 0 0 * * ?")
    fun scheduleHe0M0() {
        schedule("hourly")
        schedule("daily/00:00")
    }

    @Scheduled(cron = "0 0 1 * * ?")
    fun scheduleHe1M0() {
        schedule("hourly")
        schedule("daily/01:00")
    }

    @Scheduled(cron = "0 0 2 * * ?")
    fun scheduleHe2M0() {
        schedule("hourly")
        schedule("daily/02:00")
    }

    @Scheduled(cron = "0 0 3 * * ?")
    fun scheduleHe3M0() {
        schedule("hourly")
        schedule("daily/03:00")
    }

    @Scheduled(cron = "0 0 4 * * ?")
    fun scheduleHe4M0() {
        schedule("hourly")
        schedule("daily/04:00")
    }

    @Scheduled(cron = "0 0 5 * * ?")
    fun scheduleHe5M0() {
        schedule("hourly")
        schedule("daily/05:00")
    }

    @Scheduled(cron = "0 0 6 * * ?")
    fun scheduleHe6M0() {
        schedule("hourly")
        schedule("daily/06:00")
    }

    @Scheduled(cron = "0 0 7 * * ?")
    fun scheduleHe7M0() {
        schedule("hourly")
        schedule("daily/07:00")
    }

    @Scheduled(cron = "0 0 8 * * ?")
    fun scheduleHe8M0() {
        schedule("hourly")
        schedule("daily/08:00")
    }

    @Scheduled(cron = "0 0 9 * * ?")
    fun scheduleHe9M0() {
        schedule("hourly")
        schedule("daily/09:00")
    }

    @Scheduled(cron = "0 0 10 * * ?")
    fun scheduleH10M0() {
        schedule("hourly")
        schedule("daily/10:00")
    }

    @Scheduled(cron = "0 0 11 * * ?")
    fun scheduleH11M0() {
        schedule("hourly")
        schedule("daily/11:00")
    }

    @Scheduled(cron = "0 0 12 * * ?")
    fun scheduleH12M0() {
        schedule("hourly")
        schedule("daily/12:00")
    }

    @Scheduled(cron = "0 0 13 * * ?")
    fun scheduleH13M0() {
        schedule("hourly")
        schedule("daily/13:00")
    }

    @Scheduled(cron = "0 0 14 * * ?")
    fun scheduleH14M0() {
        schedule("hourly")
        schedule("daily/14:00")
    }

    @Scheduled(cron = "0 0 15 * * ?")
    fun scheduleH15M0() {
        schedule("hourly")
        schedule("daily/15:00")
    }

    @Scheduled(cron = "0 0 16 * * ?")
    fun scheduleH16M0() {
        schedule("hourly")
        schedule("daily/16:00")
    }

    @Scheduled(cron = "0 0 17 * * ?")
    fun scheduleH17M0() {
        schedule("hourly")
        schedule("daily/17:00")
    }

    @Scheduled(cron = "0 0 18 * * ?")
    fun scheduleH18M0() {
        schedule("hourly")
        schedule("daily/18:00")
    }

    @Scheduled(cron = "0 0 19 * * ?")
    fun scheduleH19M0() {
        schedule("hourly")
        schedule("daily/19:00")
    }

    @Scheduled(cron = "0 0 20 * * ?")
    fun scheduleH20M0() {
        schedule("hourly")
        schedule("daily/20:00")
    }

    @Scheduled(cron = "0 0 21 * * ?")
    fun scheduleH21M0() {
        schedule("hourly")
        schedule("daily/22:00")
    }

    @Scheduled(cron = "0 0 22 * * ?")
    fun scheduleH22M0() {
        schedule("hourly")
        schedule("daily/22:00")
    }

    @Scheduled(cron = "0 0 23 * * ?")
    fun scheduleH23M0() {
        schedule("hourly")
        schedule("daily/23:00")
    }

    override fun schedule(schedule: String) {
        val jobs = jobService.getJobsBySchedule(schedule)
        // TODO: This is very inefficient way. Don't use user tokens. Use system tokens.
        val users = jobs.groupBy { it.userName }.keys.map { userService.get(it) }
            .filterNotNull().associateBy { it.name }
        jobs.filter { users.containsKey(it.userName) }
            .map { job ->
                schedule(job, users.getValue(job.userName))
                jobService.update(job.copy(status = JobStatus.Scheduled))
            }
    }

    override fun schedule(job: Job, user: User) {
        jobService.update(job.copy(status = JobStatus.Scheduled))
        val pb = ProcessBuilder(
            "python3", "runner.py", "--server", "http://127.0.0.1:8080/api", "--user", user.name, "--token", user.token, "--runtime", job.runtime, "--job", job.id, "--code", job.code
        )
        pb.start()
    }
}