package ai.dstack.server.local.cli.sqlite

import java.util.*

fun <T : Any> Optional<T>.toNullable(): T? {
    return if (this.isPresent) {
        this.get()
    } else {
        null
    }
}