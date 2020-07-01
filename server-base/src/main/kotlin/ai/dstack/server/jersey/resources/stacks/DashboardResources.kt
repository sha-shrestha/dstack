package ai.dstack.server.jersey.resources.stacks

import ai.dstack.server.model.AccessLevel
import ai.dstack.server.model.Card
import ai.dstack.server.model.Dashboard
import ai.dstack.server.services.*
import ai.dstack.server.jersey.resources.*
import ai.dstack.server.jersey.resources.malformedRequest
import ai.dstack.server.jersey.resources.ok
import ai.dstack.server.jersey.resources.payload.*
import ai.dstack.server.jersey.resources.status.*
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
            || (this.title.isNullOrBlank() && this.private == null)

private val DeleteDashboardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.id.isNullOrBlank()

private val InsertCardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.dashboard.isNullOrBlank()
            || this.stack.isNullOrBlank()
            || this.index == null
            || this.index < 0

private val UpdateCardPayload?.isMalformed: Boolean
    get() = this == null
            || this.user.isNullOrBlank()
            || this.dashboard.isNullOrBlank()
            || this.stack.isNullOrBlank()
            || (this.index == null && this.title == null)

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
                        dashboard.userName, dashboard.id, dashboard.title, dashboard.private,
                        cards.map { c ->
                            // TODO: This is not optimal
                            val (u, s) = c.stackPath.parseStackPath()
                            val stack = stackService.get(u, s)
                            CardBasicInfo(
                                c.stackPath,
                                c.index,
                                c.title,
                                stack?.let { s ->
                                    s.head?.let { h ->
                                        BasicFrameInfo(
                                            h.id,
                                            h.timestampMillis,
                                            null
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
                                    dashboard.private,
                                    cards.map {
                                        // TODO: This is not optimal
                                        val (u, s) = it.stackPath.parseStackPath()
                                        val stack = stackService.get(u, s)
                                        val head = stack?.head?.let { frameService.get(stack.path, it.id) }
                                        CardInfo(it.stackPath,
                                            it.index,
                                            it.title,
                                            head?.let { h ->
                                                val attachments = attachmentService.findByFrame(h.path)
                                                FrameInfo(
                                                    h.id, h.timestampMillis,
                                                    attachments.map { a ->
                                                        AttachmentInfo(
                                                            a.description,
                                                            a.legacyType,
                                                            a.application,
                                                            a.contentType,
                                                            a.params,
                                                            a.settings,
                                                            a.length
                                                        )
                                                    }, h.message
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
                    payload.title.orEmpty(),
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
                            title = payload.title ?: dashboard.title,
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
        payload: InsertCardPayload?,
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
                if (dashboard == null) {
                    dashboardNotFound()
                } else {
                    val (u, s) = payload.stack!!.parseStackPath()
                    val stack = stackService.get(u, s)
                    if (stack == null) {
                        stackNotFound()
                    } else {
                        var index = payload.index!!
                        val cards = cardService.getByDashboardPath(dashboard.path).toMutableList()
                        if (index > cards.size) {
                            index = cards.size
                        }
                        val card = Card(
                            dashboard.path, index, payload.stack,
                            if (payload.title.isNullOrBlank()) stack.name else payload.title
                        )
                        cards.add(index, card)
                        updateIndexes(cards)
                        cardService.create(card)
                        cardService.update(
                            cards.filter { it.index != index }
                        )
                        return ok(UpdateDashboardStatus(
                            UpdateDashboardInfo(dashboard.userName,
                                dashboard.id,
                                dashboard.title,
                                dashboard.private,
                                cards.map {
                                    CardInfo(it.stackPath,
                                        it.index,
                                        it.title,
                                        if (index == it.index && attachments == true) {
                                            val head = stack.head?.let { frameService.get(stack.path, it.id) }
                                            head?.let { h ->
                                                val attachs = attachmentService.findByFrame(h.path)
                                                FrameInfo(
                                                    h.id, h.timestampMillis,
                                                    attachs.map { a ->
                                                        AttachmentInfo(
                                                            a.description,
                                                            a.legacyType,
                                                            a.application,
                                                            a.contentType,
                                                            a.params,
                                                            a.settings,
                                                            a.length
                                                        )
                                                    }, h.message
                                                )
                                            }
                                        } else null)

                                }
                            )
                        ))
                    }
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
                                    if (payload.title != null)
                                        card.copy(title = payload.title)
                                    else
                                        card
                                )
                                updateIndexes(cards)
                                cardService.update(cards)
                                ok(
                                    UpdateDashboardInfo(
                                        dashboard.userName,
                                        dashboard.id,
                                        dashboard.title,
                                        dashboard.private,
                                        cards.map {
                                            CardInfo(
                                                it.stackPath,
                                                it.index,
                                                it.title,
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
                                        card.copy(title = payload.title!!)
                                    )
                                )
                                val cards =
                                    cardService.getByDashboardPath(dashboard.path).sortedBy { it.index }.toMutableList()
                                ok(
                                    UpdateDashboardInfo(
                                        dashboard.userName,
                                        dashboard.id,
                                        dashboard.title,
                                        dashboard.private,
                                        cards.map {
                                            CardInfo(
                                                it.stackPath,
                                                it.index,
                                                it.title,
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
                                    dashboard.private,
                                    cards.map {
                                        CardInfo(
                                            it.stackPath,
                                            it.index,
                                            it.title,
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