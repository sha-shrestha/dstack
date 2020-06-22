package ai.dstack.core.api.model

import com.google.common.truth.Truth
import org.junit.jupiter.api.Test

class StackTest {
    @Test
    fun getPath() {
        val stack = Stack(
            "peterschmidt85", "test_plot", false, null
        )
        Truth.assertThat(stack.path).isEqualTo("peterschmidt85/test_plot")
    }
}