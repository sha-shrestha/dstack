package ai.dstack.core.backend.jackson

import com.fasterxml.jackson.databind.ObjectMapper
import javax.ws.rs.ext.ContextResolver
import javax.ws.rs.ext.Provider


@Provider
class ObjectMapperContextResolver : ContextResolver<ObjectMapper> {
    override fun getContext(type: Class<*>?): ObjectMapper {
        return API_MAPPER
    }
}