import { useCallback, useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import type { View } from 'react-native'
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { duration } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTramPages } from '../../theme/tram-pages'
import type {
  TramPageDirection,
  TramPageLeave,
  TramPageStage,
} from '../../theme/tram-pages'

/** Where a page waits before it arrives, and where it has gone once it left forward. */
const ARRIVING = -1
const LEFT_FORWARD = 1
const IN_PLACE = 0

/**
 * A page's turn, from -1 to 1 (`pagePose`), and what moves it:
 *
 * - it arrives when the page mounts, on the `navigation` spring;
 * - `leave(go)` — registered with the provider, so `usePageLeave` reaches it from
 *   anywhere — plays the way out on the exit curve and navigates once it has ended;
 * - it comes back, from the side it left by, when the navigator says the page is focused
 *   again.
 *
 * `isStill` is a page with no transition: it is there, and `leave` navigates at once.
 */
export function usePageTurn(isStill: boolean): SharedValue<number> {
  const pages = useTramPages()
  const { focused, hasFocus } = pages
  // The app's own hook, handed over once and called on every render like any other.
  const isFocused = pages.useIsFocused()
  const arrive = useTramMotion()
  const depart = useTramEase()

  const turn = useSharedValue(isStill ? IN_PLACE : ARRIVING)
  // Where the page was last sent, which the JS side knows without reading the value.
  const sent = useRef(isStill ? IN_PLACE : ARRIVING)
  const pending = useRef<(() => void) | null>(null)
  const wasCovered = useRef(false)
  const isFocusedNow = useRef(isFocused)
  const recall = useRef<ReturnType<typeof setTimeout> | null>(null)

  const comeBack = useCallback(() => {
    turn.value = arrive(IN_PLACE, 'navigation')
    sent.current = IN_PLACE
  }, [arrive, turn])

  useEffect(() => {
    isFocusedNow.current = isFocused

    if (!isFocused) {
      wasCovered.current = true
      return
    }

    if (isStill) {
      turn.value = IN_PLACE
      sent.current = IN_PLACE
      return
    }

    // Covered without having left — the system's back, a header button: it returns as
    // if it had, from where a page that left forward waits.
    if (wasCovered.current && sent.current === IN_PLACE) turn.value = LEFT_FORWARD
    wasCovered.current = false
    comeBack()
  }, [isFocused, isStill, comeBack, turn])

  const navigate = useCallback(() => {
    const go = pending.current
    if (!go) return

    pending.current = null
    go()
    // `go` may not have navigated — a guard, a route that is not there. A page still
    // focused after the time a navigation takes is brought back rather than left
    // turned away with nothing over it.
    recall.current = setTimeout(() => {
      if (isFocusedNow.current && sent.current !== IN_PLACE) comeBack()
    }, duration.slow)
  }, [comeBack])

  useEffect(
    () => () => {
      if (recall.current) clearTimeout(recall.current)
    },
    []
  )

  // The navigation waits for the way out to end: it is told by the value, not by a timer
  // that would have to agree with the curve.
  useAnimatedReaction(
    () => {
      'worklet'
      return Math.abs(turn.value) >= 1
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && wasGone === false) scheduleOnRN(navigate)
    },
    [turn, navigate]
  )

  const leave = useCallback<TramPageLeave>(
    (go, direction: TramPageDirection = 'forward') => {
      // A second touch while the page is already on its way out navigates nowhere new.
      if (pending.current) return

      // Without the navigator's focus the page would never know it is back: it stays.
      if (isStill || !hasFocus) {
        go()
        return
      }

      const side = direction === 'forward' ? LEFT_FORWARD : ARRIVING
      pending.current = go
      sent.current = side
      turn.value = depart(side, 'exit', duration.turnstile)
    },
    [isStill, hasFocus, depart, turn]
  )

  // The focused page is the one `usePageLeave` plays; it steps down when it is covered.
  useEffect(() => {
    if (!isFocused) return

    focused.current = leave

    return () => {
      if (focused.current === leave) focused.current = null
    }
  }, [isFocused, leave, focused])

  return turn
}

/**
 * The way out of the page on screen, from anywhere under `TramProvider`:
 *
 * ```tsx
 * const leave = usePageLeave()
 * const router = useRouter()
 *
 * <Button onPress={() => leave(() => router.push('/mail'))}>courrier</Button>
 * <Button onPress={() => leave(() => router.back(), 'backward')}>retour</Button>
 * ```
 *
 * The page turns away, then `go` runs. With no `Page` on screen, or no focus hook on the
 * provider, `go` runs at once.
 */
export function usePageLeave(): TramPageLeave {
  const { focused } = useTramPages()

  return useCallback(
    (go, direction) => {
      const leave = focused.current
      if (leave) leave(go, direction)
      else go()
    },
    [focused]
  )
}

/**
 * How far the page has stepped back, 0 to 1 — written by a context menu, never here — and
 * the stage it is written through. While the page is focused its stage is the provider's,
 * so a `Menu` opened anywhere on it finds the page to make recede and where its centre is.
 */
export function usePageStage(node: RefObject<View | null>): SharedValue<number> {
  const { stage, useIsFocused } = useTramPages()
  // The app's own hook, as in `usePageTurn`: called on every render like any other.
  const isFocused = useIsFocused()
  const depth = useSharedValue(0)

  useEffect(() => {
    if (!isFocused) return

    const own: TramPageStage = {
      depth,
      measure: done =>
        node.current?.measureInWindow((x, y, width, height) =>
          done({ x, y, width, height })
        ),
    }
    stage.current = own

    return () => {
      if (stage.current === own) stage.current = null
    }
  }, [isFocused, depth, node, stage])

  return depth
}
