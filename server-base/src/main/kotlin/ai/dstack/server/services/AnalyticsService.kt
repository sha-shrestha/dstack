package ai.dstack.server.services

interface AnalyticsService {
    fun track(category: String, action: String, label: String? = null, source: Any? = null, remoteAddr: String?) =
            track(category, action, label, source)

    @Deprecated("Use track with remoteAddr")
    fun track(category: String, action: String, label: String? = null, source: Any? = null)
}