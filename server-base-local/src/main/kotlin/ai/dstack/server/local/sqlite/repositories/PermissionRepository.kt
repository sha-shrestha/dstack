package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.PermissionId
import ai.dstack.server.local.sqlite.model.PermissionItem
import org.springframework.data.repository.CrudRepository

interface PermissionRepository : CrudRepository<PermissionItem, PermissionId> {
    fun findAllByPath(path: String): Iterable<PermissionItem>

    fun findAllByIdentity(identity: String): Iterable<PermissionItem>
}