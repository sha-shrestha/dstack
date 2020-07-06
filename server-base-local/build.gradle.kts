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

val sourceJar = task<Jar>("sourceJar") {
    description = "Creates a JAR that contains the source code."
    from(project.sourceSets["main"].allSource)
    classifier = "sources"
}
val javadocJar = task<Jar>("javadocJar") {
    dependsOn("javadoc")
    description = "Creates a JAR that contains the javadocs."
    from(tasks.named("javadoc"))
    classifier = "javadoc"
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            from(components["java"])
            artifact(sourceJar)
            artifact(javadocJar)
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