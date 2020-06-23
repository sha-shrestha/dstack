package ai.dstack.server.local.cli

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource

@Configuration
@PropertySource("classpath:ai/dstack/server/local/cli/application.properties")
open class LocalCliPropertiesConfig