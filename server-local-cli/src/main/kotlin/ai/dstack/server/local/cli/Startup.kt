package ai.dstack.server.local.cli

import ai.dstack.server.model.*
import ai.dstack.server.services.*
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import java.security.SecureRandom
import java.time.LocalDate
import java.util.*
import java.util.concurrent.ThreadLocalRandom
import javax.annotation.PostConstruct


@Configuration
open class Startup {
    @Autowired
    lateinit var config: AppConfig

    @Autowired
    lateinit var userService: UserService

    @PostConstruct
    fun initialize() {
        var user = userService.get("dstack")
        if (user == null) {
            user = User(
                name = "dstack",
                email = "dstack@localhost",
                password = RandomString(8, ThreadLocalRandom.current()).nextString(),
                token = UUID.randomUUID().toString(),
                verificationCode = UUID.randomUUID().toString(),
                verified = true,
                plan = UserPlan.Free,
                createdDate = LocalDate.now(),
                unverifiedName = "dstack",
                settings = Settings(General(AccessLevel.Public),
                    Notifications(false, false))
            )
            userService.create(user)
        }
        println("To access the dstack server, open one of these URLs in the browser:")
        println("\t\thttp://localhost:${config.internalPort}/auth/verify?user=dstack&code=${user.verificationCode}&next=/")
        println("\tor\thttp://127.0.0.1:${config.internalPort}/auth/verify?user=dstack&code=${user.verificationCode}&next=/")
        println()
        println("If you're using Python, use the following command line command to configure your dstack profile:")
        println("\tpip install dstack")
        println("\tdstack config --token ${user.token} --user ${user.name} --server http://localhost:${config.internalPort}/api")
        println()
        println("If you're using R, use the following R command to configure your dstack profile:")
        println("\tinstall.packages(\"dstack\")")
        println("\tdstack::configure(user = \"${user.name}\", token = \"${user.token}\", persist = \"global\", server = \"http://localhost:${config.internalPort}/api\")")
    }

    class RandomString(length: Int, random: Random, symbols: String) {
        /**
         * Generate a random string.
         */
        fun nextString(): String {
            for (idx in buf.indices) buf[idx] = symbols[random.nextInt(symbols.size)]
            return String(buf)
        }

        private val random: Random
        private val symbols: CharArray
        private val buf: CharArray
        /**
         * Create an alphanumeric string generator.
         */
        /**
         * Create an alphanumeric strings from a secure generator.
         */
        /**
         * Create session identifiers.
         */
        @JvmOverloads
        constructor(length: Int = 21, random: Random = SecureRandom()) : this(
            length,
            random,
                alphanum
        ) {
        }

        companion object {
            const val upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
            val lower = upper.toLowerCase(Locale.ROOT)
            const val digits = "0123456789"
            val alphanum =
                upper + lower + digits
        }

        init {
            require(length >= 1)
            require(symbols.length >= 2)
            this.random = Objects.requireNonNull(random)
            this.symbols = symbols.toCharArray()
            buf = CharArray(length)
        }
    }
}