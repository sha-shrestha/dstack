package ai.dstack.core.api.model

import com.google.common.truth.Truth.assertThat
import org.junit.jupiter.api.Test

internal class UserPlanTest {

    @Test
    fun getCode() {
        assertThat(UserPlan.fromCode("free") == UserPlan.Free)
        assertThat(UserPlan.fromCode("team") == UserPlan.Team)
        assertThat(UserPlan.Free.code == "free")
        assertThat(UserPlan.Team.code == "team")
    }
}