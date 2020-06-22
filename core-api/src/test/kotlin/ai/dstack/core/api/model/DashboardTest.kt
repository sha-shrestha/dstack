package ai.dstack.core.api.model

import org.junit.jupiter.api.Test
import com.google.common.truth.Truth.assertThat

class DashboardTest {

    @Test
    fun getPath() {
        assertThat(
            Dashboard.path(
                "peterschmidt85",
                "00abb013-cfe5-4ce4-a124-16aad07521fa"
            )
        ).isEqualTo("peterschmidt85/d/00abb013-cfe5-4ce4-a124-16aad07521fa")
    }
}