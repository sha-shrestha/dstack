dependencies {
    compile(Deps.spring_boot_starter_jersey)
    compile(Deps.spring_boot_starter_web)
    compile(Deps.slf4j_log4j12)
    compile(Deps.commons_io)
    compile(Deps.spring_data_jpa)
    compile(Deps.sqlite_dialect)
    compile(Deps.sqlite_jdbc)
    compile(project(Modules.SERVER_BASE_LOCAL.id))
}

plugins {
    id("org.springframework.boot") version "2.2.6.RELEASE"
    `maven-publish`
}

springBoot {
    mainClassName = "ai.dstack.server.local.LauncherKt"
}

buildscript {
    repositories {
        maven {
            url = uri("https://plugins.gradle.org/m2/")
        }
    }
    dependencies {
        classpath("org.jetbrains.kotlin:kotlin-noarg:${Deps.KOTLIN_VERSION}")
    }
}

apply(plugin = "org.jetbrains.kotlin.plugin.jpa")

tasks {
    val npmInstall by registering(Exec::class) {
        workingDir = File("../website")
        commandLine = listOf("npm", "install")
    }

    val npmBuild by registering(Exec::class) {
        dependsOn(npmInstall)
        workingDir = File("../website")
        commandLine = listOf("npm", "run-script", "build")
    }

    val copyWebsite by registering(Sync::class) {
        from("../website/build")
        into("src/main/resources/website")
    }
}

publishing {
    publications {
        create<MavenPublication>("bootJava") {
            artifact(tasks.getByName("bootJar"))
        }
    }
    repositories {
        maven {
            val prefix = "https://oss.sonatype.org/content/repositories"
            val releasesRepoUrl = "$prefix/releases"
            val snapshotsRepoUrl = "$prefix/snapshots"
            url = uri(if (version.toString().endsWith("SNAPSHOT")) snapshotsRepoUrl else releasesRepoUrl)
            credentials {
                username = System.getenv("MAVEN_USERNAME")
                password = System.getenv("MAVEN_PASSWORD")
            }
        }
    }
}
