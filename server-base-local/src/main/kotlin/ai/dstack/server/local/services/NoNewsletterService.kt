package ai.dstack.server.local.services

import ai.dstack.server.model.User
import ai.dstack.server.services.NewsletterService
import org.springframework.stereotype.Component

@Component
class NoNewsletterService: NewsletterService {
    override fun subscribe(user: User) {
    }
}