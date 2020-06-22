package ai.dstack.core.backend.local.server.sqlite.repositories

import ai.dstack.core.backend.local.server.sqlite.model.CardId
import ai.dstack.core.backend.local.server.sqlite.model.CardItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CardRepository : CrudRepository<CardItem, CardId> {
    fun findAllByDashboard(dashboard: String): Iterable<CardItem>

    fun findAllByStack(stack: String): Iterable<CardItem>
}