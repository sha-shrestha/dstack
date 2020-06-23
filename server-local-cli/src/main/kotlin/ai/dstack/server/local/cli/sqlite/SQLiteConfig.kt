package ai.dstack.server.local.cli.sqlite

import ai.dstack.server.services.AppConfig
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.jdbc.DataSourceBuilder
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.io.File
import javax.sql.DataSource


@Configuration
open class SQLiteConfig {
    @Bean
    open fun dataSource(@Autowired config: AppConfig): DataSource? {
        val dataSourceBuilder = DataSourceBuilder.create()
        dataSourceBuilder.driverClassName("org.sqlite.JDBC")
        val directory = File("${config.dataDirectory}/sqlite/")
        directory.mkdirs()
        dataSourceBuilder.url("jdbc:sqlite:${directory.absolutePath}/dstack.sqlite3")
        return dataSourceBuilder.build()
    }
}