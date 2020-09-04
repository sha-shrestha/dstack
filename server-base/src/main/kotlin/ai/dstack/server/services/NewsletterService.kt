package ai.dstack.server.services

import ai.dstack.server.model.User

interface NewsletterService {
    fun subscribe(user: User)
}