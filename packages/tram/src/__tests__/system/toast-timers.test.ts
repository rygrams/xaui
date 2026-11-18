import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { createToastTimers } from '../../system/toast-timers'

describe('createToastTimers', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  function setUp() {
    const onExpire = vi.fn()

    return { onExpire, timers: createToastTimers(onExpire) }
  }

  it('expires a toast once, when its time is up', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 4000)

    vi.advanceTimersByTime(3999)
    expect(onExpire).not.toHaveBeenCalled()

    vi.advanceTimersByTime(1)
    expect(onExpire).toHaveBeenCalledTimes(1)
    expect(onExpire).toHaveBeenCalledWith('a')
  })

  it('starts no countdown for a duration of 0', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 0)

    vi.advanceTimersByTime(60_000)
    expect(onExpire).not.toHaveBeenCalled()
  })

  it('runs each countdown on its own', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    timers.start('b', 3000)

    vi.advanceTimersByTime(1000)
    expect(onExpire.mock.calls).toEqual([['a']])

    vi.advanceTimersByTime(2000)
    expect(onExpire.mock.calls).toEqual([['a'], ['b']])
  })

  it('stops a held countdown and picks it up with what it had left', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 4000)
    vi.advanceTimersByTime(3000)

    timers.hold('a')
    vi.advanceTimersByTime(10_000)
    expect(onExpire).not.toHaveBeenCalled()

    timers.release('a')
    vi.advanceTimersByTime(999)
    expect(onExpire).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(onExpire).toHaveBeenCalledWith('a')
  })

  it('holds one countdown and lets the others run', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    timers.start('b', 1000)
    timers.hold('a')

    vi.advanceTimersByTime(1000)
    expect(onExpire.mock.calls).toEqual([['b']])
  })

  it('freezes every countdown, those started while frozen included', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    timers.freeze()
    timers.start('b', 1000)

    vi.advanceTimersByTime(10_000)
    expect(onExpire).not.toHaveBeenCalled()

    timers.thaw()
    vi.advanceTimersByTime(1000)
    expect(onExpire).toHaveBeenCalledTimes(2)
  })

  it('keeps a countdown stopped while either reason stands', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    timers.hold('a')
    timers.freeze()

    timers.release('a')
    vi.advanceTimersByTime(5000)
    expect(onExpire).not.toHaveBeenCalled()

    timers.hold('a')
    timers.thaw()
    vi.advanceTimersByTime(5000)
    expect(onExpire).not.toHaveBeenCalled()

    timers.release('a')
    vi.advanceTimersByTime(1000)
    expect(onExpire).toHaveBeenCalledTimes(1)
  })

  it('never expires a countdown that was stopped', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    timers.start('b', 1000)
    timers.stop('a')

    vi.advanceTimersByTime(1000)
    expect(onExpire.mock.calls).toEqual([['b']])
  })

  it('forgets everything on stopAll, held ones included', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    timers.start('b', 1000)
    timers.hold('b')
    timers.stopAll()
    timers.release('b')

    vi.advanceTimersByTime(5000)
    expect(onExpire).not.toHaveBeenCalled()
  })

  it('ignores a hold, a release or a stop for an id it does not know', () => {
    const { onExpire, timers } = setUp()

    expect(() => {
      timers.hold('z')
      timers.release('z')
      timers.stop('z')
    }).not.toThrow()
    expect(onExpire).not.toHaveBeenCalled()
  })

  it('restarts a countdown started twice rather than running two', () => {
    const { onExpire, timers } = setUp()
    timers.start('a', 1000)
    vi.advanceTimersByTime(500)
    timers.start('a', 1000)

    vi.advanceTimersByTime(999)
    expect(onExpire).not.toHaveBeenCalled()
    vi.advanceTimersByTime(1)
    expect(onExpire).toHaveBeenCalledTimes(1)
  })
})
