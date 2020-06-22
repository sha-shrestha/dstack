pluginManagement {
    repositories {
        mavenCentral()
        jcenter()
        maven { url = uri("https://plugins.gradle.org/m2/") }
    }
}

include(Modules.CORE_API.id)
include(Modules.CORE_BACKEND.id)
include(Modules.CORE_BACKEND_LOCAL.id)
include(Modules.CORE_BACKEND_LOCAL_SERVER.id)