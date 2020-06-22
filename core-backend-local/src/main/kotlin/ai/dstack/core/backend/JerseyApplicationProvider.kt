package ai.dstack.core.backend

import ai.dstack.core.api.chainIfNotNull
import ai.dstack.core.api.services.AppConfig
import ai.dstack.core.api.services.UserService
import ai.dstack.core.backend.guice.SpringAwareHK2ServiceLocatorFeature
import org.glassfish.jersey.server.ResourceConfig
import org.glassfish.jersey.servlet.ServletProperties
import org.springframework.beans.factory.BeanFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.io.*
import javax.inject.Inject
import javax.servlet.http.HttpServletResponse
import javax.ws.rs.*
import javax.ws.rs.core.Context
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response
import javax.ws.rs.core.Response.ok
import javax.ws.rs.core.StreamingOutput


@Path("/files")
class FilesResources {
    @Inject
    private lateinit var appConfig: AppConfig

    @Inject
    private lateinit var userStream: UserService

    @PUT
    @Consumes(MediaType.APPLICATION_OCTET_STREAM)
    @Path("/{path: .+}")
    fun upload(
        inputStream: InputStream, @PathParam("path") path: String,
        @QueryParam("user") user: String, @QueryParam("code") code: String
    ): Response {
        val u = userStream.get(user)
        return if (u != null && u.verificationCode == code) {
            val file = File("${appConfig.fileDirectory}/$path")
            file.parentFile.mkdirs()
            file.outputStream().use {
                inputStream.copyTo(it)
            }
            ok().build()
        } else {
            Response.status(Response.Status.FORBIDDEN).build()
        }
    }

    @GET
    @Path("/{path: .+}")
    @Throws(IOException::class)
    fun download(
        @Context resp: HttpServletResponse, @PathParam("path") path: String,
        @QueryParam("user") user: String, @QueryParam("code") code: String,
        @QueryParam("filename") filename: String,
        @QueryParam("type") type: String
    ): Response? {
        val u = userStream.get(user)
        return if (u != null && u.verificationCode == code) {
            val inputStream: FileInputStream = File("${appConfig.fileDirectory}/$path").inputStream()
            val streamingOutput = StreamingOutput { output ->
                try {
                    inputStream.copyTo(output)
                } catch (e: Exception) {
                    throw WebApplicationException(e)
                }
            }
            return ok(streamingOutput)
                .header("content-disposition", "attachment; filename=$filename")
                .chainIfNotNull(type) {
                    header("content-type", type)
                }.build()
        } else {
            Response.status(Response.Status.FORBIDDEN).build()
        }
    }
}

@Component
open class JerseyApplicationProvider {
    @Bean
    open fun resourceConfig(@Autowired beanFactory: BeanFactory): ResourceConfig {
        val config = JerseyApplication.resourceConfig
            .registerClasses(FilesResources::class.java)
            .property(ServletProperties.FILTER_FORWARD_ON_404, true)
        config.register(SpringAwareHK2ServiceLocatorFeature(beanFactory))
        return config
    }
}