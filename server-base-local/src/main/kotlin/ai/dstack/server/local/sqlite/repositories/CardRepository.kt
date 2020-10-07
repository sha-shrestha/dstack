package ai.dstack.server.local.sqlite.repositories

import ai.dstack.server.local.sqlite.model.CardId
import ai.dstack.server.local.sqlite.model.CardItem
import org.springframework.data.repository.CrudRepository

interface CardRepository : CrudRepository<CardItem, CardId> {
    fun findAllByDashboard(dashboard: String): Iterable<CardItem>

    fun findAllByStack(stack: String): Iterable<CardItem>
}