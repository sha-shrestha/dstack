package ai.dstack.core.api.model

import org.junit.jupiter.api.Test
import com.google.common.truth.Truth.assertThat

internal class FrameTest {
    @Test
    fun getPath() {
        val frame = Frame(
            "peterschmidt85/test_plot", "00abb013-cfe5-4ce4-a124-16aad07521fa",
            0, 1, null
        )
        assertThat(frame.path).isEqualTo("peterschmidt85/test_plot/00abb013-cfe5-4ce4-a124-16aad07521fa")
    }
}