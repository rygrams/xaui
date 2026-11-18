import { useCallback, useEffect, useRef } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import {
  cancelAnimation,
  useAnimatedReaction,
  useReducedMotion,
  useSharedValue,
  withDecay,
  withDelay,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { cascade, duration, wheel } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import {
  landingOffset,
  offsetOf,
  restOffset,
  squareAt,
  withinWheel,
} from '../../system/wheel'
import type { WheelShape } from '../../system/wheel'
import { useTramHaptic } from '../../theme/tram-haptics'
import { useWheelPicker } from './wheel-picker.context'
import { DRAG_SLOP } from './wheel-picker.recipe'

/** No column: what `stirredBy` holds while the wheel rests. */
const NOBODY = ''

/**
 * The wheel's sleep, kept by the root: which column woke it, and the delay after which a
 * wheel nobody touches goes back to rest.
 *
 * A column is busy from the touch until it has stopped on a square. The delay only runs
 * once none is — a wheel thrown hard is still turning long after the finger left, and
 * its neighbours must not fade under it.
 */
export function useWheelRest() {
  const stirredBy = useSharedValue(NOBODY)
  const busy = useRef(new Set<string>())
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const setBusy = useCallback(
    (column: string, isBusy: boolean) => {
      clearTimeout(timer.current)

      if (isBusy) {
        busy.current.add(column)
        // The touch already woke the wheel on the UI thread — unless the delay ran out
        // in the same instant and put it back to rest from here.
        if (stirredBy.value === NOBODY) stirredBy.value = column
        return
      }

      busy.current.delete(column)
      if (busy.current.size > 0) return

      timer.current = setTimeout(() => {
        stirredBy.value = NOBODY
      }, wheel.rest)
    },
    [stirredBy]
  )

  useEffect(() => () => clearTimeout(timer.current), [])

  return { stirredBy, setBusy }
}

/**
 * How much of a column's neighbours is shown: 0 at rest, 1 once the wheel is touched.
 * They arrive on the Metro curve, fast, the touched column's first and the others a
 * stagger behind; they leave together on the exit curve. Both start from where the fade
 * is, so a touch in the middle of a fade-out turns it round.
 */
export function useWheelWake(column: string): SharedValue<number> {
  const { isAwake, isStill, stirredBy } = useWheelPicker()
  const glide = useTramEase()
  const awake = useSharedValue(isAwake ? 1 : 0)

  useAnimatedReaction(
    () => isAwake || stirredBy.value !== NOBODY,
    (isUp, wasUp) => {
      'worklet'
      if (isUp === wasUp) return

      const to = isUp ? 1 : 0
      // The first run only puts right a fade this reaction was rebuilt in the middle of.
      if (wasUp === null && awake.value === to) return

      if (isStill) {
        awake.value = to
      } else if (!isUp) {
        awake.value = glide(0, 'exit', duration.base)
      } else {
        const arrival = glide(1, 'metro', duration.fast)
        const isFirst = isAwake || stirredBy.value === column

        awake.value = isFirst ? arrival : withDelay(cascade.stagger, arrival)
      }
    },
    [isAwake, isStill, glide, column, stirredBy, awake]
  )

  return awake
}

/** What a column is doing. */
const RESTING = 0
/** Under a finger: it goes where the finger goes. */
const HELD = 1
/** Let go with momentum, slowing down. */
const COASTING = 2
/** On its way to a whole square. */
const SETTLING = 3

/** No speed under the catch was measured on the frame before. */
const NOT_SLOW = Infinity

type Turn = {
  column: string
  shape: WheelShape
  /** The square the state says the column is on. */
  selectedIndex: number
  /** How many times the column came to rest on a choice: a refused one is rejoined. */
  settles: number
  isEnabled: boolean
  /** The column came to rest on a square the user chose. */
  onChoice: (index: number) => void
}

/**
 * A column's turn: the shared offset its squares are placed by, and the gesture that
 * moves it.
 *
 * - **Drag** — the column follows the finger point for point.
 * - **Let go** — it keeps its momentum on `withDecay`, and once it has slowed the
 *   `navigation` spring takes it over, at the speed it had, and stops it on a whole
 *   square. With motion reduced there is no momentum: it goes to the nearest square.
 * - **Touch while it turns** — it stops where it is and the gesture goes on from there.
 * - **Touch a neighbour** — the column brings it to the middle.
 * - **The value changes from outside** — the column goes there on the same spring.
 *
 * Each square that becomes the current one under a touch or a throw is felt once, as a
 * `selection`. React hears of the turn once, when it has come to rest.
 */
export function useWheelTurn({
  column,
  shape,
  selectedIndex,
  settles,
  isEnabled,
  onChoice,
}: Turn) {
  const { geometry, isAwake, isStill, stirredBy, setBusy } = useWheelPicker()
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const haptic = useTramHaptic()
  const { step, height } = geometry

  const offset = useSharedValue(selectedIndex * step)
  /** The whole square the column is going to, or is on. */
  const aim = useSharedValue(selectedIndex * step)
  const phase = useSharedValue(RESTING)
  /** Whether the turn in progress is the user's, and not the state being rejoined. */
  const isChosen = useSharedValue(false)
  const grabbedAt = useSharedValue(0)
  const seenAt = useSharedValue(0)
  /** The speed measured on the frame before, when it was under the catch — or not. */
  const slowAt = useSharedValue(NOT_SLOW)
  /** What the touch came down on: a column still turning, a wheel still at rest. */
  const wasTurning = useSharedValue(false)
  const wasAsleep = useSharedValue(false)

  // Read through a ref, so that a caller's inline `onValueChange` does not rebuild the
  // reaction below in the middle of a turn.
  const latest = useRef({ onChoice, setBusy, haptic })
  latest.current = { onChoice, setBusy, haptic }

  const hold = useCallback(() => latest.current.setBusy(column, true), [column])
  const tick = useCallback(() => latest.current.haptic('selection'), [])
  const land = useCallback(
    (index: number, isChoice: boolean) => {
      latest.current.setBusy(column, false)
      if (isChoice) latest.current.onChoice(index)
    },
    [column]
  )

  // A column taken away while it turns must not keep the wheel awake for ever.
  useEffect(() => () => latest.current.setBusy(column, false), [column])

  /** Sends the column to a whole square, and says so once it is there. */
  const sendTo = (target: number) => {
    'worklet'
    aim.value = target

    if (isStill || offset.value === target) {
      offset.value = target
      phase.value = RESTING
      scheduleOnRN(land, squareAt(target, shape), isChosen.value)
      return
    }

    phase.value = SETTLING
    offset.value = animate(target, 'navigation')
  }

  /** Lets the column go at `velocity`, in points a second. */
  const release = (velocity: number) => {
    'worklet'
    if (isStill || isReduced || velocity === 0) {
      sendTo(restOffset(offset.value, shape))
      return
    }

    phase.value = COASTING
    seenAt.value = 0
    slowAt.value = NOT_SLOW
    offset.value = withDecay(
      {
        velocity,
        deceleration: wheel.deceleration,
        // A wheel with ends stops dead on its last square rather than past it.
        clamp: shape.isLooping ? undefined : [0, withinWheel(Infinity, shape)],
      },
      isFinished => {
        'worklet'
        if (isFinished && phase.value === COASTING)
          sendTo(restOffset(offset.value, shape))
      }
    )
  }

  useAnimatedReaction(
    () => offset.value,
    (at, was) => {
      'worklet'
      if (
        was !== null &&
        isChosen.value &&
        squareAt(at, shape) !== squareAt(was, shape)
      )
        scheduleOnRN(tick)

      if (phase.value === SETTLING && at === aim.value) {
        phase.value = RESTING
        scheduleOnRN(land, squareAt(at, shape), isChosen.value)
        return
      }

      if (phase.value !== COASTING || was === null) return

      // The spring that takes over inherits the speed the decay had: only when to hand
      // over is measured here, and where to.
      const now = globalThis.performance.now()
      const elapsed = now - seenAt.value
      const isFirstFrame = seenAt.value === 0
      seenAt.value = now
      if (isFirstFrame || elapsed <= 0) return

      const velocity = ((at - was) / elapsed) * 1000
      const before = slowAt.value
      const isSlow = Math.abs(velocity) < wheel.catchBelow
      slowAt.value = isSlow ? velocity : NOT_SLOW
      // Two slow frames in a row: one alone may be a frame in which nothing was drawn,
      // and a wheel caught on that would be stopped behind where it is still going.
      if (!isSlow || before === NOT_SLOW) return

      const faster = Math.abs(before) > Math.abs(velocity) ? before : velocity
      sendTo(landingOffset(at, faster, shape))
    },
    [shape, isStill, animate, land, tick]
  )

  // The column follows the state — a caller's reset, a choice it refused, a screen
  // reader's step. Not under a finger: what is held is the finger's until it lifts.
  useEffect(() => {
    if (phase.value === HELD) return

    const target = offsetOf(selectedIndex, offset.value, shape)
    if (target === aim.value && phase.value !== COASTING) return

    isChosen.value = false
    aim.value = target

    if (isStill || offset.value === target) {
      offset.value = target
      phase.value = RESTING
    } else {
      phase.value = SETTLING
      offset.value = animate(target, 'navigation')
    }
  }, [selectedIndex, settles, shape, isStill, animate, offset, aim, phase, isChosen])

  const pan = Gesture.Pan()
    .enabled(isEnabled)
    // Along the column only: a touch that moves across it stays the page's.
    .activeOffsetY([-DRAG_SLOP, DRAG_SLOP])
    .onBegin(() => {
      'worklet'
      wasTurning.value = phase.value !== RESTING
      wasAsleep.value = !isAwake && stirredBy.value === NOBODY
      // Where it is, not where it was going: a wheel caught mid-throw stops there.
      cancelAnimation(offset)
      phase.value = HELD
      isChosen.value = true
      if (stirredBy.value === NOBODY) stirredBy.value = column
      scheduleOnRN(hold)
    })
    .onStart(event => {
      'worklet'
      // Less what the finger moved before the drag was told from a tap: no jump.
      grabbedAt.value = offset.value + event.translationY
    })
    .onUpdate(event => {
      'worklet'
      offset.value = withinWheel(grabbedAt.value - event.translationY, shape)
    })
    .onEnd((event, didSucceed) => {
      'worklet'
      if (didSucceed) release(-event.velocityY)
    })
    .onFinalize(() => {
      'worklet'
      // A touch that was no drag, or a drag taken away: the column still has to stop
      // on a square.
      if (phase.value === HELD) sendTo(restOffset(offset.value, shape))
    })

  const tap = Gesture.Tap()
    .enabled(isEnabled)
    .maxDistance(DRAG_SLOP)
    .onEnd((event, didSucceed) => {
      'worklet'
      // The touch that stopped a turning wheel, or woke a resting one, chose nothing:
      // the squares it could have meant were moving, or were not there to see.
      if (!didSucceed || wasTurning.value || wasAsleep.value) return

      const away = Math.round((event.y - height / 2) / step)
      if (away === 0) return

      isChosen.value = true
      scheduleOnRN(hold)
      sendTo(restOffset(aim.value + away * step, shape))
    })

  return { offset, gesture: Gesture.Exclusive(pan, tap) }
}
