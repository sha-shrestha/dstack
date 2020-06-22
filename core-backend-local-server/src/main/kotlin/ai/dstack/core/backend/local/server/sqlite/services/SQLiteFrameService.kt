package ai.dstack.core.backend.local.server.sqlite.services

import ai.dstack.core.api.model.Frame
import ai.dstack.core.api.services.EntityAlreadyExists
import ai.dstack.core.api.services.FrameService
import ai.dstack.core.backend.local.server.sqlite.model.FrameId
import ai.dstack.core.backend.local.server.sqlite.model.FrameItem
import ai.dstack.core.backend.local.server.sqlite.repositories.FrameRepository
import ai.dstack.core.backend.local.server.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteFrameService @Autowired constructor(private val repository: FrameRepository) : FrameService {
    override fun get(stackPath: String, frameId: String): Frame? {
        return repository.findById(mapId(stackPath, frameId)).toNullable()?.toFrame()
    }

    override fun create(frame: Frame) {
        if (!repository.existsById(frame.mapId)) {
            repository.save(frame.toFrameItem())
        } else throw EntityAlreadyExists()
    }

    override fun update(frame: Frame) {
        repository.save(frame.toFrameItem())
    }

    override fun findByStackPath(stackPath: String): List<Frame> {
        return repository.findAllByStack(stackPath).asSequence().map { it.toFrame() }.toList()
    }

    private val Frame.mapId
        get() = mapId(stackPath, id)

    private fun mapId(stackPath: String, frameId: String) =
        FrameId(stackPath, frameId)

    private fun FrameItem.toFrame(): Frame {
        return this.let { f ->
            ai.dstack.core.api.model.Frame(f.stack, f.id, f.timestamp, f.size, f.message)
        }
    }

    private fun Frame.toFrameItem(): FrameItem {
        return this.let { f ->
            FrameItem(
                f.stackPath,
                f.id,
                f.timestampMillis,
                f.size,
                f.message
            )
        }
    }
}