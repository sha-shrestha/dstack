package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.PermissionId
import ai.dstack.core.backend.local.server.sqlite.model.PermissionItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface PermissionRepository : CrudRepository<PermissionItem, PermissionId> {
    fun findAllByPath(path: String): Iterable<PermissionItem>

    fun findAllByIdentity(identity: String): Iterable<PermissionItem>
}