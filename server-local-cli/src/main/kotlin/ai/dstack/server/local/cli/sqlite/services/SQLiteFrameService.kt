package ai.dstack.server.local.cli.sqlite.services

import ai.dstack.server.model.Frame
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.services.FrameService
import ai.dstack.server.local.cli.sqlite.model.FrameId
import ai.dstack.server.local.cli.sqlite.model.FrameItem
import ai.dstack.server.local.cli.sqlite.repositories.FrameRepository
import ai.dstack.server.local.cli.sqlite.toNullable
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
            ai.dstack.server.model.Frame(f.stack, f.id, f.timestamp, f.size, f.message)
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