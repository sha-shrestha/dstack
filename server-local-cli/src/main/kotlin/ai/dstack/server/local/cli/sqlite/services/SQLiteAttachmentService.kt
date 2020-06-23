package ai.dstack.server.local.cli.sqlite.services

import ai.dstack.server.model.Attachment
import ai.dstack.server.model.AttachmentTypeMigration
import ai.dstack.server.services.AttachmentService
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.local.cli.sqlite.model.AttachId
import ai.dstack.server.local.cli.sqlite.model.AttachmentItem
import ai.dstack.server.local.cli.sqlite.repositories.AttachmentRepository
import ai.dstack.server.local.cli.sqlite.toNullable
import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

val SQLITE_MAPPER: ObjectMapper = ObjectMapper()
    .setSerializationInclusion(JsonInclude.Include.NON_ABSENT)
    .registerModule(JavaTimeModule())
    .registerModule(KotlinModule())
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)

@Component
class SQLiteAttachmentService @Autowired constructor(private val repository: AttachmentRepository) :
    AttachmentService {
    override fun get(frame: String, index: Int): Attachment? {
        return repository.findById(mapId(frame, index)).toNullable()?.toAttachment()
    }

    override fun create(attachment: Attachment) {
        if (!repository.existsById(attachment.mapId)) {
            repository.save(attachment.toAttachmentItem())
        } else throw EntityAlreadyExists()
    }

    override fun findByFrame(frame: String): List<Attachment> {
        return repository.findAllByFrame(frame).asSequence().map { it.toAttachment() }.toList()
    }

    private val Attachment.mapId
        get() = mapId(framePath, index)

    private fun mapId(framePath: String, attachIndex: Int) =
        AttachId(framePath, attachIndex)

    private fun AttachmentItem.toAttachment(): Attachment {
        return this.let { a ->
            val values = AttachmentTypeMigration.migrate(
                this.type,
                this.application,
                this.contentType,
                this.storageFormat
            )
            Attachment(
                a.frame,
                a.file,
                a.description,
                values.type,
                values.application,
                values.contentType,
                values.storageFormat,
                a.length,
                a.index,
                SQLITE_MAPPER.readValue(a.paramsJson,
                    object : TypeReference<Map<String, Any>>() {}),
                SQLITE_MAPPER.readValue(a.settingsJson,
                    object : TypeReference<Map<String, Any>>() {}),
                a.createdDate
            )
        }
    }

    private fun Attachment.toAttachmentItem(): AttachmentItem {
        return this.let { a ->
            val values = AttachmentTypeMigration.migrate(
                this.type,
                this.application,
                this.contentType,
                this.storageFormat
            )
            AttachmentItem(
                a.framePath,
                a.index,
                a.filePath,
                values.type,
                values.application,
                values.contentType,
                values.storageFormat,
                a.length,
                a.description,
                SQLITE_MAPPER.writeValueAsString(
                    a.params
                ),
                SQLITE_MAPPER.writeValueAsString(
                    a.settings
                ),
                a.createdDate
            )
        }
    }
}