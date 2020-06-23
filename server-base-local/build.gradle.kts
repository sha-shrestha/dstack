plugins {
    `maven-publish`
}

dependencies {
    compile(Deps.spring_boot_starter_jersey)
    compile(Deps.spring_boot_starter_web)
    compile(Deps.slf4j_log4j12)
    compile(Deps.commons_io)
    compile(project(Modules.SERVER_BASE.id))
}

tasks {
    val npmInstall by registering(Exec::class) {
        workingDir = File("../website")
        commandLine = listOf("npm", "install")
    }

    val npmBuild by registering(Exec::class) {
//        dependsOn(npmInstall)
        workingDir = File("../website")
        commandLine = listOf("npm", "run-script", "build")
    }

    val buildWebsite by registering(Sync::class) {
//        dependsOn(npmBuild)
        from("../website/build")
        into("src/main/resources/website")
    }

    val processResources by tasks

    processResources.dependsOn(buildWebsite)
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])
        }
    }
    repositories {
        maven {
            url = uri("https://oss.sonatype.org/content/repositories/snapshots")
            credentials {
                username = System.getenv("MAVEN_USERNAME")
                password = System.getenv("MAVEN_PASSWORD")
            }
        }
    }
}