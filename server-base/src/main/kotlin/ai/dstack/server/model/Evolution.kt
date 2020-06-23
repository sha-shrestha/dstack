package ai.dstack.server.model

// TODO: Add defaults for enum, string, number and other fields
@Target(AnnotationTarget.PROPERTY)
annotation class Evolution(
        val convertToCollection: Boolean = false,
        val convertFromCollection: Boolean = false,
        val alias: String = "",
        val default: Boolean = false,
        val booleanDefault: Boolean = false
)