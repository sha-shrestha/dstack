package ai.dstack.server.local.cli.sqlite.services

import ai.dstack.server.model.Card
import ai.dstack.server.services.CardService
import ai.dstack.server.services.EntityAlreadyExists
import ai.dstack.server.local.cli.sqlite.model.CardId
import ai.dstack.server.local.cli.sqlite.model.CardItem
import ai.dstack.server.local.cli.sqlite.repositories.CardRepository
import ai.dstack.server.local.cli.sqlite.toNullable
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Component

@Component
class SQLiteCardService @Autowired constructor(private val repository: CardRepository) : CardService {
    override fun create(card: Card) {
        if (!repository.existsById(card.mapId)) {
            repository.save(card.toCardItem())
        } else throw EntityAlreadyExists()
    }

    override fun getByDashboardPath(dashboardPath: String): List<Card> {
        return repository.findAllByDashboard(dashboardPath).asSequence().map { it.toCard() }.toList()
    }

    override fun get(dashboardPath: String, stackPath: String): Card? {
        return repository.findById(mapId(dashboardPath, stackPath)).toNullable()?.toCard()
    }

    override fun update(cards: List<Card>) {
        cards.forEach { card ->
            repository.save(card.toCardItem())
        }
    }

    override fun delete(card: Card) {
        repository.delete(card.toCardItem())
    }

    override fun deleteByDashboardPath(dashboardPath: String) {
        repository.deleteAll(getByDashboardPath(dashboardPath)
            .map { it.toCardItem() }.toList()
        )
    }

    override fun deleteByStackPath(stackPath: String) {
        repository.deleteAll(repository.findAllByStack(stackPath).toList())
    }

    private val Card.mapId
        get() = mapId(dashboardPath, stackPath)

    private fun mapId(dashboardPath: String, stackPath: String) =
        CardId(dashboardPath, stackPath)

    private fun CardItem.toCard(): Card {
        return this.let { c ->
            ai.dstack.server.model.Card(c.dashboard, c.index, c.stack, c.title)
        }
    }

    private fun Card.toCardItem(): CardItem {
        return this.let { c ->
            CardItem(
                c.dashboardPath,
                c.stackPath,
                c.index,
                c.title
            )
        }
    }
}