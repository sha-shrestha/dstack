package ai.dstack.server.services

import ai.dstack.server.model.Frame

interface FrameService {
    fun get(stackPath: String, frameId: String): Frame?
    fun create(frame: Frame)
    fun update(frame: Frame)
    fun findByStackPath(stackPath: String): List<Frame>
}