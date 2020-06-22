package ai.dstack.core.backend.filters

import javax.ws.rs.container.ContainerRequestContext
import javax.ws.rs.container.ContainerRequestFilter
import javax.ws.rs.container.ContainerResponseContext
import javax.ws.rs.container.ContainerResponseFilter
import javax.ws.rs.core.UriInfo
import javax.ws.rs.ext.Provider


@Provider
class UriInfoFilter : ContainerRequestFilter, ContainerResponseFilter {
    companion object {
        val URI_INFO = ThreadLocal<UriInfo>()
    }
    override fun filter(requestContext: ContainerRequestContext) {
        URI_INFO.set(requestContext.uriInfo)
    }

    override fun filter(requestContext: ContainerRequestContext, responseContext: ContainerResponseContext) {
        URI_INFO.remove()
    }
}