package ai.dstack.server.jersey

import org.mockito.ArgumentMatchers
import org.mockito.Mockito
import org.mockito.Mockito.never
import org.mockito.Mockito.verify
import org.mockito.stubbing.OngoingStubbing

fun <T> whenever(methodCall: T): OngoingStubbing<T> = Mockito.`when`(methodCall)

/**
 * see http://stackoverflow.com/questions/30305217/is-it-possible-to-use-mockito-in-kotlin
 */
fun <T> anyObject(): T = Mockito.any<T>()

fun <T> argumentThat(matcher: (T) -> Boolean): T = ArgumentMatchers.argThat<T>(matcher)

fun <T> equalTo(value: T): T = ArgumentMatchers.eq(value)

class MockitoVerification<out Mock>(private val mock: Mock) {
    fun executed(times: Int, invocation: Mock.() -> Unit) = verify(mock, Mockito.times(times)).invocation()
    fun executedOnce(invocation: Mock.() -> Unit) = executed(1, invocation)
    fun executedTwice(invocation: Mock.() -> Unit) = executed(2, invocation)
    fun neverExecuted(invocation: Mock.() -> Unit) = verify(mock, never()).invocation()
}

fun <Mock> verifyThat(mock: Mock) = MockitoVerification(mock)

inline fun <reified T> mock(): T = Mockito.mock(T::class.java)