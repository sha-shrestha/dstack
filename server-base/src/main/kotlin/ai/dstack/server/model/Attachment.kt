package ai.dstack.server.model

import java.time.LocalDate

data class Attachment(
    val framePath: String,
    val filePath: String,
    val description: String?,
    @Deprecated("Is replaced by contentType, application, and storageFormat.")
    val type: String,
    val application: String,
    val contentType: String,
    val storageFormat: String,
    val length: Long,
    val index: Int,
    val params: Map<String, Any>,
    val settings: Map<String, Any>,
    val createdDate: LocalDate
) {
    val filename: String
        get() {
            val framePathTokens = framePath.split("/")
            val prefix = framePathTokens.subList(0, framePathTokens.size - 1)
                .joinToString("_").replace("[/\\-]".toRegex(), "_")
            return "${prefix}_$index.$storageFormat"
        }
}