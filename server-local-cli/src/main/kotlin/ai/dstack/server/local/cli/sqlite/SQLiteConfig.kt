package ai.dstack.server.local.cli.sqlite

import ai.dstack.server.services.AppConfig
import com.zaxxer.hikari.HikariConfig
import com.zaxxer.hikari.HikariDataSource
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.io.File
import javax.sql.DataSource


@Configuration
open class SQLiteConfig {
    @Bean
    open fun dataSource(@Autowired config: AppConfig): DataSource? {
        val dsConfig = HikariConfig()
        dsConfig.driverClassName = "org.sqlite.JDBC"
        val directory = File("${config.dataDirectory}/sqlite/")
        directory.mkdirs()
        dsConfig.jdbcUrl = "jdbc:sqlite:${directory.absolutePath}/dstack.sqlite3"
        dsConfig.maximumPoolSize = 1
        return HikariDataSource(dsConfig)
    }
}