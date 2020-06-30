package ai.dstack.server.jersey.resources.payload.resources

import ai.dstack.server.jersey.resources.payload.CreateCommentPayload
import ai.dstack.server.jersey.resources.stacks.isMalformed
import com.google.common.truth.Truth
import org.junit.jupiter.api.Test

class CreateCommentPayloadTest {
    @Test
    fun testPushPayloadIsMalformed() {
        // ok
        Truth.assertThat(
            CreateCommentPayload(
                stack = "cheptsov/test",
                text = "some text"
            ).isMalformed
        ).isFalse()

        Truth.assertThat(
            CreateCommentPayload(
                stack = "cheptsov/test",
                text = ""
            ).isMalformed
        ).isTrue()

        Truth.assertThat(
            CreateCommentPayload(
                stack = "cheptsov/test",
                text = null
            ).isMalformed
        ).isTrue()

        Truth.assertThat(
            CreateCommentPayload(stack = "cheptsov", text = "text").isMalformed
        ).isTrue()

        Truth.assertThat(
            CreateCommentPayload(
                stack = "cheptsov/",
                text = "text"
            ).isMalformed
        ).isTrue()

        Truth.assertThat(
            CreateCommentPayload(
                stack = "/test_plot",
                text = "text"
            ).isMalformed
        ).isTrue()
    }
}