import { useCallback, useEffect, useRef, useState } from 'react'
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { duration, panel } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import type { TabRule } from './tabs.type'

/**
 * A title's way between its two colours: 0 at rest, 1 chosen, on the Metro curve. It is
 * the whole of what says a tab changed — no size, no weight. With motion reduced the
 * curve gives way to the short fade; under an ancestor's `disable-all` it is set.
 */
export function useChosen(
  isSelected: boolean,
  isStill: boolean
): SharedValue<number> {
  const glide = useTramEase()
  const chosen = useSharedValue(isSelected ? 1 : 0)

  useEffect(() => {
    const to = isSelected ? 1 : 0

    chosen.value = isStill ? to : glide(to)
  }, [isSelected, isStill, glide, chosen])

  return chosen
}

/**
 * Which panel is on screen. The one of the tab just left fades out first — `leaving`, on
 * the exit curve — and only then does `shown` become the new value, so two panels are
 * never laid out one under the other. A second choice during the fade is the one shown.
 *
 * With motion reduced, or under an ancestor's `disable-all`, nothing waits: `shown` is
 * `value`, and the panel coming in does the fading.
 */
export function usePanelSwap(value: string | undefined, isStill: boolean) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const isSet = isStill || isReduced
  const [settled, setSettled] = useState(value)
  const leaving = useSharedValue(1)

  const latest = useRef(value)
  latest.current = value

  const settle = useCallback(() => setSettled(latest.current), [])
  // Nothing was on screen: there is nothing to wait for.
  const isWaiting = !isSet && settled !== undefined && settled !== value

  useEffect(() => {
    if (!isWaiting) setSettled(value)
    leaving.value = isWaiting ? glide(0, 'exit', duration.fast) : 1
  }, [isWaiting, value, glide, leaving])

  useAnimatedReaction(
    () => {
      'worklet'
      return leaving.value === 0
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && wasGone === false) scheduleOnRN(settle)
    },
    [leaving, settle]
  )

  return { shown: isWaiting ? settled : value, leaving }
}

type Arrival = {
  isShown: boolean
  /** The side it comes from, as a sign along the x axis; 0 for a panel that is just there. */
  side: number
  isStill: boolean
}

/**
 * A panel's way in: from the side of the tab just chosen, a few dozen points away, as it
 * fades in on the Metro curve. The panel that is there at the first render does not
 * arrive, it is there. With motion reduced it fades in where it stands.
 */
export function usePanelArrival({ isShown, side, isStill }: Arrival) {
  const glide = useTramEase()
  const isReduced = useReducedMotion()
  const arrived = useSharedValue(isShown ? 1 : 0)
  const from = useSharedValue(0)
  const wasShown = useRef(isShown)

  useEffect(() => {
    const isArriving = isShown && !wasShown.current
    wasShown.current = isShown

    if (!isArriving) {
      // Gone, or there since the first render: set either way.
      if (!isShown || isStill) arrived.value = isShown ? 1 : 0
      return
    }

    if (isStill) {
      arrived.value = 1
      return
    }

    from.value = isReduced ? 0 : side * panel.slide
    arrived.value = 0
    arrived.value = glide(1, 'metro', duration.swivel)
  }, [isShown, side, isStill, isReduced, glide, arrived, from])

  return { arrived, from }
}

/**
 * The rule's way from one tab to the next, when a `Tabs.Indicator` is written: where it
 * starts and how wide it is, together on the `navigation` spring — so a second choice on
 * the way sets off from where the rule is.
 *
 * It is set, not moved, the first time a tab is measured, when the same tab is measured
 * again — a rotation — with motion reduced, and under an ancestor's `disable-all`.
 */
export function useRuleTravel(
  rule: TabRule | undefined,
  tab: string | undefined,
  isStill: boolean
) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const start = useSharedValue(rule?.start ?? 0)
  const width = useSharedValue(rule?.width ?? 0)
  // Not animated: it tells the first placement from every one after it.
  const hasArrived = useSharedValue(rule !== undefined)
  const under = useRef(rule ? tab : undefined)

  useEffect(() => {
    if (rule === undefined) return

    const isMoving = hasArrived.value && under.current !== tab
    under.current = tab

    if (isMoving && !isStill && !isReduced) {
      start.value = animate(rule.start, 'navigation')
      width.value = animate(rule.width, 'navigation')
      return
    }

    start.value = rule.start
    width.value = rule.width
    hasArrived.value = true
  }, [rule, tab, isStill, isReduced, animate, start, width, hasArrived])

  return { start, width, hasArrived }
}

/** The rule's animated style: `towardEnd` is the sign of the row's end along the x axis. */
export function useRuleStyle(
  travel: ReturnType<typeof useRuleTravel>,
  towardEnd: number
) {
  const { start, width, hasArrived } = travel

  return useAnimatedStyle(() => {
    'worklet'
    return {
      // Moved by a transform, which does not mirror under RTL the way `start` does.
      transform: [{ translateX: start.value * towardEnd }],
      width: width.value,
      opacity: hasArrived.value ? 1 : 0,
    }
  }, [start, width, hasArrived, towardEnd])
}
