package ai.dstack.server.local

import org.springframework.boot.Banner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@SpringBootApplication
@ComponentScan("ai.dstack.server")
open class Launcher

fun main(args: Array<String>) {
    val application = SpringApplication(Launcher::class.java)
    application.setBannerMode(Banner.Mode.OFF);
    application.run(*args)
}
