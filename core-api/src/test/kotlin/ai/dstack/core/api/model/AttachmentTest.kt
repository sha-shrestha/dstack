package ai.dstack.core.api.model

import org.junit.jupiter.api.Test
import com.google.common.truth.Truth.assertThat
import java.time.LocalDate

class AttachmentTest {
    @Test
    fun getFilename() {
        val attachment1 = Attachment("peterschmidt85/covid19/speed/cc38d43a-783c-4aa8-8ac0-6de502396cde",
        "peterschmidt85/covid19/speed/cc38d43a-783c-4aa8-8ac0-6de502396cde/0", null,
        "text/csv", "pandas/dataframe", "text/csv", "csv", 2632L, 0, emptyMap(), emptyMap(), LocalDate.now())
        assertThat(attachment1.filename).isEqualTo("peterschmidt85_covid19_speed_0.csv")

        val attachment2 = Attachment("peterschmidt85/covid19/speed/cc38d43a-783c-4aa8-8ac0-6de502396cde",
        "peterschmidt85/covid19/speed/cc38d43a-783c-4aa8-8ac0-6de502396cde/0", null,
        "image/svg+xml", "matplotlib", "image/svg+xml", "svg", 2632L, 0, emptyMap(), emptyMap(), LocalDate.now())
        assertThat(attachment2.filename).isEqualTo("peterschmidt85_covid19_speed_0.svg")
    }
}