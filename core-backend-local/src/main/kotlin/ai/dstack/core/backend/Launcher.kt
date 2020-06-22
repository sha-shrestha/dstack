package ai.dstack.core.backend

import ai.dstack.core.api.services.AppConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.Banner
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.web.server.ConfigurableWebServerFactory
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.stereotype.Component


@Component
class ServerPortCustomizer(@Autowired val config: AppConfig) :
    WebServerFactoryCustomizer<ConfigurableWebServerFactory> {
    override fun customize(factory: ConfigurableWebServerFactory) {
        factory.setPort(config.internalPort)
    }
}

@Configuration
@PropertySource("classpath:application-local.properties")
open class LocalPropertiesConfig

@EnableScheduling
@SpringBootApplication
open class Launcher

fun main(args: Array<String>) {
    val application = SpringApplication(Launcher::class.java)
    application.setBannerMode(Banner.Mode.OFF);
    application.run(*args)
}
