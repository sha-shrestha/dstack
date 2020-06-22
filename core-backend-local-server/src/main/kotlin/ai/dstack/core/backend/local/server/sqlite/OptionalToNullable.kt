package ai.dstack.core.backend.local.server.sqlite

import java.util.*

fun <T : Any> Optional<T>.toNullable(): T? {
    return if (this.isPresent) {
        this.get()
    } else {
        null
    }
}