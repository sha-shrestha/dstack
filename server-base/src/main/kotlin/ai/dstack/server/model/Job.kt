package ai.dstack.server.model

import java.lang.IllegalStateException

enum class JobStatus {
    Created,
    Scheduled,
    Running,
    Stopping,
    Stopped,
    Failed,
    Finished,
    Timeout;

    companion object {
        fun fromCode(code: String): JobStatus {
            return values().find { it.name.toUpperCase() == code.toUpperCase() }!!
        }
    }

    val code: String
        get() {
            return name.toUpperCase()
        }
}

sealed class JobSchedule(val code: String) {
    class Unscheduled : JobSchedule("unscheduled")
    class Hourly : JobSchedule("hourly")
    class Daily(val time: String) : JobSchedule("daily/$time") {
        init {
            if (time.isMalformedJobTime) {
                throw IllegalArgumentException("Malformed time expression: $time")
            }
        }

    }

    companion object {
        fun fromCode(code: String): JobSchedule = safeFromCode(code, true)!!

        internal fun safeFromCode(code: String, fail: Boolean = true): JobSchedule? {
            return when (code.substringBefore("/")) {
                "unscheduled" -> Unscheduled()
                "hourly" -> Hourly()
                "daily" -> Daily(code.substringAfter("/", "00:00"))
                else -> if (!fail) null else throw IllegalStateException("Illegal job schedule code: $code")
            }
        }
    }
}

val String.isMalformedJobStatus get() = !JobStatus.values().map { it.name.toUpperCase() }.contains(this.toUpperCase())

val String.isMalformedJobSchedule get() = JobSchedule.safeFromCode(this, false) == null

val String.isMalformedJobTime get() = !this.matches("^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\$".toRegex())

// TODO: Replace runtime with data class
data class Job(
    val userName: String,
    val id: String,
    val title: String,
    val runtime: String,
    val code: String,
    val schedule: JobSchedule,
    val status: JobStatus,
    val logs: String?,
    val startedAtMillis: Long?,
    val finishedAtMillis: Long?,
    val estimatedDurationMillis: Long?
)