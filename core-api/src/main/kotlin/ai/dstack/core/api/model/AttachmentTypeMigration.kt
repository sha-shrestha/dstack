package ai.dstack.core.api.model

data class AttachmentTypeMigration(
    val type: String,
    val application: String,
    val contentType: String,
    val storageFormat: String
) {
    companion object {
        const val BLANK = ""
        const val UNKNOWN = "unknown"

        fun migrate(
            type: String?,
            application: String?,
            contentType: String?,
            storageFormat: String?
        ): AttachmentTypeMigration {
            val newValuesExist = !application.isNullOrBlank() && !contentType.isNullOrBlank() && !storageFormat.isNullOrBlank()
                    && application != UNKNOWN && contentType != UNKNOWN && storageFormat != UNKNOWN
            return if (newValuesExist) {
                AttachmentTypeMigration(
                    type = type?.migrateType() ?: generateLegacyType(
                        application = application!!,
                        contentType = contentType!!,
                        storageFormat = storageFormat!!
                    ),
                    application = application!!, contentType = contentType!!, storageFormat = storageFormat!!
                )
            } else {
                generateNewValues(type)
            }
        }

        private fun String.migrateType(): String {
            return if (this == "image/svg") {
                "image/svg+xml"
            } else {
                this
            }
        }

        private fun generateLegacyType(application: String, contentType: String, storageFormat: String): String {
            return when {
                application == "plotly" -> "plotly"
                application == "bokeh" -> "bokeh"
                contentType == "text/csv" -> "text/csv"
                contentType == "image/svg+xml" -> "image/svg+xml"
                contentType == "image/jpeg" -> "image/jpeg"
                contentType == "image/png" -> "image/png"
                else -> UNKNOWN
            }
        }

        private fun generateNewValues(
            type: String?
        ): AttachmentTypeMigration {
            return when (type) {
                "text/csv" -> AttachmentTypeMigration(
                    type = "text/csv",
                    application = UNKNOWN,
                    contentType = "text/csv",
                    storageFormat = "csv"
                )
                "plotly" -> AttachmentTypeMigration(
                    type = "plotly",
                    application = "plotly",
                    contentType = "text/json",
                    storageFormat = "json"
                )
                "image/png" -> AttachmentTypeMigration(
                    type = "image/png",
                    application = "image",
                    contentType = "image/png",
                    storageFormat = "png"
                )
                "image/jpg" -> AttachmentTypeMigration(
                    type = "image/jpeg",
                    application = "image",
                    contentType = "image/jpeg",
                    storageFormat = "jpg"
                )
                "image/jpeg" -> AttachmentTypeMigration(
                    type = "image/jpeg",
                    application = "image",
                    contentType = "image/jpeg",
                    storageFormat = "jpg"
                )
                "image/svg" -> AttachmentTypeMigration(
                    type = "image/svg+xml",
                    application = "image",
                    contentType = "image/svg+xml",
                    storageFormat = "svg"
                )
                "image/svg+xml" -> AttachmentTypeMigration(
                    type = "image/svg+xml",
                    application = "image",
                    contentType = "image/svg+xml",
                    storageFormat = "svg"
                )
                "bokeh" -> AttachmentTypeMigration("bokeh", "bokeh", "text/json", "json")
                else -> AttachmentTypeMigration(
                    type = type ?: BLANK,
                    application = BLANK,
                    contentType = BLANK,
                    storageFormat = BLANK
                )
            }
        }
    }
}