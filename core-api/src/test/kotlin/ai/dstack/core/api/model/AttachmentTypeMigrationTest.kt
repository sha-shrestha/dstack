package ai.dstack.core.api.model

import org.junit.jupiter.api.Test
import com.google.common.truth.Truth.assertThat

class AttachmentTypeMigrationTest {
    @Test
    fun migrate() {
        assertThat(
            AttachmentTypeMigration.migrate("text/csv", null, null, null)
        ).isEqualTo(
            AttachmentTypeMigration("text/csv", "unknown", "text/csv", "csv")
        )

        assertThat(
            AttachmentTypeMigration.migrate("text/csv", "", "", "")
        ).isEqualTo(
            AttachmentTypeMigration("text/csv", "unknown", "text/csv", "csv")
        )

        assertThat(
            AttachmentTypeMigration.migrate("text/csv", "tiddle", "text/csv", "csv")
        ).isEqualTo(
            AttachmentTypeMigration("text/csv", "tiddle", "text/csv", "csv")
        )

        assertThat(
            AttachmentTypeMigration.migrate("image/svg", null, null, null)
        ).isEqualTo(
            AttachmentTypeMigration("image/svg+xml", "image", "image/svg+xml", "svg")
        )

        assertThat(
            AttachmentTypeMigration.migrate("image/svg", "matplotlib", "image/svg+xml", "svg")
        ).isEqualTo(
            AttachmentTypeMigration("image/svg+xml", "matplotlib", "image/svg+xml", "svg")
        )

        assertThat(
            AttachmentTypeMigration.migrate("plotly", null, null, null)
        ).isEqualTo(
            AttachmentTypeMigration("plotly", "plotly", "text/json", "json")
        )

        assertThat(
            AttachmentTypeMigration.migrate("plotly", "plotly", "text/json", "json")
        ).isEqualTo(
            AttachmentTypeMigration("plotly", "plotly", "text/json", "json")
        )

        assertThat(
            AttachmentTypeMigration.migrate("bokeh", null, null, null)
        ).isEqualTo(
            AttachmentTypeMigration("bokeh", "bokeh", "text/json", "json")
        )

        assertThat(
            AttachmentTypeMigration.migrate("bokeh", "bokeh", "text/json", "json")
        ).isEqualTo(
            AttachmentTypeMigration("bokeh", "bokeh", "text/json", "json")
        )

        assertThat(
            AttachmentTypeMigration.migrate(null, "sklearn", "application/binary", "joblib")
        ).isEqualTo(
            AttachmentTypeMigration("unknown", "sklearn", "application/binary", "joblib")
        )

        assertThat(
            AttachmentTypeMigration.migrate("unknown", "sklearn", "application/binary", "joblib")
        ).isEqualTo(
            AttachmentTypeMigration("unknown", "sklearn", "application/binary", "joblib")
        )
    }
}