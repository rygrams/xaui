/** The clock the timers run on — the platform's, or a test's. */
export type TimerClock = {
  now: () => number
  set: (run: () => void, ms: number) => unknown
  clear: (handle: unknown) => void
}

const PLATFORM_CLOCK: TimerClock = {
  now: () => Date.now(),
  set: (run, ms) => setTimeout(run, ms),
  clear: handle => clearTimeout(handle as ReturnType<typeof setTimeout>),
}

type Countdown = {
  /** Milliseconds left when it last stopped running. */
  remaining: number
  isHeld: boolean
  /** Set while it runs. */
  running?: { since: number; handle: unknown }
}

export type ToastTimers = {
  /** Gives `id` `ms` milliseconds to live. `0` or less is no timer at all. */
  start: (id: string, ms: number) => void
  /** Stops one countdown where it is — a finger is on that toast. */
  hold: (id: string) => void
  /** Lets it run again, with what it had left. */
  release: (id: string) => void
  /** Stops every countdown, those started later included — a screen reader is on. */
  freeze: () => void
  thaw: () => void
  /** Forgets one countdown: its toast was dismissed. */
  stop: (id: string) => void
  stopAll: () => void
}

/**
 * The countdowns of a pile of toasts. Each one runs unless it is held — its toast is under
 * a finger — or everything is frozen, and picks up with the time it had left: a toast
 * touched one second before it leaves still leaves one second after it is let go.
 *
 * `onExpire` is called once per countdown that reaches its end, and never for one that
 * was stopped.
 */
export function createToastTimers(
  onExpire: (id: string) => void,
  clock: TimerClock = PLATFORM_CLOCK
): ToastTimers {
  const countdowns = new Map<string, Countdown>()
  let isFrozen = false

  const pause = (countdown: Countdown) => {
    if (!countdown.running) return
    clock.clear(countdown.running.handle)
    countdown.remaining -= clock.now() - countdown.running.since
    countdown.running = undefined
  }

  const run = (id: string, countdown: Countdown) => {
    if (countdown.running || countdown.isHeld || isFrozen) return

    const expire = () => {
      countdowns.delete(id)
      onExpire(id)
    }
    countdown.running = {
      since: clock.now(),
      handle: clock.set(expire, Math.max(0, countdown.remaining)),
    }
  }

  const stop = (id: string) => {
    const countdown = countdowns.get(id)
    if (!countdown) return
    pause(countdown)
    countdowns.delete(id)
  }

  return {
    start(id, ms) {
      stop(id)
      if (ms <= 0) return
      const countdown: Countdown = { remaining: ms, isHeld: false }
      countdowns.set(id, countdown)
      run(id, countdown)
    },
    hold(id) {
      const countdown = countdowns.get(id)
      if (!countdown) return
      countdown.isHeld = true
      pause(countdown)
    },
    release(id) {
      const countdown = countdowns.get(id)
      if (!countdown) return
      countdown.isHeld = false
      run(id, countdown)
    },
    freeze() {
      isFrozen = true
      countdowns.forEach(pause)
    },
    thaw() {
      isFrozen = false
      countdowns.forEach((countdown, id) => run(id, countdown))
    },
    stop,
    stopAll() {
      countdowns.forEach(pause)
      countdowns.clear()
    },
  }
}
