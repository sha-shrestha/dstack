package ai.dstack.server.jersey.services

import ai.dstack.server.model.Frame
import ai.dstack.server.model.Stack
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.services.FrameService

class InMemoryFrameService : FrameService {
    private val frames = mutableListOf<Frame>()

    override fun get(stackPath: String, frameId: String): Frame? {
        return frames.find { it.stackPath == stackPath && it.id == frameId }
    }

    override fun create(frame: Frame) {
        if (frames.find { it.stackPath == frame.stackPath && it.id == frame.id } == null) {
            frames.add(frame)
        } else {
            throw EntityAlreadyExists()
        }
    }

    override fun update(frame: Frame) {
        val index = frames.indexOfFirst { it.stackPath == frame.stackPath && it.id == frame.id }
        if (index >= 0) {
            frames[index] = frame
        }
        // TODO: Throw exception if not updated
    }

    override fun findByStackPath(stackPath: String): List<Frame> {
        return frames.filter { it.stackPath == stackPath }
    }

    override fun deleteByStackPath(stackPath: String) {
        frames.removeIf { it.stackPath == stackPath }
    }

    fun reset(frames: List<Frame> = emptyList()) {
        this.frames.clear()
        this.frames.addAll(frames)
    }
}