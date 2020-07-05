plugins {
    `maven-publish`
}

dependencies {
    compile(Deps.javax_servlet_api)
    compile(Deps.jersey_server)
    compile(Deps.spring_context)
    compile(Deps.spring_bridge)
    compile(Deps.jackson_databind)
    compile(Deps.jackson_datatype_jsr310)
    compile(Deps.jersey_media_json_jackson)
    compile(Deps.jersey_hk2)
    compile(Deps.jackson_module_kotlin)

    runtime(Deps.jcl_over_slf4j)
    runtime(Deps.slf4j_log4j12)
//    runtime(Deps.log4j_json_layout)

    testCompile(Deps.jersey_test_framework_core)
    testCompile(Deps.jersey_test_framework_grizzly2)

    testRuntime(Deps.junit_vintage_engine)
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])
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