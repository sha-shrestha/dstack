package ai.dstack.server.local.cli

import ai.dstack.server.local.Application
import ai.dstack.server.local.cli.services.LocalCliAppConfig
import org.apache.commons.cli.*
import org.springframework.boot.Banner
import org.springframework.boot.SpringApplication
import kotlin.system.exitProcess


fun main(args: Array<String>) {
    val options = Options()

    val port = Option("p", "port", true, "server port number")
    options.addOption(port)

    val parser: CommandLineParser = DefaultParser()
    val formatter = HelpFormatter()
    val cmd: CommandLine
    try {
        cmd = parser.parse(options, args)
    } catch (e: ParseException) {
        println(e.message)
        formatter.printHelp("java -jar server-local-cli.jar", options)
        exitProcess(1)
    }
    if (cmd.hasOption("port")) {
        LocalCliAppConfig.defaultInternalPort = cmd.getOptionValue("port")
    }

    val application = SpringApplication(Application::class.java)
    application.setBannerMode(Banner.Mode.OFF);
    application.run(*args)
}
