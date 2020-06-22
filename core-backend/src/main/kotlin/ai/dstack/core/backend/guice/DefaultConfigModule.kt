package ai.dstack.core.backend.guice

import ai.dstack.core.api.services.AppConfig
import ai.dstack.core.backend.services.AppConfigImpl
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