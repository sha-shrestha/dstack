package ai.dstack.server.model

@Deprecated("Will be dropped in August")
data class AttachmentTypeMigration(val legacyType: String?, val application: String?, val contentType: String?) {
    companion object {
        fun migrate(type: String?, application: String?, contentType: String?): AttachmentTypeMigration {
            return if (!contentType.isNullOrBlank()) {
                AttachmentTypeMigration(
                        legacyType = type?.patchLegacyType() ?: generateLegacyType(application, contentType),
                        application = application,
                        contentType = contentType
                )
            } else {
                generateNewValues(type)
            }
        }

        private fun String.patchLegacyType(): String {
            return if (this == "image/svg") {
                "image/svg+xml"
            } else {
                this
            }
        }

        private fun generateLegacyType(application: String?, contentType: String): String {
            return when {
                application == "plotly" -> "plotly"
                application == "bokeh" -> "bokeh"
                contentType == "text/csv" -> "text/csv"
                contentType == "image/svg+xml" -> "image/svg+xml"
                contentType == "image/jpeg" -> "image/jpeg"
                contentType == "image/png" -> "image/png"
                else -> "unknown"
            }
        }

        private fun generateNewValues(legacyType: String?): AttachmentTypeMigration {
            return when (legacyType) {
                "text/csv" -> AttachmentTypeMigration(legacyType = "text/csv", application = null, contentType = "text/csv")
                "plotly" -> AttachmentTypeMigration(legacyType = "plotly", application = "plotly", contentType = "text/json")
                "image/png" -> AttachmentTypeMigration(legacyType = "image/png", application = "image", contentType = "image/png")
                "image/jpg" -> AttachmentTypeMigration(legacyType = "image/jpeg", application = "image", contentType = "image/jpeg")
                "image/jpeg" -> AttachmentTypeMigration(legacyType = "image/jpeg", application = "image", contentType = "image/jpeg")
                "image/svg" -> AttachmentTypeMigration(legacyType = "image/svg+xml", application = "image", contentType = "image/svg+xml")
                "image/svg+xml" -> AttachmentTypeMigration(legacyType = "image/svg+xml", application = "image", contentType = "image/svg+xml")
                "bokeh" -> AttachmentTypeMigration("bokeh", "bokeh", "text/json")
                else -> AttachmentTypeMigration(legacyType = legacyType, application = null,
                        contentType = null)
            }
        }
    }
}