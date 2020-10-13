plugins {
    `java-library`
    `maven-publish`
    signing
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

dependencies {
    compile(Deps.spring_boot_starter_jersey)
    compile(Deps.spring_boot_starter_web)
    compile(Deps.slf4j_log4j12)
    compile(Deps.commons_io)
    compile(Deps.spring_data_jpa)
    compile(Deps.sqlite_dialect)
    compile(Deps.sqlite_jdbc)
    compile(project(":server-base"))
}

val publications: PublicationContainer = (extensions.getByName("publishing") as PublishingExtension).publications

signing {
    val signingKey: String? by project
    val signingPassword: String? by project
    useInMemoryPgpKeys(signingKey, signingPassword)
    sign(publications)
}

java {
    withJavadocJar()
    withSourcesJar()
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])

            pom {
                name.set("dstack Server Base Local")
                description.set("A local base version of the dstack server")
                url.set("https://github.com/dstackai/dstack")

                scm {
                    connection.set("scm:git:https://github.com/dstackai/dstack/")
                    developerConnection.set("scm:git:https://github.com/dstackai/")
                    url.set("https://github.com/dstackai/dstack/")
                }

                licenses {
                    license {
                        name.set("Apache-2.0")
                        url.set("https://opensource.org/licenses/Apache-2.0")
                    }
                }

                developers {
                    developer {
                        id.set("peterschmidt85")
                        name.set("Peter Schmidt")
                        email.set("team@dstack.ai")
                    }
                }
            }

        }
    }
    repositories {
        maven {
            val releasesRepoUrl = "https://oss.sonatype.org/service/local/staging/deploy/maven2"
            val snapshotsRepoUrl = "https://oss.sonatype.org/content/repositories/snapshots"
            url = uri(if (version.toString().endsWith("SNAPSHOT")) snapshotsRepoUrl else releasesRepoUrl)
            credentials {
                username = System.getenv("MAVEN_USERNAME")
                password = System.getenv("MAVEN_PASSWORD")
            }
        }
    }
}