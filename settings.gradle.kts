pluginManagement {
    repositories {
        mavenCentral()
        jcenter()
        maven { url = uri("https://plugins.gradle.org/m2/") }
    }
}

include(Modules.SERVER_BASE.id)
include(Modules.SERVER_BASE_LOCAL.id)
include(Modules.SERVER_LOCAL_CLI.id)