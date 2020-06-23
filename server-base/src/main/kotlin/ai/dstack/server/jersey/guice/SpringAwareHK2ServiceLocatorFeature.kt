package ai.dstack.server.jersey.guice

import org.glassfish.jersey.InjectionManagerProvider
import org.glassfish.jersey.inject.hk2.DelayedHk2InjectionManager
import org.glassfish.jersey.inject.hk2.ImmediateHk2InjectionManager
import org.jvnet.hk2.spring.bridge.api.SpringBridge
import org.jvnet.hk2.spring.bridge.api.SpringIntoHK2Bridge
import org.springframework.beans.factory.BeanFactory
import javax.ws.rs.core.Feature
import javax.ws.rs.core.FeatureContext

class SpringAwareHK2ServiceLocatorFeature(val sc: BeanFactory): Feature {
    override fun configure(context: FeatureContext): Boolean {
        val injectionManager = InjectionManagerProvider.getInjectionManager(context)
        val locator = when (injectionManager) {
            is ImmediateHk2InjectionManager -> injectionManager.serviceLocator
            is DelayedHk2InjectionManager -> injectionManager.serviceLocator
            else -> throw IllegalStateException("Expected an hk2 injection manager")
        }

        SpringBridge.getSpringBridge().initializeSpringBridge(locator)
        val springBridge = locator.getService(SpringIntoHK2Bridge::class.java)
        springBridge.bridgeSpringBeanFactory(sc)
        return true
    }

}