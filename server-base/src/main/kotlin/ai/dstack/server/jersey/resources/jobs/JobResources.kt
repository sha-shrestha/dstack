package ai.dstack.server.jersey.resources.jobs

import ai.dstack.server.model.*
import ai.dstack.server.services.*
import ai.dstack.server.jersey.resources.*
import ai.dstack.server.jersey.resources.payload.*
import ai.dstack.server.jersey.resources.stacks.isMalformedStackName
import ai.dstack.server.jersey.resources.status.*
import mu.KLogging
import java.util.*
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.container.ResourceContext
import javax.ws.rs.core.Context
import javax.ws.rs.core.HttpHeaders
import javax.ws.rs.core.Response

// TODO: Add job history

val SUPPORTED_JOB_RUNTIMES = setOf("python", "r")

val CreateJobPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || (this.runtime != null && !SUPPORTED_JOB_RUNTIMES.contains(this.runtime))
            || (this.schedule != null && this.schedule.isMalformedJobSchedule)

private val UpdateJobPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isMalformedStackName
            || (this.runtime != null && !SUPPORTED_JOB_RUNTIMES.contains(this.runtime))
            || (this.schedule != null && this.schedule.isMalformedJobSchedule)
            || (this.status != null && this.status.isMalformedJobStatus)
            || (this.title == null && this.runtime == null && this.schedule == null && this.code == null
            && this.status == null && this.logs == null && this.startedAt == null && this.finishedAt == null)

private val DeleteJobPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isMalformedStackName

private val RunJobPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isMalformedStackName
            || (this.runtime != null && !SUPPORTED_JOB_RUNTIMES.contains(this.runtime))

private val StopJobPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isMalformedStackName

@Path("/jobs")
class JobResources {
    @Context
    private lateinit var resourceContext: ResourceContext

    @Inject
    private lateinit var userService: UserService

    @Inject
    private lateinit var sessionService: SessionService

    @Inject
    private lateinit var jobService: JobService

    @Inject
    private lateinit var schedulerService: SchedulerService

    companion object : KLogging()

    @GET
    @Path("/{user}")
    @Produces(JSON_UTF8)
    fun user(@PathParam("user") u: String?, @Context headers: HttpHeaders): Response {
        logger.debug { "user: $u" }
        return if (u.isNullOrBlank()) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != u || !user.verified) {
                badCredentials()
            } else {
                val jobs = jobService.findByUser(u)
                ok(GetJobsStatus(jobs.map { job ->
                    BasicJobInfo(
                        job.id,
                        job.title,
                        job.runtime,
                        job.schedule.code,
                        job.status.code,
                        job.startedAtMillis,
                        job.finishedAtMillis,
                        job.estimatedDurationMillis
                    )
                }.toList()))
            }
        }
    }

    @GET
    @Path("/{user}/{job: .+}")
    @Produces(JSON_UTF8)
    fun job(@PathParam("user") u: String?, @PathParam("job") j: String?, @Context headers: HttpHeaders): Response {
        logger.debug { "user: $u, job: $j" }
        return if (u.isNullOrBlank() || j.isNullOrBlank()) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != u || !user.verified) {
                badCredentials()
            } else {
                val job = jobService.get(u, j)
                if (job == null) {
                    jobNotFound()
                } else {
                    ok(
                        GetJobStatus(
                            JobInfo(
                                job.id,
                                job.title,
                                job.runtime,
                                job.schedule.code,
                                job.code,
                                job.status.code,
                                job.startedAtMillis,
                                job.finishedAtMillis,
                                job.logs,
                                job.estimatedDurationMillis
                            )
                        )
                    )
                }
            }
        }
    }

    @POST
    @Path("create")
    @Consumes(JSON_UTF8)
    @Produces(JSON_UTF8)
    fun create(payload: CreateJobPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { "payload: $payload" }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != payload!!.user || !user.verified) {
                badCredentials()
            } else {
                try {
                    val job = Job(
                        user.name,
                        UUID.randomUUID().toString(),
                        payload.title.orEmpty(),
                        payload.runtime ?: "python",
                        payload.code.orEmpty(),
                        JobSchedule.fromCode(payload.schedule ?: "unscheduled"),
                        status = JobStatus.Created,
                        logs = null,
                        startedAtMillis = null,
                        finishedAtMillis = null,
                        estimatedDurationMillis = null
                    )
                    jobService.create(job)
                    ok(
                        GetJobStatus(
                            JobInfo(
                                job.id,
                                job.title,
                                job.runtime,
                                job.schedule.code,
                                job.code,
                                job.status.code,
                                job.startedAtMillis,
                                job.finishedAtMillis,
                                job.logs,
                                job.estimatedDurationMillis
                            )
                        )
                    )
                } catch (e: EntityAlreadyExists) {
                    jobAlreadyExists()
                }
            }
        }
    }

    // TODO: Provide BasicJobInfo
    @POST
    @Path("update")
    @Consumes(JSON_UTF8)
    @Produces(JSON_UTF8)
    fun update(payload: UpdateJobPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { "payload: $payload" }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != payload!!.user || !user.verified) {
                badCredentials()
            } else {
                var job = jobService.get(payload.user!!, payload.id!!)
                if (job == null) {
                    jobNotFound()
                } else {
                    val runningOverFinished =
                        (job.status == JobStatus.Finished || job.status == JobStatus.Failed) && payload.status == JobStatus.Running.code
                    val runningOverStopping =
                        job.status == JobStatus.Stopping && payload.status == JobStatus.Running.code
                    val jobJustFinished =
                        (job.status == JobStatus.Scheduled || job.status == JobStatus.Running) && job.startedAtMillis != null
                                && payload.status == JobStatus.Finished.code && payload.finishedAt != null
                    job = job.copy(
                        title = payload.title ?: job.title,
                        runtime = payload.runtime ?: job.runtime,
                        code = payload.code ?: job.code,
                        schedule = payload.schedule?.let { JobSchedule.fromCode(it) } ?: job.schedule,
                        status =
                        if (runningOverStopping || runningOverFinished)
                            job.status
                        else
                            payload.status?.let { JobStatus.fromCode(it) } ?: job.status,
                        logs = if (payload.logs != null) {
                            if (payload.logs.isNotEmpty()) payload.logs else null
                        } else job.logs,
                        startedAtMillis = payload.startedAt ?: job.startedAtMillis,
                        finishedAtMillis = payload.finishedAt ?: job.finishedAtMillis,
                        estimatedDurationMillis = if (jobJustFinished)
                            (if (job.estimatedDurationMillis == null) payload.finishedAt!! - job.startedAtMillis!!
                            else
                                (job.estimatedDurationMillis!! + payload.finishedAt!! - job.startedAtMillis!!) / 2)
                        else job.estimatedDurationMillis
                    )
                    jobService.update(job)
                    ok(
                        UpdateJobStatus(
                            BasicJobInfo(
                                job.id,
                                job.title,
                                job.runtime,
                                job.schedule.code,
                                job.status.code,
                                job.startedAtMillis,
                                job.finishedAtMillis,
                                job.estimatedDurationMillis
                            )
                        )
                    )
                }
            }
        }
    }

    @POST
    @Path("run")
    @Consumes(JSON_UTF8)
    @Produces(JSON_UTF8)
    fun run(payload: RunJobPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { "payload: $payload" }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != payload!!.user || !user.verified) {
                badCredentials()
            } else {
                var job = jobService.get(payload.user!!, payload.id!!)
                if (job == null) {
                    jobNotFound()
                } else {
                    val inProgress =
                        job.status == JobStatus.Scheduled || job.status == JobStatus.Running || job.status == JobStatus.Running
                    if (!inProgress) {
                        job = job.copy(
                            status = JobStatus.Scheduled,
                            startedAtMillis = null, finishedAtMillis = null
                        )
                        schedulerService.schedule(
                            job.copy(
                                runtime = payload.runtime ?: job.runtime,
                                code = payload.code ?: job.code
                            ), user
                        )
                        ok(
                            UpdateJobStatus(
                                BasicJobInfo(
                                    job.id,
                                    job.title,
                                    job.runtime,
                                    job.schedule.code,
                                    job.status.code,
                                    job.startedAtMillis,
                                    job.finishedAtMillis,
                                    job.estimatedDurationMillis
                                )
                            )
                        )
                    } else {
                        jobIsInProgress()
                    }
                }
            }
        }
    }

    @POST
    @Path("stop")
    @Consumes(JSON_UTF8)
    @Produces(JSON_UTF8)
    fun stop(payload: StopJobPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { "payload: $payload" }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != payload!!.user || !user.verified) {
                badCredentials()
            } else {
                var job = jobService.get(payload.user!!, payload.id!!)
                if (job == null) {
                    jobNotFound()
                } else {
                    val inProgress = job.status == JobStatus.Scheduled || job.status == JobStatus.Running
                    if (inProgress) {
                        job = job.copy(status = JobStatus.Stopping)
                        jobService.update(job)
                        ok(
                            UpdateJobStatus(
                                BasicJobInfo(
                                    job.id,
                                    job.title,
                                    job.runtime,
                                    job.schedule.code,
                                    job.status.code,
                                    job.startedAtMillis,
                                    job.finishedAtMillis,
                                    job.estimatedDurationMillis
                                )
                            )
                        )
                    } else {
                        val stoppingForTooLong = job.status == JobStatus.Stopping &&
                                (job.startedAtMillis == null
                                        || System.currentTimeMillis() - job.startedAtMillis!! > 1000 * 60 * 10)
                        if (stoppingForTooLong) {
                            job = job.copy(status = JobStatus.Stopped, finishedAtMillis = System.currentTimeMillis())
                            jobService.update(job)
                            ok(
                                UpdateJobStatus(
                                    BasicJobInfo(
                                        job.id,
                                        job.title,
                                        job.runtime,
                                        job.schedule.code,
                                        job.status.code,
                                        job.startedAtMillis,
                                        job.finishedAtMillis,
                                        job.estimatedDurationMillis
                                    )
                                )
                            )
                        } else {
                            jobIsNotInProgress()
                        }
                    }
                }
            }
        }
    }

    @POST
    @Path("delete")
    @Consumes(JSON_UTF8)
    @Produces(JSON_UTF8)
    fun delete(payload: DeleteJobPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { "payload: $payload" }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val user = headers.bearer?.let { token ->
                sessionService.get(token)?.let { session ->
                    userService.get(session.userName)
                } ?: userService.findByToken(token)
            }
            if (user == null || user.name != payload!!.user || !user.verified) {
                badCredentials()
            } else {
                val job = jobService.get(payload.user!!, payload.id!!)
                if (job == null) {
                    jobNotFound()
                } else {
                    jobService.delete(job)
                    ok()
                }
            }
        }
    }
}