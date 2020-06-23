package ai.dstack.server.jersey

import ai.dstack.server.model.*
import ai.dstack.server.services.*
import ai.dstack.server.jersey.jackson.API_MAPPER
import ai.dstack.server.jersey.jackson.createEmptyJsonObject
import ai.dstack.server.jersey.resources.payload.*
import ai.dstack.server.jersey.resources.status.*
import ai.dstack.server.jersey.services.InMemoryJobService
import ai.dstack.server.jersey.services.InMemorySessionService
import ai.dstack.server.jersey.services.InMemoryUserService
import com.fasterxml.jackson.databind.JsonNode
import com.google.common.truth.Truth
import org.glassfish.hk2.utilities.binding.AbstractBinder
import org.glassfish.jersey.test.JerseyTest
import org.junit.Test
import org.mockito.Mockito
import java.time.LocalDate
import javax.ws.rs.client.Entity
import javax.ws.rs.core.Application
import javax.ws.rs.core.HttpHeaders
import javax.ws.rs.core.Response


// TODO: Implement more tests – ideally for all APIs
class JerseyApplicationTests : JerseyTest() {
    private lateinit var appConfig: AppConfig
    private lateinit var stackService: StackService
    private lateinit var frameService: FrameService
    private lateinit var attachmentService: AttachmentService
    private lateinit var emailService: EmailService
    private lateinit var fileService: FileService
    private lateinit var permissionService: PermissionService
    private lateinit var commentService: CommentService
    private lateinit var schedulerService: SchedulerService

    private lateinit var jobService: InMemoryJobService
    private lateinit var userService: InMemoryUserService
    private lateinit var sessionService: InMemorySessionService

    override fun configure(): Application {
        appConfig = Mockito.mock(AppConfig::class.java)
        stackService = Mockito.mock(StackService::class.java)
        frameService = Mockito.mock(FrameService::class.java)
        attachmentService = Mockito.mock(AttachmentService::class.java)
        emailService = Mockito.mock(EmailService::class.java)
        fileService = Mockito.mock(FileService::class.java)
        permissionService = Mockito.mock(PermissionService::class.java)
        commentService = Mockito.mock(CommentService::class.java)
        schedulerService = Mockito.mock(SchedulerService::class.java)

        userService = InMemoryUserService()
        jobService = InMemoryJobService()
        sessionService = InMemorySessionService()

        return JerseyApplication.resourceConfig
            .register(object : AbstractBinder() {
                override fun configure() {
                    bind(appConfig).to(AppConfig::class.java)
                    bind(stackService).to(StackService::class.java)
                    bind(sessionService).to(SessionService::class.java)
                    bind(frameService).to(FrameService::class.java)
                    bind(attachmentService).to(AttachmentService::class.java)
                    bind(emailService).to(EmailService::class.java)
                    bind(fileService).to(FileService::class.java)
                    bind(permissionService).to(PermissionService::class.java)
                    bind(commentService).to(CommentService::class.java)
                    bind(schedulerService).to(SchedulerService::class.java)

                    bind(jobService).to(JobService::class.java)
                    bind(userService).to(UserService::class.java)
                    bind(sessionService).to(SessionService::class.java)
                }
            })
    }

    override fun setUp() {
        super.setUp()
        Mockito.reset(
            appConfig,
            stackService,
            frameService,
            attachmentService,
            emailService,
            fileService,
            permissionService,
            commentService
        )

        userService.reset()
        jobService.reset()
        sessionService.reset()
    }

    @Test
    fun testUsers() {
        val registerResponse = target("/users/register")
            .request()
            .post(
                Entity.json(
                    RegisterPayload(
                        name = "test_user",
                        email = "test@gmail.com",
                        password = "pass",
                        plan = "free"
                    )
                )
            )
        Truth.assertThat(registerResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val registeredAuthStatus = registerResponse.entity<AuthStatus>()
        Truth.assertThat(registeredAuthStatus.verified).isFalse()
        Truth.assertThat(sessionService.get(registeredAuthStatus.session)?.valid).isTrue()

        val unverifiedUser = userService.findUnverified("test_user", password = "pass")

        verifyThat(emailService).executedOnce { sendVerificationEmail(equalTo(unverifiedUser!!)) }

        val loginResponse = target("/users/login")
            .queryParam("user", "test_user")
            .queryParam("password", "pass")
            .request()
            .get()
        Truth.assertThat(loginResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val loggedInAuthStatus = loginResponse.entity<AuthStatus>()
        Truth.assertThat(loggedInAuthStatus.verified).isFalse()
        Truth.assertThat(sessionService.get(loggedInAuthStatus.session)?.valid).isTrue()

        Truth.assertThat(unverifiedUser).isNotNull()
        val verifyResponse = target("/users/verify")
            .queryParam("user", "test_user")
            .queryParam("code", unverifiedUser!!.verificationCode)
            .request()
            .get()
        Truth.assertThat(verifyResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val verifyResponseAuthStatus = verifyResponse.entity<AuthStatus>()
        Truth.assertThat(verifyResponseAuthStatus.verified).isTrue()
        Truth.assertThat(sessionService.get(loggedInAuthStatus.session)?.valid).isTrue()

        val verifiedUser = userService.findUnverified("test_user", password = "pass")
        Truth.assertThat(verifiedUser!!.token).isEqualTo(unverifiedUser.token)

        val loginVerifiedResponse = target("/users/login")
            .queryParam("user", "test_user")
            .queryParam("password", "pass")
            .request()
            .get()
        Truth.assertThat(loginVerifiedResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val loggedInVerifiedAuthStatus = loginVerifiedResponse.entity<AuthStatus>()
        Truth.assertThat(loggedInVerifiedAuthStatus.verified).isTrue()
        Truth.assertThat(sessionService.get(loggedInVerifiedAuthStatus.session)?.valid).isTrue()

        val rememberResponse = target("/users/remember")
            .request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + loggedInVerifiedAuthStatus.session)
            .get()
        Truth.assertThat(rememberResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val rememberResponseSessionStatus = rememberResponse.entity<SessionStatus>()
        Truth.assertThat(rememberResponseSessionStatus.user).isEqualTo("test_user")
        Truth.assertThat(rememberResponseSessionStatus.email).isEqualTo("test@gmail.com")
        Truth.assertThat(rememberResponseSessionStatus.settings.general.defaultAccessLevel).isEqualTo("public")
        Truth.assertThat(rememberResponseSessionStatus.settings.notifications.comments).isEqualTo(true)
        Truth.assertThat(rememberResponseSessionStatus.settings.notifications.newsletter).isEqualTo(true)
        Truth.assertThat(rememberResponseSessionStatus.token).isEqualTo(verifiedUser.token)
        Truth.assertThat(rememberResponseSessionStatus.verified).isTrue()

        val infoResponse = target("/users/info")
            .request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer ${verifiedUser.token}")
            .post(
                Entity.json(
                    InfoPayload(
                        user = "test_user"
                    )
                )
            )
        Truth.assertThat(infoResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val infoUserStatus = infoResponse.entity<UserStatus>()
        Truth.assertThat(infoUserStatus.user).isEqualTo("test_user")
        Truth.assertThat(infoUserStatus.email).isEqualTo("test@gmail.com")
        Truth.assertThat(infoUserStatus.settings.general.defaultAccessLevel).isEqualTo("public")
        Truth.assertThat(infoUserStatus.settings.notifications.comments).isEqualTo(true)
        Truth.assertThat(infoUserStatus.settings.notifications.newsletter).isEqualTo(true)
        Truth.assertThat(infoUserStatus.token).isEqualTo(verifiedUser.token)
        Truth.assertThat(infoUserStatus.plan).isEqualTo(verifiedUser.plan.code)
        Truth.assertThat(infoUserStatus.createdDate).isEqualTo(LocalDate.now().toString())
        Truth.assertThat(infoUserStatus.verified).isTrue()

        val logoutResponse = target("/users/logout")
            .request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + loggedInVerifiedAuthStatus.session)
            .get()
        Truth.assertThat(logoutResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(logoutResponse.json).isEqualTo(API_MAPPER.createEmptyJsonObject())
        Truth.assertThat(sessionService.get(loggedInVerifiedAuthStatus.session)?.valid).isFalse()
    }

    @Test
    fun testJobs() {
        val testUser = User(
            "test_user", "test@gmail.com", "test",
            "test_token", "test_code", true, UserPlan.Free,
            LocalDate.now(), Settings(General(AccessLevel.Public), Notifications(true, true)), "test_user"
        )
        userService.create(testUser)

        val noAuthorizationResponse = target("/jobs/test_user").request()
            .get()
        Truth.assertThat(noAuthorizationResponse.status).isEqualTo(Response.Status.FORBIDDEN.statusCode)
        Truth.assertThat(noAuthorizationResponse.json)
            .isEqualTo(message("bad credentials"))

        val invalidAuthorizationResponse = target("/jobs/test_user").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + "some invalid token")
            .get()
        Truth.assertThat(invalidAuthorizationResponse.status).isEqualTo(Response.Status.FORBIDDEN.statusCode)
        Truth.assertThat(invalidAuthorizationResponse.json)
            .isEqualTo(message("bad credentials"))

        val emptyResponse = target("/jobs/test_user").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .get()
        Truth.assertThat(emptyResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(emptyResponse.entity<GetJobsStatus>())
            .isEqualTo(GetJobsStatus(emptyList()))

        val createJobPayload = CreateJobPayload(
            "test_user",
            "Test Job", "python", "print(\"Hello, world!\")", "unscheduled"
        )
        val createJobResponse: Response = target("/jobs/create").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .post(
                Entity.json(
                    createJobPayload
                )
            )
        Truth.assertThat(createJobResponse.status).isEqualTo(Response.Status.OK.statusCode)
        val createJobStatus = createJobResponse.entity<GetJobStatus>()
        Truth.assertThat(createJobStatus.job.id).isNotNull()
        Truth.assertThat(createJobStatus.job.title).isEqualTo(createJobPayload.title)
        Truth.assertThat(createJobStatus.job.code).isEqualTo(createJobPayload.code)
        Truth.assertThat(createJobStatus.job.runtime).isEqualTo(createJobPayload.runtime)
        Truth.assertThat(createJobStatus.job.schedule).isEqualTo(createJobPayload.schedule)

        val nonEmptyResponse = target("/jobs/test_user").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .get()
        Truth.assertThat(nonEmptyResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(nonEmptyResponse.entity<GetJobsStatus>())
            .isEqualTo(
                GetJobsStatus(
                    listOf(
                        BasicJobInfo(
                            createJobStatus.job.id, "Test Job", "python", "unscheduled", "CREATED",
                            null, null, null
                        )
                    )
                )
            )

        val createdJobResponse = target("/jobs/test_user/${createJobStatus.job.id}").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .get()
        Truth.assertThat(createdJobResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(createdJobResponse.entity<GetJobStatus>())
            .isEqualTo(
                GetJobStatus(
                    JobInfo(
                        createJobStatus.job.id,
                        "Test Job",
                        "python",
                        "unscheduled",
                        "print(\"Hello, world!\")",
                        "CREATED",
                        null,
                        null,
                        null,
                        null
                    )
                )
            )

        val updateJobResponse: Response = target("/jobs/update").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .post(
                Entity.json(
                    UpdateJobPayload(
                        "test_user",
                        createJobStatus.job.id, "Test Job", null, "print(\"Hello!\")", null, null, null, null, null
                    )
                )
            )
        Truth.assertThat(updateJobResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(updateJobResponse.entity<OpStatus>())
            .isEqualTo(OpStatus())

        val updatedJobResponse = target("/jobs/test_user/${createJobStatus.job.id}").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .get()
        Truth.assertThat(updatedJobResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(updatedJobResponse.entity<GetJobStatus>())
            .isEqualTo(
                GetJobStatus(
                    JobInfo(
                        createJobStatus.job.id, "Test Job", "python", "unscheduled", "print(\"Hello!\")", "CREATED", null,
                        null, null, null
                    )
                )
            )

        val deleteJobResponse: Response = target("/jobs/delete").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .post(
                Entity.json(
                    DeleteJobPayload(
                        "test_user",
                        createJobStatus.job.id
                    )
                )
            )
        Truth.assertThat(deleteJobResponse.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(deleteJobResponse.entity<OpStatus>())
            .isEqualTo(OpStatus())

        val emptyResponse2 = target("/jobs/test_user").request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer " + testUser.token)
            .get()
        Truth.assertThat(emptyResponse2.status).isEqualTo(Response.Status.OK.statusCode)
        Truth.assertThat(emptyResponse2.entity<GetJobsStatus>())
            .isEqualTo(GetJobsStatus(emptyList()))
    }

    private fun message(value: String) = API_MAPPER.readValue("{ \"message\": \"$value\" }", JsonNode::class.java)

    private val Response.json: JsonNode
        get() = readEntity(JsonNode::class.java)

    private inline fun <reified T> Response.entity(): T {
        return API_MAPPER.readValue(readEntity(String::class.java), T::class.java)
    }
}