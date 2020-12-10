package ai.dstack.server.jersey.resources.stacks

import ai.dstack.server.chainIfNotNull
import ai.dstack.server.model.AccessLevel
import ai.dstack.server.model.Card
import ai.dstack.server.model.Dashboard
import ai.dstack.server.services.*
import ai.dstack.server.jersey.resources.*
import ai.dstack.server.jersey.resources.malformedRequest
import ai.dstack.server.jersey.resources.ok
import ai.dstack.server.jersey.resources.payload.*
import ai.dstack.server.jersey.resources.status.*
import ai.dstack.server.model.Head
import mu.KLogging
import java.time.Instant
import java.util.*
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.container.ResourceContext
import javax.ws.rs.core.Context
import javax.ws.rs.core.HttpHeaders
import javax.ws.rs.core.Response

private val CreateDashboardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()

private val UpdateDashboardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isNullOrBlank()
            || (this.title == null && this.private == null && this.description == null)

private val DeleteDashboardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isNullOrBlank()

private val InsertCardsPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.dashboard.isNullOrBlank()
            || this.index == null
            || this.index < 0
            || this.cards?.none {
                it.stack.isNullOrBlank() || (it.columns != null && it.columns != 1 && it.columns != 2)
            } != true

private val UpdateCardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.dashboard.isNullOrBlank()
            || this.stack.isNullOrBlank()
            || (this.columns != null && this.columns != 1 && this.columns != 2)
            || (this.index == null && this.title == null && this.description == null && this.columns == null)

private val DeleteCardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.dashboard.isNullOrBlank()
            || this.stack.isNullOrBlank()

@Path("/dashboards")
class DashboardResources {
    @Context
    private lateinit var resourceContext: ResourceContext

    @Inject
    private lateinit var userService: UserService

    @Inject
    private lateinit var sessionService: SessionService

    @Inject
    private lateinit var stackService: StackService

    @Inject
    private lateinit var frameService: FrameService

    @Inject
    private lateinit var attachmentService: AttachmentService

    @Inject
    private lateinit var dashboardService: DashboardService

    @Inject
    private lateinit var cardService: CardService

    @Inject
    private lateinit var permissionService: PermissionService

    companion object : KLogging()

    @GET
    @Path("/{user}")
    @Produces(JSON_UTF8)
    fun dashboards(@PathParam("user") u: String?, @Context headers: HttpHeaders): Response {
        logger.debug { "user: $u" }
        return if (u.isNullOrBlank()) {
            malformedRequest()
        } else {
            val user = userService.get(u)
            return if (user == null) {
                userNotFound()
            } else {
                val dashboards = dashboardService.findByUserName(u)
                val session = headers.bearer?.let { sessionService.get(it) }
                val owner = session != null && (user.name == session.userName)
                val sharedDashboards = if (owner) {
                    // TODO: This is not optimal solution
                    permissionService.findByIdentity(u).map { p ->
                        val (u, s) = p.path.parseStackPath()
                        dashboardService.get(u, s)
                    }.filterNotNull()
                } else emptySequence()
                val permittedDashboards = dashboards.filter { dashboard ->
                    val public = !dashboard.private
                    val permitted = public || session != null &&
                            (session.userName == dashboard.userName
                                    || permissionService.get(dashboard.path, session.userName) != null)
                    permitted
                }.plus(sharedDashboards)
                        .sortedByDescending { it.timestampMillis }
                        .toList()
                ok(GetDashboardsStatus(dashboards = permittedDashboards.map { dashboard ->
                    val cards = cardService.getByDashboardPath(dashboard.path)
                    DashboardBasicInfo(
                            dashboard.userName, dashboard.id, dashboard.title, dashboard.description, dashboard.private,
                            cards.map { c ->
                                // TODO: This is not optimal
                                val (u, s) = c.stackPath.parseStackPath()
                                val stack = stackService.get(u, s)
                                CardBasicInfo(
                                        c.stackPath,
                                        c.index,
                                        c.title,
                                        c.description,
                                        c.columns,
                                        stack?.let { s ->
                                            s.head?.let { h ->
                                                BasicFrameInfo(
                                                        h.id,
                                                        h.timestampMillis,
                                                        emptyMap()
                                                )
                                            }
                                        })
                            },
                            if (owner) permissionService.findByPath(dashboard.path)
                                    .map {
                                        PermissionInfo(
                                                it.userName,
                                                it.email
                                        )
                                    }.toList() else null
                    )
                }))
            }
        }
    }

    @GET
    @Path("/{user}/{dashboard}")
    @Produces(JSON_UTF8)
    fun dashboard(
            @PathParam("user") u: String?,
            @PathParam("dashboard") d: String?,
            @Context headers: HttpHeaders
    ): Response {
        logger.debug { "user: $u, dashboard: $d" }
        return if (u.isNullOrBlank() || d.isNullOrBlank()) {
            malformedRequest()
        } else {
            val dashboard = dashboardService.get(u, d)
            if (dashboard == null) {
                dashboardNotFound()
            } else {
                val session = headers.bearer?.let { sessionService.get(it) }
                val user = session?.userName?.let { userService.get(it) }
                val public = !dashboard.private
                val owner = (session != null && (session.userName == dashboard.userName))
                        || user != null && user.name == dashboard.userName
                val permitted = public
                        || (session != null &&
                        (session.userName == dashboard.userName
                                || permissionService.get(dashboard.path, session.userName) != null))
                        || (user != null &&
                        (user.name == dashboard.userName
                                || permissionService.get(dashboard.path, user.name) != null))
                return if (!permitted) {
                    badCredentials()
                } else {
                    val requestedUser = userService.get(u)
                    if (requestedUser == null) {
                        userNotFound()
                    } else {
                        val cards = cardService.getByDashboardPath(dashboard.path)
                        session?.let { sessionService.renew(it) }
                        ok(
                                GetDashboardStatus(
                                        dashboard = DashboardInfo(
                                                dashboard.userName,
                                                dashboard.id,
                                                dashboard.title,
                                                dashboard.description,
                                                dashboard.private,
                                                cards.map {
                                                    // TODO: This is not optimal
                                                    val (u, s) = it.stackPath.parseStackPath()
                                                    val stack = stackService.get(u, s)
                                                    val head = stack?.head?.let { frameService.get(stack.path, it.id) }
                                                    CardInfo(it.stackPath,
                                                            it.index,
                                                            it.title,
                                                            it.description,
                                                            it.columns,
                                                            head?.let { h ->
                                                                val attachments = attachmentService.findByFrame(h.path)
                                                                FrameInfo(
                                                                        h.id, h.timestampMillis,
                                                                        attachments.map { a ->
                                                                            AttachmentInfo(
                                                                                    a.application,
                                                                                    a.contentType,
                                                                                    a.params,
                                                                                    a.settings,
                                                                                    a.length
                                                                            )
                                                                        }, h.params
                                                                )
                                                            })
                                                }.toList(),
                                                if (owner) permissionService.findByPath(dashboard.path)
                                                        .map {
                                                            PermissionInfo(
                                                                    it.userName,
                                                                    it.email
                                                            )
                                                        }.toList() else null
                                        )
                                )
                        )
                    }
                }
            }
        }
    }

    @POST
    @Path("/create")
    @Produces(JSON_UTF8)
    @Consumes(JSON_UTF8)
    fun create(payload: CreateDashboardPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { payload }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val session = headers.bearer?.let { sessionService.get(it) }
            val user = session?.userName?.let { userService.get(it) }
            return if (session == null || !session.valid || user == null
                    || user.name != payload!!.user
            ) {
                badCredentials()
            } else if (!user.verified) {
                userNotVerified()
            } else {
                val dashboard = Dashboard(
                        payload.user!!, UUID.randomUUID().toString(),
                        payload.title?.let { if (it.isBlank()) null else it },
                        payload.description?.let { if (it.isBlank()) null else it },
                        Instant.now().epochSecond,
                        payload.private ?: user.settings.general.defaultAccessLevel == AccessLevel.Private
                )
                dashboardService.create(dashboard)
                return ok(
                        GetDashboardStatus(
                                DashboardInfo(
                                        dashboard.userName,
                                        dashboard.id,
                                        dashboard.title,
                                        dashboard.description,
                                        dashboard.private,
                                        emptyList(),
                                        null
                                )
                        )
                )
            }
        }
    }

    @POST
    @Path("/update")
    @Produces(JSON_UTF8)
    @Consumes(JSON_UTF8)
    fun update(payload: UpdateDashboardPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { payload }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val session = headers.bearer?.let { sessionService.get(it) }
            val user = session?.userName?.let { userService.get(it) }
            return if (session == null || !session.valid || user == null
                    || user.name != payload!!.user
            ) {
                badCredentials()
            } else if (!user.verified) {
                userNotVerified()
            } else {
                val dashboard = dashboardService.get(payload.user!!, payload.id!!)
                if (dashboard == null) {
                    dashboardNotFound()
                } else {
                    dashboardService.update(
                            dashboard.copy(
                                    title = if (payload.title != null) { if (payload.title.isNotBlank()) payload.title else null } else dashboard.title,
                                    description = if (payload.description != null) { if (payload.description.isNotBlank()) payload.description else null } else dashboard.description,
                                    private = payload.private ?: dashboard.private
                            )
                    )
                    return ok()
                }
            }
        }
    }

    @POST
    @Path("/delete")
    @Produces(JSON_UTF8)
    @Consumes(JSON_UTF8)
    fun delete(payload: DeleteDashboardPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { payload }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val session = headers.bearer?.let { sessionService.get(it) }
            val user = session?.userName?.let { userService.get(it) }
            return if (session == null || !session.valid || user == null
                    || user.name != payload!!.user
            ) {
                badCredentials()
            } else if (!user.verified) {
                userNotVerified()
            } else {
                val dashboard = dashboardService.get(payload.user!!, payload.id!!)
                if (dashboard == null) {
                    dashboardNotFound()
                } else {
                    cardService.deleteByDashboardPath(dashboard.path)
                    dashboardService.delete(dashboard)
                    return ok()
                }
            }
        }
    }

    @POST
    @Path("/cards/insert")
    @Produces(JSON_UTF8)
    @Consumes(JSON_UTF8)
    fun insertCard(
            payload: InsertCardsPayload?,
            @QueryParam("attachments") attachments: Boolean?,
            @Context headers: HttpHeaders
    ): Response {
        logger.debug { payload }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val session = headers.bearer?.let { sessionService.get(it) }
            val user = session?.userName?.let { userService.get(it) }
            return if (session == null || !session.valid || user == null
                    || user.name != payload!!.user
            ) {
                badCredentials()
            } else if (!user.verified) {
                userNotVerified()
            } else {
                val dashboard = dashboardService.get(payload.user!!, payload.dashboard!!)
                val stackHeads = mutableMapOf<String, Head?>()
                if (dashboard == null) {
                    dashboardNotFound()
                } else {
                    val cards = cardService.getByDashboardPath(dashboard.path).toMutableList()
                    val insertedCards = mutableListOf<Card>()
                    payload.cards!!.forEachIndexed { cardPayloadIndex, cardPayload ->
                        val (u, s) = cardPayload.stack!!.parseStackPath()
                        val stack = stackService.get(u, s)
                        if (stack == null) {
                            stackNotFound()
                        } else {
                            stackHeads[stack.path] = stack.head
                            var index = payload.index!! + cardPayloadIndex
                            if (index > cards.size + cardPayloadIndex) {
                                index = cards.size + cardPayloadIndex
                            }
                            val card = Card(
                                    dashboard.path, index, cardPayload.stack,
                                    if (cardPayload.title.isNullOrBlank()) stack.name else cardPayload.title,
                                    if (cardPayload.description.isNullOrBlank()) null else cardPayload.description,
                                    cardPayload.columns ?: 1
                            )
                            cards.add(index, card)
                            cardService.create(card)
                        }
                    }
                    cardService.update(
                            cards.mapIndexed { index, card ->
                                index to card
                            }.filter { (index, card) ->
                                index != card.index
                            }.map { (index, card) ->
                                card.copy(index = index).also {
                                    cards.set(index, it)
                                }
                            }
                    )
                    return ok(UpdateDashboardStatus(
                            UpdateDashboardInfo(dashboard.userName,
                                    dashboard.id,
                                    dashboard.title,
                                    dashboard.description,
                                    dashboard.private,
                                    cards.map { card ->
                                        val head = stackHeads[card.stackPath]?.let { frameService.get(card.stackPath, it.id) }
                                        CardInfo(card.stackPath,
                                                card.index,
                                                card.title,
                                                card.description,
                                                card.columns,
                                                head?.let { h ->
                                                    val attachs = attachmentService.findByFrame(h.path)
                                                    FrameInfo(
                                                            h.id, h.timestampMillis,
                                                            attachs.map { a ->
                                                                AttachmentInfo(
                                                                        a.application,
                                                                        a.contentType,
                                                                        a.params,
                                                                        a.settings,
                                                                        a.length
                                                                )
                                                            }, h.params
                                                    )
                                                })
                                    }
                            )
                    ))
                }
            }
        }
    }

    private fun updateIndexes(cards: MutableList<Card>) {
        val iterator = cards.listIterator()
        var i = 0
        while (iterator.hasNext()) {
            val c = iterator.next()
            iterator.set(c.copy(index = i))
            i++
        }
    }

    @POST
    @Path("/cards/update")
    @Produces(JSON_UTF8)
    @Consumes(JSON_UTF8)
    fun updateCard(payload: UpdateCardPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { payload }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val session = headers.bearer?.let { sessionService.get(it) }
            val user = session?.userName?.let { userService.get(it) }
            return if (session == null || !session.valid || user == null
                    || user.name != payload!!.user
            ) {
                badCredentials()
            } else if (!user.verified) {
                userNotVerified()
            } else {
                val dashboard = dashboardService.get(payload.user!!, payload.dashboard!!)
                if (dashboard == null) {
                    dashboardNotFound()
                } else {
                    val (u, s) = payload.stack!!.parseStackPath()
                    val stack = stackService.get(u, s)
                    if (stack == null) {
                        stackNotFound()
                    } else {
                        if (payload.index != null) {
                            var index = payload.index
                            val cards =
                                    cardService.getByDashboardPath(dashboard.path).sortedBy { it.index }.toMutableList()
                            if (index > cards.size) {
                                index = cards.size
                            }
                            val card = cards.find {
                                it.dashboardPath == Dashboard.path(payload.user, payload.dashboard)
                                        && it.stackPath == payload.stack
                            }
                            if (card == null) {
                                cardNotFound()
                            } else {
                                cards.remove(card)
                                cards.add(
                                        index,
                                        card.chainIfNotNull(payload.title) {
                                            this.copy(title = if (it.isNotBlank()) it else null)
                                        }.chainIfNotNull(payload.description) {
                                            this.copy(description = if (it.isNotBlank()) it else null)
                                        }.chainIfNotNull(payload.columns) {
                                            this.copy(columns = it)
                                        }
                                )
                                updateIndexes(cards)
                                cardService.update(cards)
                                ok(
                                        UpdateDashboardInfo(
                                                dashboard.userName,
                                                dashboard.id,
                                                dashboard.title,
                                                dashboard.description,
                                                dashboard.private,
                                                cards.map {
                                                    CardInfo(
                                                            it.stackPath,
                                                            it.index,
                                                            it.title,
                                                            it.description,
                                                            it.columns,
                                                            null
                                                    )
                                                }
                                        )
                                )
                            }
                        } else {
                            val card = cardService.get(Dashboard.path(payload.user, payload.dashboard), payload.stack)
                            if (card == null) {
                                cardNotFound()
                            } else {
                                cardService.update(
                                        listOf(
                                                card.chainIfNotNull(payload.title) {
                                                    this.copy(title = if (it.isNotBlank()) it else null)
                                                }.chainIfNotNull(payload.description) {
                                                    this.copy(description = if (it.isNotBlank()) it else null)
                                                }.chainIfNotNull(payload.columns) {
                                                    this.copy(columns = it)
                                                }
                                        )
                                )
                                val cards =
                                        cardService.getByDashboardPath(dashboard.path).sortedBy { it.index }.toMutableList()
                                ok(
                                        UpdateDashboardInfo(
                                                dashboard.userName,
                                                dashboard.id,
                                                dashboard.title,
                                                dashboard.description,
                                                dashboard.private,
                                                cards.map {
                                                    CardInfo(
                                                            it.stackPath,
                                                            it.index,
                                                            it.title,
                                                            it.description,
                                                            it.columns,
                                                            null
                                                    )
                                                }
                                        )
                                )
                            }
                        }
                    }
                }
            }
        }
    }

    @POST
    @Path("/cards/delete")
    @Produces(JSON_UTF8)
    @Consumes(JSON_UTF8)
    fun deleteCard(payload: DeleteCardPayload?, @Context headers: HttpHeaders): Response {
        logger.debug { payload }
        return if (payload.isMalformed) {
            malformedRequest()
        } else {
            val session = headers.bearer?.let { sessionService.get(it) }
            val user = session?.userName?.let { userService.get(it) }
            return if (session == null || !session.valid || user == null
                    || user.name != payload!!.user
            ) {
                badCredentials()
            } else if (!user.verified) {
                userNotVerified()
            } else {
                val dashboard = dashboardService.get(payload.user!!, payload.dashboard!!)
                if (dashboard == null) {
                    dashboardNotFound()
                } else {
                    val (u, s) = payload.stack!!.parseStackPath()
                    val stack = stackService.get(u, s)
                    if (stack == null) {
                        stackNotFound()
                    } else {
                        val cards = cardService.getByDashboardPath(dashboard.path).sortedBy { it.index }.toMutableList()
                        val card = cards.find {
                            it.dashboardPath == Dashboard.path(payload.user, payload.dashboard)
                                    && it.stackPath == payload.stack
                        }
                        if (card == null) {
                            cardNotFound()
                        } else {
                            cards.remove(card)
                            cardService.delete(card)
                            updateIndexes(cards)
                            cardService.update(cards)
                            ok(
                                    UpdateDashboardInfo(dashboard.userName,
                                            dashboard.id,
                                            dashboard.title,
                                            dashboard.description,
                                            dashboard.private,
                                            cards.map {
                                                CardInfo(
                                                        it.stackPath,
                                                        it.index,
                                                        it.title,
                                                        it.description,
                                                        it.columns,
                                                        null
                                                )
                                            }
                                    )
                            )
                        }
                    }
                }
            }
        }
    }
}