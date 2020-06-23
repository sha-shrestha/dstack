package ai.dstack.server.services

interface AppConfig {
    val supportEmail: String
    val region: String
    val stageName: String
    val hostName: String
    val schedulerQueueUrl: String
    val ssl: Boolean
    val port: Int?
    val internalPort: Int
    val address: String
    val dataDirectory: String
    val fileDirectory: String
    val smtpHost: String
    val smtpPort: Int
    val smtpUser: String?
    val smtpPassword: String?
    val smtpStartTLS: Boolean
    val smtpFrom: String
}