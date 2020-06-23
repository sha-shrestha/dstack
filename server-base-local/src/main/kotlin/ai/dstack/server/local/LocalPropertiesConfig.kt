package ai.dstack.server.local

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.PropertySource

@Configuration
@PropertySource("classpath:ai/dstack/server/local/application.properties")
open class LocalPropertiesConfig