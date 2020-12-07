package ai.dstack.server.local.jersey

import ai.dstack.server.chainIfNotNull
import ai.dstack.server.services.AppConfig
import ai.dstack.server.services.UserService
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
        @PathParam("path") path: String,
        @QueryParam("user") user: String, @QueryParam("code") code: String,
        @QueryParam("filename") filename: String,
        @QueryParam("content_type") contentType: String
    ): Response? {
        val u = userStream.get(user)
        return if (u != null && u.verificationCode == code) {
            val file = File("${appConfig.fileDirectory}/$path")
            val length = file.length()
            val inputStream: FileInputStream = file.inputStream()
            val streamingOutput = StreamingOutput { output ->
                try {
                    inputStream.copyTo(output)
                } catch (e: Exception) {
                    throw WebApplicationException(e)
                }
            }
            return ok(streamingOutput)
                .header("content-disposition", "attachment; filename=$filename")
                .chainIfNotNull(contentType) {
                    header("content-type", contentType)
                    header("content-length", length)
                }.build()
        } else {
            Response.status(Response.Status.FORBIDDEN).build()
        }
    }
}

