package ai.dstack.server.local

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.autoconfigure.data.cassandra.CassandraDataAutoConfiguration
import org.springframework.context.annotation.ComponentScan
import org.springframework.scheduling.annotation.EnableScheduling

@EnableScheduling
@SpringBootApplication(exclude = [CassandraDataAutoConfiguration::class])
@ComponentScan("ai.dstack.server")
open class Application