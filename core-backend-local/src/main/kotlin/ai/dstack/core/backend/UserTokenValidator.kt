package ai.dstack.core.backend

import ai.dstack.core.backend.jackson.API_MAPPER
import ai.dstack.core.backend.resources.payload.InfoPayload
import ai.dstack.core.backend.resources.status.UserStatus
import ai.dstack.core.backend.services.AppConfigImpl
import mu.KLogging
import javax.ws.rs.client.ClientBuilder
import javax.ws.rs.client.Entity
import javax.ws.rs.core.HttpHeaders
import javax.ws.rs.core.Response

class UserTokenValidator() {
    companion object : KLogging()

    fun validate(): Boolean {
        val config = AppConfigImpl()
        val client = ClientBuilder.newClient()
        val user = System.getenv("dstackai_user")
        val token = System.getenv("dstackai_token")
        if (user == null || token == null) {
            logger.error { "Make sure both \"dstackai_user\" and \"dstackai_token\" environment variables are set." }
            return false
        }
        val resp = client.target("https://api.dstack.ai/users/info")
            .request()
            .header(HttpHeaders.AUTHORIZATION, "Bearer $token")
            .post(
                Entity.json(
                    InfoPayload(user)
                )
            )
        val status = resp.entity<UserStatus>()
        if (resp.status != 200) {
            logger.error {
                "Can't check the credentials provided in \"dstackai_user\" and \"dstackai_token\" environment variables. " +
                        "Make sure the Internet connection is available and the credentials are valid."
            }
            return false
        }
        return true
    }

    private inline fun <reified T> Response.entity(): T {
        return API_MAPPER.readValue(readEntity(String::class.java), T::class.java)
    }
}