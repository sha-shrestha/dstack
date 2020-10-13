package ai.dstack.server.jersey.resources.payload

import com.fasterxml.jackson.annotation.JsonIgnoreProperties
import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class InsertCardsPayload(
    val user: String?,
    val dashboard: String?,
    val index: Int?,
    val cards: List<InsertCardsPayloadCard>?
)

@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonIgnoreProperties(ignoreUnknown = true)
data class InsertCardsPayloadCard(
    val stack: String?,
    val title: String?,
    val description: String?,
    val columns: Int?
)
