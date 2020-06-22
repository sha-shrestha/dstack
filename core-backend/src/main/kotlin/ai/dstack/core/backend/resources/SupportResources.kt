package ai.dstack.core.backend.resources

import ai.dstack.core.api.services.EmailService
import ai.dstack.core.api.services.NonAvailable
import ai.dstack.core.backend.resources.payload.SupportSubmitPayload
import ai.dstack.core.backend.resources.users.isMalformedEmail
import mu.KLogging
import javax.inject.Inject
import javax.ws.rs.Consumes
import javax.ws.rs.POST
import javax.ws.rs.Path
import javax.ws.rs.Produces
import javax.ws.rs.container.ResourceContext
import javax.ws.rs.core.Context
import javax.ws.rs.core.HttpHeaders
import javax.ws.rs.core.Response

@Path("/support")
class SupportResources {
    @Context
    private lateinit var resourceContext: ResourceContext

    @Inject
    private lateinit var emailService: EmailService

    companion object : KLogging()

    @POST
    @Path("submit")
    @Consumes(JSON_UTF8)
    @Produces(JSON_UTF8)
    fun submit(payload: SupportSubmitPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { "payload: $payload" }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            if (emailService !is NonAvailable) {
                emailService.sendSupportRequestEmail(
                    payload!!.name,
                    payload.email!!,
                    payload.company,
                    payload.message!!
                )
            }
            ok()
        }
    }
}

private val SupportSubmitPayload?.isMalformed: Boolean
    get() = this == null
            || this.email.isMalformedEmail
            || this.message.isNullOrBlank()
