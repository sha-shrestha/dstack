package ai.dstack.core.api.services

import ai.dstack.core.api.model.Frame

interface FrameService {
    fun get(stackPath: String, frameId: String): Frame?
    fun create(frame: Frame)
    fun update(frame: Frame)
    fun findByStackPath(stackPath: String): List<Frame>
}