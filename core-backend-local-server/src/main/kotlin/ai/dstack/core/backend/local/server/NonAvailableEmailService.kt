package ai.dstack.core.backend.local.server

import ai.dstack.core.api.model.Comment
import ai.dstack.core.api.model.User
import ai.dstack.core.api.services.EmailService
import ai.dstack.core.api.services.NonAvailable
import org.springframework.stereotype.Component

@Component
class NonAvailableEmailService: EmailService, NonAvailable {
    override fun sendVerificationEmail(user: User) {
        throw UnsupportedOperationException()
    }

    override fun sendCommentEmail(user: User, comment: Comment) {
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