package ai.dstack.core.backend.guice

import ai.dstack.core.api.services.AppConfig

interface ConfigModule {
    fun config(): AppConfig
}