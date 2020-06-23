package ai.dstack.server.local

import ai.dstack.server.local.jersey.FilesResources
import ai.dstack.server.jersey.JerseyApplication
import ai.dstack.server.jersey.guice.SpringAwareHK2ServiceLocatorFeature
import org.glassfish.jersey.server.ResourceConfig
import org.glassfish.jersey.servlet.ServletProperties
import org.springframework.beans.factory.BeanFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component

@Component
open class JerseyApplicationProvider {
    @Bean
    open fun resourceConfig(@Autowired beanFactory: BeanFactory): ResourceConfig {
        val config = JerseyApplication.resourceConfig
            .registerClasses(FilesResources::class.java)
            .property(ServletProperties.FILTER_FORWARD_ON_404, true)
        config.register(SpringAwareHK2ServiceLocatorFeature(beanFactory))
        return config
    }
}