package ai.dstack.server.local

import ai.dstack.server.services.AppConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.web.server.ConfigurableWebServerFactory
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.stereotype.Component

@Component
class ServerPortCustomizer(@Autowired val config: AppConfig) :
        WebServerFactoryCustomizer<ConfigurableWebServerFactory> {
    override fun customize(factory: ConfigurableWebServerFactory) {
        factory.setPort(config.internalPort)
    }
}