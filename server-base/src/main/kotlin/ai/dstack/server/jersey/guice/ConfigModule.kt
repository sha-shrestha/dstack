package ai.dstack.server.jersey.guice

import ai.dstack.server.services.AppConfig

interface ConfigModule {
    fun config(): AppConfig
}