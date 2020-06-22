package ai.dstack.core.backend.filters

import java.util.*
import javax.annotation.Priority
import javax.ws.rs.Priorities
import javax.ws.rs.container.ContainerRequestContext
import javax.ws.rs.container.ContainerRequestFilter
import javax.ws.rs.container.ContainerResponseContext
import javax.ws.rs.container.ContainerResponseFilter
import javax.ws.rs.core.Response
import javax.ws.rs.ext.Provider

@Priority(value = Priorities.AUTHENTICATION)
@Provider
class CorsAllowAllRestResponseFilter : ContainerRequestFilter, ContainerResponseFilter {

    companion object {
        const val ACCESS_CONTROL_ALLOW_ORIGIN = "Access-Control-Allow-Origin"
        const val ACCESS_CONTROL_REQUEST_ORIGIN = "Origin"
        const val ACCESS_CONTROL_ALLOW_HEADERS = "Access-Control-Allow-Headers"
        const val ACCESS_CONTROL_REQUEST_HEADERS = "Access-Control-Request-Headers"
        const val ACCESS_CONTROL_REQUEST_METHOD = "Access-Control-Request-Method"
        const val ACCESS_CONTROL_ALLOW_METHODS = "Access-Control-Allow-Methods"
        const val ACCESS_CONTROL_ALLOW_CREDENTIALS = "Access-Control-Allow-Credentials"
        /**
         * In seconds
         * https://developer.mozilla.org/en/docs/HTTP/Access_control_CORS#Preflighted_requests
         */
        private const val ACCESS_CONTROL_MAX_AGE = "Access-Control-Max-Age"
        const val ACCESS_CONTROL_DEFAULT_MAX_AGE = 10 * 24 * 60 * 60
        const val OPTIONS_METHOD = "OPTIONS"
    }

    private var preflightMaxAge = ACCESS_CONTROL_DEFAULT_MAX_AGE

    override fun filter(req: ContainerRequestContext) {
        if (req.getHeaderString(ACCESS_CONTROL_REQUEST_ORIGIN) == null) {
            return
        }

        if (OPTIONS_METHOD.equals(req.method, ignoreCase = true)) {
            val ok = Response.ok()
            ok.header(ACCESS_CONTROL_ALLOW_ORIGIN, req.getHeaderString(ACCESS_CONTROL_REQUEST_ORIGIN))
            ok.header(ACCESS_CONTROL_ALLOW_METHODS, req.getHeaderString(ACCESS_CONTROL_REQUEST_METHOD))
            ok.header(ACCESS_CONTROL_ALLOW_HEADERS, req.getHeaderString(ACCESS_CONTROL_REQUEST_HEADERS))
            ok.header(ACCESS_CONTROL_ALLOW_CREDENTIALS, false.toString())
            ok.header(ACCESS_CONTROL_MAX_AGE, preflightMaxAge.toString())
            req.abortWith(ok.build())
        }
    }

    override fun filter(req: ContainerRequestContext, response: ContainerResponseContext) {
        val origin = req.getHeaderString(ACCESS_CONTROL_REQUEST_ORIGIN) ?: // Not a CORS request
                return

        val headers = response.headers
        if (!headers.containsKey(ACCESS_CONTROL_ALLOW_ORIGIN)) {
            // Already handled somewhere
            headers[ACCESS_CONTROL_ALLOW_ORIGIN] = Arrays.asList<Any>(origin)
            headers[ACCESS_CONTROL_ALLOW_CREDENTIALS] = Arrays.asList<Any>(false.toString())
        }
    }
}