package ai.dstack.server.local.cli

import ai.dstack.server.model.User
import ai.dstack.server.services.EmailService
import ai.dstack.server.services.NonAvailable
import org.springframework.stereotype.Component

@Component
class NonAvailableEmailService: EmailService, NonAvailable {
    override fun sendVerificationEmail(user: User) {
        throw UnsupportedOperationException()
    }

    override fun sendResetEmail(user: User) {
        throw UnsupportedOperationException()
    }

    override fun sendTriggerEmail(user: User) {
        throw UnsupportedOperationException()
    }

    override fun sendInviteEmail(fromUser: User, path: String, toEmail: String, verificationCode: String) {
        throw UnsupportedOperationException()
    }

    override fun sendInviteEmail(fromUser: User, path: String, toUser: User) {
        throw UnsupportedOperationException()
    }

    override fun sendSupportRequestEmail(name: String?, email: String, company: String?, message: String) {
        throw UnsupportedOperationException()
    }
}