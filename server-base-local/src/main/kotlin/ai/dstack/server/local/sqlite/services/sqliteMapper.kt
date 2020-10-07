package ai.dstack.server.local.sqlite.services

import com.fasterxml.jackson.annotation.JsonInclude
import com.fasterxml.jackson.databind.DeserializationFeature
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule
import com.fasterxml.jackson.module.kotlin.KotlinModule

val sqliteMapper: ObjectMapper = ObjectMapper()
    .setSerializationInclusion(JsonInclude.Include.NON_ABSENT)
    .registerModule(JavaTimeModule())
    .registerModule(KotlinModule())
    .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)