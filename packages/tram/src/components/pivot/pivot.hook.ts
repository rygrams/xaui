import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Gesture } from 'react-native-gesture-handler'
import { useSharedValue } from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { pivot } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTramHaptic } from '../../theme/tram-haptics'
import { forwardSteps, loopIndex, releaseStep } from './pivot.loop'

type LoopOptions = {
  /** The sections' values, in the loop's order. */
  values: readonly string[]
  /** Where the current value sits among them. */
  currentIndex: number
  /** A swipe, a title or an arrow key settled on another section. */
  choose: (value: string) => void
  /** Each title's gap after it, in points. */
  gap: number
  /** 1, or -1 when the row runs right to left. */
  way: 1 | -1
  isStill: boolean
}

type Size = { width: number; height: number }

/**
 * The Pivot's loop: one position, in sections, that the titles and the sections all read —
 * what the root measures, the swipe that moves it, and the way it settles.
 *
 * The sections and the titles follow the finger, a whole screen for a section. A release
 * moves on a section — forward or back, round the loop — when it was flung, or dragged a
 * quarter of the screen, and the position settles on the `navigation` spring, felt as a
 * `selection`. A title pressed is reached going forward, the way the row slides; an arrow
 * key steps either way. A `value` set from outside is reached forward too.
 *
 * `anchor` is the whole position the loop is on or on its way to. It never wraps, so a
 * spring from the last section to the first goes on forward instead of running back
 * through all the others.
 */
export function usePivotLoop({
  values,
  currentIndex,
  choose,
  gap,
  way,
  isStill,
}: LoopOptions) {
  const animate = useTramMotion()
  const haptic = useTramHaptic()
  const count = values.length

  const position = useSharedValue(currentIndex)
  const anchor = useSharedValue(currentIndex)
  const from = useSharedValue(currentIndex)
  const viewport = useSharedValue(0)
  const advances = useSharedValue<number[]>([])

  const [rowHeight, setRowHeight] = useState(0)
  const [measured, setMeasured] = useState(0)
  const sizes = useRef(new Map<string, Size>())

  const measureHeader = useCallback(
    (value: string, width: number, height: number) => {
      const known = sizes.current.get(value)
      if (known && known.width === width && known.height === height) return
      sizes.current.set(value, { width, height })
      setMeasured(times => times + 1)
    },
    []
  )

  const key = values.join('\u0000')

  // Once every title is measured, the row knows each one's advance and its own height.
  useEffect(() => {
    const laid = values.map(value => sizes.current.get(value))
    if (laid.some(size => size === undefined)) return

    advances.value = (laid as Size[]).map(size => size.width + gap)
    setRowHeight(Math.max(...(laid as Size[]).map(size => size.height)))
    // `key` stands for `values`.
  }, [key, measured, gap, advances])

  const goTo = useCallback(
    (target: number) => {
      'worklet'
      anchor.value = target
      position.value = isStill ? target : animate(target, 'navigation')
    },
    [anchor, position, isStill, animate]
  )

  // A value set from outside — or a title pressed — is reached going forward. A swipe or
  // an arrow key has already set off toward its section, and is left to arrive.
  useEffect(() => {
    if (count === 0 || loopIndex(anchor.value, count) === currentIndex) return
    goTo(
      anchor.value +
        forwardSteps(loopIndex(anchor.value, count), currentIndex, count)
    )
  }, [currentIndex, count, anchor, goTo])

  const settle = useCallback(
    (target: number) => {
      haptic('selection')
      const value = values[loopIndex(target, count)]
      if (value !== undefined) choose(value)
    },
    [haptic, choose, values, count]
  )

  /** One section forward or back, from the keyboard. */
  const step = useCallback(
    (by: 1 | -1) => {
      if (count < 2) return
      const target = anchor.value + by
      goTo(target)
      settle(target)
    },
    [count, anchor, goTo, settle]
  )

  const gesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(count > 1)
        .activeOffsetX([-pivot.slop, pivot.slop])
        .failOffsetY([-pivot.slop, pivot.slop])
        .onStart(() => {
          'worklet'
          // Caught on the way, it is held from where it is — the spring is interrupted.
          from.value = position.value
        })
        .onUpdate(event => {
          'worklet'
          const screen = viewport.value
          if (screen === 0) return
          // A drag goes one section at most either way from where it was caught.
          const dragged = (-event.translationX * way) / screen
          position.value = from.value + Math.max(-1, Math.min(1, dragged))
        })
        .onEnd(event => {
          'worklet'
          const by = releaseStep(
            {
              distance: -event.translationX * way,
              velocity: -event.velocityX * way,
            },
            {
              distance: viewport.value * pivot.distance,
              velocity: pivot.velocity,
            }
          )
          // Read from the section it was caught nearest to.
          const target = Math.round(from.value) + by
          const isMoving = target !== anchor.value
          goTo(target)
          if (isMoving) scheduleOnRN(settle, target)
        })
        .onFinalize((_event, didEnd) => {
          'worklet'
          if (!didEnd) goTo(anchor.value)
        }),
    [count, way, goTo, settle, from, position, viewport, anchor]
  )

  return {
    gesture,
    position,
    advances,
    viewport,
    rowHeight,
    measureHeader,
    step,
  }
}
