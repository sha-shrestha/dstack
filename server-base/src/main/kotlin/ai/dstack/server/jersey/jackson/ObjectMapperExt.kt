package ai.dstack.server.jersey.jackson

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper


fun ObjectMapper.createEmptyJsonObject(): JsonNode = this.readTree("{}")