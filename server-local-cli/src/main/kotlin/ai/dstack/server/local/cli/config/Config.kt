package ai.dstack.server.local.cli.config

import com.fasterxml.jackson.core.type.TypeReference
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory
import com.fasterxml.jackson.dataformat.yaml.YAMLGenerator
import com.fasterxml.jackson.module.kotlin.KotlinModule
import java.io.File
import java.io.FileWriter

val mapper = ObjectMapper(YAMLFactory().enable(YAMLGenerator.Feature.MINIMIZE_QUOTES))
        .also {
            it.registerModule(KotlinModule())
        }

data class Profile(val user: String, val token: String?, val server: String?)

class Config(val yaml: MutableMap<String, Any> = mutableMapOf()) {
    operator fun get(index: String): Profile? {
        return yaml["profiles"]?.let {
            @Suppress("UNCHECKED_CAST")
            it as Map<String, Map<String, String>>
        }?.entries?.find {
            it.key == index
        }?.let {
            Profile(it.value["user"]
                    ?: error("No user defined for profile \"$index\""), it.value["token"], it.value["server"])
        }
    }

    operator fun set(index: String, value: Profile) {
        yaml.putIfAbsent("profiles", mapOf<String, Any>())
        if (yaml["profiles"] !is MutableMap<*, *>) {
            yaml["profiles"] = (yaml["profiles"] as Map<*, *>).toMutableMap()
        }
        @Suppress("UNCHECKED_CAST")
        val profiles = yaml["profiles"] as MutableMap<String, Any>
        profiles.putIfAbsent(index, mapOf<String, Any>())
        if (profiles[index] !is MutableMap<*, *>) {
            profiles[index] = (profiles[index] as Map<*, *>).toMutableMap()
        }
        @Suppress("UNCHECKED_CAST")
        val profile = profiles[index] as MutableMap<String, String>
        profile.clear()
        profile["user"] = value.user
        value.token?.run {
            profile.put("token", this)
        }
        value.server?.run {
            profile.put("server", this)
        }
    }

    fun has(profile: String): Boolean {
        return yaml["profiles"]?.let {
            @Suppress("UNCHECKED_CAST")
            it as Map<String, Map<String, Any>>
        }?.containsKey(profile) ?: false
    }

    fun remove(profile: String): Profile? {
        return if (yaml.containsKey("profiles")) {
            if (yaml["profiles"] !is MutableMap<*, *>) {
                yaml["profiles"] = (yaml["profiles"] as Map<*, *>).toMutableMap()
            }
            val profiles = yaml["profiles"] as MutableMap<String, Any>
            profiles.remove(profile)?.let {
                @Suppress("UNCHECKED_CAST")
                it as Map<String, String>
            }?.let {
                Profile(it["user"] ?: error("No user defined for profile \"$profile\""), it["token"], it["server"])
            }
        } else {
            null
        }
    }

    companion object {
        fun read(file: File): Config {
            return Config(mapper.readValue(file, object : TypeReference<Map<String, Any>>() {}).toMutableMap())
        }

        fun write(file: File, config: Config) {
            mapper.writeValue(FileWriter(file), config.yaml)
        }
    }
}