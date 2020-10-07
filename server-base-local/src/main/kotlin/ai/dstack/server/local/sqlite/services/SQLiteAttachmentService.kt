package ai.dstack.server.local.sqlite.services

import ai.dstack.server.model.Attachment
import ai.dstack.server.model.AttachmentTypeMigration
import ai.dstack.server.services.AttachmentService
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.local.sqlite.model.AttachId
import ai.dstack.server.local.sqlite.model.AttachmentItem
import ai.dstack.server.local.sqlite.repositories.AttachmentRepository
import ai.dstack.server.local.sqlite.toNullable
import com.fasterxml.jackson.core.type.TypeReference

class SQLiteAttachmentService(private val repository: AttachmentRepository) :
    AttachmentService {
    override fun get(frame: String, index: Int): Attachment? {
        return repository.findById(mapId(frame, index)).toNullable()?.toAttachment()
    }

    override fun deleteByStackPath(stackPath: String) {
        repository.deleteAllByStack(stackPath)
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
                this.legacyType,
                this.application,
                this.contentType
            )
            Attachment(
                a.frame,
                a.file,
                a.description,
                values.legacyType ?: "unknown",
                values.application,
                values.contentType ?: "unknown",
                a.length,
                a.index,
                sqliteMapper.readValue(a.paramsJson,
                    object : TypeReference<Map<String, Any>>() {}),
                sqliteMapper.readValue(a.settingsJson,
                    object : TypeReference<Map<String, Any>>() {}),
                a.createdDate
            )
        }
    }

    private fun Attachment.toAttachmentItem(): AttachmentItem {
        return this.let { a ->
            val values = AttachmentTypeMigration.migrate(this.legacyType, this.application, this.contentType)
            AttachmentItem(
                a.framePath,
                a.index,
                a.filePath,
                values.legacyType ?: "unknown",
                values.application,
                values.contentType ?: "unknown",
                a.length,
                a.description,
                sqliteMapper.writeValueAsString(
                    a.params
                ),
                sqliteMapper.writeValueAsString(
                    a.settings
                ),
                a.createdDate
            )
        }
    }
}