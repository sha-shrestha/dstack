package ai.dstack.server.services

import ai.dstack.server.model.Permission

interface PermissionService {
    fun get(path: String, user: String): Permission?
    fun add(permission: Permission)
    fun delete(permission: Permission)
    fun deleteByPath(path: String)
    fun findByPath(path: String): Sequence<Permission>
    fun findByIdentity(identity: String): Sequence<Permission>
}