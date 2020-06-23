import kotlin.properties.ReadOnlyProperty
import kotlin.reflect.KProperty


enum class Modules(val id: String) {
    SERVER_BASE(":server-base"),
    SERVER_BASE_LOCAL(":server-base-local"),
    SERVER_LOCAL_CLI(":server-local-cli");

    private val tasks: TasksProperty get() = TasksProperty()

    private class TasksProperty : ReadOnlyProperty<Modules, String> {
        override fun getValue(thisRef: Modules, property: KProperty<*>): String {
            return "${thisRef.id}:${property.name}"
        }
    }
}