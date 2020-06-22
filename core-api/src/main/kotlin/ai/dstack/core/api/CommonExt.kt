package ai.dstack.core.api

fun <T> T.chainIf(condition: Boolean, body: T.() -> T): T {
    return if (condition) this.body() else this
}

fun <T, R : Any> T.chainIfNotNull(value: R?, body: T.(R) -> T): T {
    return if (value != null) this.body(value) else this
}