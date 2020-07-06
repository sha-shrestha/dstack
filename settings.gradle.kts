pluginManagement {
    repositories {
        mavenCentral()
        jcenter()
        maven { url = uri("https://plugins.gradle.org/m2/") }
    }
}

include(":server-base")
include(":server-base-local")
include(":server-local-cli")