package ai.dstack.core.backend.jackson

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper


fun ObjectMapper.createEmptyJsonObject(): JsonNode = this.readTree("{}")