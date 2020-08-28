package ai.dstack.server.services

import ai.dstack.server.model.Frame
import ai.dstack.server.model.Stack

interface FrameService {
    fun get(stackPath: String, frameId: String): Frame?
    fun create(frame: Frame)
    fun update(frame: Frame)
    fun findByStackPath(stackPath: String): List<Frame>
    fun deleteByStackPath(stackPath: String)
}