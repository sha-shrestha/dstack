package ai.dstack.server.jersey.guice

import ai.dstack.server.services.AppConfig
import ai.dstack.server.services.AppConfigImpl
import mu.KLogging
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component

@Component
class DefaultConfigModule : ConfigModule {
    companion object : KLogging()

    @Bean
    override fun config(): AppConfig {
        return AppConfigImpl()
    }
}