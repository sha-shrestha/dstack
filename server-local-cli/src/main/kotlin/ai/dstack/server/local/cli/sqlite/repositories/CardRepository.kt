package ai.dstack.server.local.cli.sqlite.repositories

import ai.dstack.server.local.cli.sqlite.model.CardId
import ai.dstack.server.local.cli.sqlite.model.CardItem
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface CardRepository : CrudRepository<CardItem, CardId> {
    fun findAllByDashboard(dashboard: String): Iterable<CardItem>

    fun findAllByStack(stack: String): Iterable<CardItem>
}