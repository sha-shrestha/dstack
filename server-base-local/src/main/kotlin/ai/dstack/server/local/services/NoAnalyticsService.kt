package ai.dstack.server.local.services

import ai.dstack.server.services.AnalyticsService
import org.springframework.stereotype.Component

@Component
class NoAnalyticsService: AnalyticsService {
    override fun track(category: String, action: String, label: String?, source: Any?, remoteAddr: String?) {
    }
}