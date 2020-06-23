package ai.dstack.server.services

class AppConfigImpl : AppConfig {
    override val supportEmail: String
        get() {
            return System.getenv("dstackai_support_email") ?: "team@dstack.ai"
        }

    override val stageName: String
        get() {
            return System.getenv("dstackai_aws_stage_name")
        }

    override val region: String
        get() {
            return System.getenv("dstackai_aws_region")
        }

    override val hostName: String
        get() {
            return System.getenv("dstackai_host_name") ?: "localhost"
        }

    override val port: Int?
        get() {
            return System.getenv("dstackai_port")?.toInt()
        }

    override val internalPort: Int
        get() {
            return System.getenv("dstackai_internal_port")?.toInt() ?: 8080
        }

    override val ssl: Boolean
        get() {
            return System.getenv("dstackai_ssl")?.toBoolean() ?: false
        }

    override val address: String
        get() {
            return ((if (ssl) "https" else "http") + "://") + hostName + (if (port != null) ":${port}" else "")
        }

    override val schedulerQueueUrl: String
        get() {
            return System.getenv("dstackai_scheduler_queue_url")
        }

    override val dataDirectory: String
        get() {
            return System.getenv("dstackai_data_dir") ?: "./data"
        }

    override val fileDirectory: String
        get() {
            return System.getenv("dstackai_file_dir") ?: "${dataDirectory}/files"
        }

    override val smtpHost: String
        get() {
            return System.getenv("dstackai_smtp_host")
        }

    override val smtpPort: Int
        get() {
            return System.getenv("dstackai_smtp_port").toInt()
        }

    override val smtpUser: String?
        get() {
            return System.getenv("dstackai_smtp_user")
        }

    override val smtpPassword: String?
        get() {
            return System.getenv("dstackai_smtp_password")
        }

    override val smtpStartTLS: Boolean
        get() {
            return System.getenv("dstackai_smtp_starttls")?.toBoolean() ?: true
        }

    override val smtpFrom: String
        get() {
            return System.getenv("dstackai_smtp_from")
        }
}