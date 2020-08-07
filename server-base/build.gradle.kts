plugins {
    `java-library`
    `maven-publish`
    signing
}

dependencies {
    compile(Deps.commons_codec)

    compile(Deps.javax_servlet_api)
    compile(Deps.jersey_server)
    compile(Deps.spring_context)
    compile(Deps.spring_bridge)
    compile(Deps.jackson_databind)
    compile(Deps.jackson_datatype_jsr310)
    compile(Deps.jersey_media_json_jackson)
    compile(Deps.jersey_hk2)
    compile(Deps.jaxb)
    compile(Deps.activation)
    compile(Deps.jackson_module_kotlin)

    runtime(Deps.jcl_over_slf4j)
    runtime(Deps.slf4j_log4j12)
//    runtime(Deps.log4j_json_layout)

    testCompile(Deps.jersey_test_framework_core)
    testCompile(Deps.jersey_test_framework_grizzly2)

    testRuntime(Deps.junit_vintage_engine)
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
                name.set("dstack Server Base")
                description.set("A base version of the dstack server")
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