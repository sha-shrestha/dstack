package ai.dstack.server.local.sqlite.services

import ai.dstack.server.model.Permission
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.services.PermissionService
import ai.dstack.server.local.sqlite.model.PermissionId
import ai.dstack.server.local.sqlite.model.PermissionItem
import ai.dstack.server.local.sqlite.repositories.PermissionRepository
import ai.dstack.server.local.sqlite.toNullable

class SQLitePermissionService(private val repository: PermissionRepository) :
    PermissionService {
    override fun get(path: String, user: String): Permission? {
        return repository.findById(mapId(path, user)).toNullable()?.toPermission()
    }

    override fun add(permission: Permission) {
        if (!repository.existsById(permission.mapId)) {
            repository.save(permission.toPermissionItem())
        } else throw EntityAlreadyExists()
    }

    override fun delete(permission: Permission) {
        repository.deleteById(permission.mapId)
    }

    override fun deleteByPath(path: String) {
        repository.deleteAll(repository.findAllByPath(path))
    }

    override fun findByPath(path: String): Sequence<Permission> {
        return repository.findAllByPath(path).asSequence().map { it.toPermission() }
    }

    override fun findByIdentity(identity: String): Sequence<Permission> {
        return repository.findAllByIdentity(identity).asSequence().map { it.toPermission() }
    }


    private val Permission.mapId
        get() = mapId(path, identity)

    private fun mapId(stackPath: String, userNameOrEmail: String) =
        PermissionId(stackPath, userNameOrEmail)

    private fun PermissionItem.toPermission(): Permission {
        return this.let { p ->
            Permission(p.path, p.identity)
        }
    }

    private fun Permission.toPermissionItem(): PermissionItem {
        return PermissionItem(path, identity)
    }
}