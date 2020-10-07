package ai.dstack.server.local.sqlite

import java.util.*

fun <T : Any> Optional<T>.toNullable(): T? {
    return if (this.isPresent) {
        this.get()
    } else {
        null
    }
}