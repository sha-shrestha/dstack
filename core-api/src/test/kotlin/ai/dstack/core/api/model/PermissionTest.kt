package ai.dstack.core.api.model

import com.google.common.truth.Truth.assertThat
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertThrows
import java.lang.IllegalStateException

internal class PermissionTest {
    @Test
    fun test() {
        val emailPermission = Permission("peterschmidt85/test_plot", "andrey.peterschmidt85@gmail.com")
        assertThat(emailPermission.isEmail).isTrue()
        val nonEmailPermission = Permission("peterschmidt85/test_plot", "riwaj")
        assertThat(nonEmailPermission.isEmail).isFalse()
        assertThat(emailPermission.userName).isEqualTo(null)
        assertThat(nonEmailPermission.userName).isEqualTo("riwaj")
        assertThrows<IllegalStateException> { emailPermission.userNameOrThrow }
        assertThat(nonEmailPermission.userNameOrThrow).isEqualTo("riwaj")
        assertThat(nonEmailPermission.email).isEqualTo(null)
        assertThat(emailPermission.email).isEqualTo("andrey.peterschmidt85@gmail.com")
        assertThat(emailPermission.emailOrThrow).isEqualTo("andrey.peterschmidt85@gmail.com")
        assertThrows<IllegalStateException> { nonEmailPermission.emailOrThrow }
    }
}