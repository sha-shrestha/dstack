package ai.dstack.server.jersey.services

import ai.dstack.server.model.Card
import ai.dstack.server.model.Job
import ai.dstack.server.services.CardService
import ai.dstack.server.services.EntityAlreadyExists

class InMemoryCardService : CardService {
    private val cards = mutableListOf<Card>()

    override fun create(card: Card) {
        if (cards.find { it.dashboardPath == card.dashboardPath && it.stackPath == card.stackPath } == null) {
            cards.add(card)
        } else {
            throw EntityAlreadyExists()
        }
    }

    override fun getByDashboardPath(dashboardPath: String): List<Card> {
        return cards.filter { it.dashboardPath == dashboardPath }
    }

    override fun get(dashboardPath: String, stackPath: String): Card? {
        return cards.find { it.dashboardPath == dashboardPath && it.stackPath == stackPath }
    }

    override fun update(cards: List<Card>) {
        cards.forEach { card ->
            val index = this.cards.indexOfFirst { it.dashboardPath == card.dashboardPath && it.stackPath == card.stackPath }
            if (index >= 0) {
                this.cards.set(index, card)
            }
            // TODO: Throw exception if not updated
        }
    }

    override fun delete(card: Card) {
        cards.removeIf { it.dashboardPath == card.dashboardPath && it.stackPath == card.stackPath }
    }

    override fun deleteByDashboardPath(dashboardPath: String) {
        cards.removeIf { it.dashboardPath == dashboardPath }
    }

    override fun deleteByStackPath(stackPath: String) {
        cards.removeIf { it.stackPath == stackPath }
    }

    fun reset(cards: List<Card> = emptyList()) {
        this.cards.clear()
        this.cards.addAll(cards)
    }
}