import kotlin.properties.ReadOnlyProperty
import kotlin.reflect.KProperty


enum class Modules(val id: String) {
    CORE_API(":core-api"),
    CORE_BACKEND(":core-backend"),
    CORE_BACKEND_LOCAL(":core-backend-local"),
    CORE_BACKEND_LOCAL_SERVER(":core-backend-local-server");

    val test by tasks
    val build by tasks
    val buildZip by tasks
    val clean by tasks
    val shadowJar by tasks

    private val tasks: TasksProperty get() = TasksProperty()

    private class TasksProperty : ReadOnlyProperty<Modules, String> {
        override fun getValue(thisRef: Modules, property: KProperty<*>): String {
            return "${thisRef.id}:${property.name}"
        }
    }
}