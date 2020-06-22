package ai.dstack.core.api.model

import com.google.common.truth.Truth.assertThat
import org.junit.jupiter.api.Test
import java.time.LocalDateTime
import java.time.ZoneOffset

internal class SessionTest {

    @Test
    fun getValid() {
        assertThat(Session("00abb013-cfe5-4ce4-a124-16aad07521fa", "peterschmidt85",
            LocalDateTime.now(ZoneOffset.UTC).minusMinutes(1).toEpochSecond(ZoneOffset.UTC)
        ).valid).isFalse()
        assertThat(Session("00abb013-cfe5-4ce4-a124-16aad07521fa", "peterschmidt85",
            LocalDateTime.now(ZoneOffset.UTC).plusMinutes(1).toEpochSecond(ZoneOffset.UTC)
        ).valid).isTrue()
    }
}