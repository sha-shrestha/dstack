package ai.dstack.server.jersey.resources.payload.resources

import ai.dstack.server.jersey.resources.payload.RegisterPayload
import ai.dstack.server.jersey.resources.users.isMalformed
import com.google.common.truth.Truth
import org.junit.jupiter.api.Test

class RegisterPayloadTest {
    @Test
    fun testPushPayloadIsMalformed() {
        // ok
        Truth.assertThat(
            RegisterPayload(
                name = "cheptsov",
                email = "andrey.cheptsov@gmail.com",
                password = "pass",
                plan = "free"
            ).isMalformed
        ).isFalse()

        // ok
        Truth.assertThat(
            RegisterPayload(
                name = "cheptsov",
                email = "andrey.cheptsov@gmail.com",
                password = "pass",
                plan = "team"
            ).isMalformed
        ).isFalse()

        // double hyphen
        Truth.assertThat(
            RegisterPayload(
                name = "chep--tsov",
                email = "andrey.cheptsov@gmail.com",
                password = "pass",
                plan = "free"
            ).isMalformed
        ).isTrue()

        // leading hyphen
        Truth.assertThat(
            RegisterPayload(
                name = "-cheptsov",
                email = "andrey.cheptsov@gmail.com",
                password = "pass",
                plan = "free"
            ).isMalformed
        ).isTrue()

        // trailing hyphen
        Truth.assertThat(
            RegisterPayload(
                name = "cheptsov-",
                email = "andrey.cheptsov@gmail.com",
                password = "pass",
                plan = "free"
            ).isMalformed
        ).isTrue()

        // forbidden char
        Truth.assertThat(
            RegisterPayload(
                name = "chep@tsov",
                email = "andrey.cheptsov@gmail.com",
                password = "pass",
                plan = "free"
            ).isMalformed
        ).isTrue()

        // wrong email
        Truth.assertThat(
            RegisterPayload(
                name = "cheptsov",
                email = "andrey.cheptsov",
                password = "pass",
                plan = "free"
            ).isMalformed
        ).isTrue()

        // no password
        Truth.assertThat(
            RegisterPayload(
                name = "cheptsov",
                email = "andrey.cheptsov@gmail.com",
                password = "",
                plan = "free"
            ).isMalformed
        ).isTrue()

        // no plan
        Truth.assertThat(
            RegisterPayload(
                name = "cheptsov",
                email = "andrey.cheptsov@gmail.com",
                password = "pass"
            ).isMalformed
        ).isTrue()
    }
}