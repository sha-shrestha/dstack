package ai.dstack.server.jersey

import ai.dstack.server.chainIfNotNull
import mu.KLogging
import javax.servlet.http.HttpServletRequest
import javax.ws.rs.ClientErrorException
import javax.ws.rs.core.CacheControl
import javax.ws.rs.core.Context
import javax.ws.rs.core.Response
import javax.ws.rs.ext.ExceptionMapper

data class ExceptionInfo(val message: String)

class GeneralExceptionMapper : ExceptionMapper<Exception> {
    @Context
    private lateinit var request: HttpServletRequest

    companion object : KLogging()

    override fun toResponse(exception: Exception): Response {
        logger.error(exception) {
            "Request failed (${request.method} ${request.requestURL.chainIfNotNull(request.queryString) {
                append("?").append(
                    it
                )
            }.chainIfNotNull(request.getHeader("referer")) { append("; referer: ").append(it) }}): ${exception.message}"
        }

        return when (exception) {
            is ClientErrorException ->
                exception.response
            else -> Response
                .status(Response.Status.INTERNAL_SERVER_ERROR)
                .entity(ExceptionInfo(exception.message ?: exception.javaClass.name))
                .cacheControl(CacheControl.valueOf("no-cache, no-store"))
                .build()
        }
    }
}

