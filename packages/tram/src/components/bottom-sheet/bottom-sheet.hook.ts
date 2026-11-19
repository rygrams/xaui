import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  useAnimatedReaction,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { scheduleOnRN } from 'react-native-worklets'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { sheetOffset } from './bottom-sheet.utils'
import type { SheetGeometry } from './bottom-sheet.utils'
import type { BottomSheetMotion, SheetState } from './bottom-sheet.type'

/** Further than any band is tall, for the frames before its first layout. */
const OFFSCREEN = 2000

type SheetMotionInput = {
  isOpen: boolean
  isStill: boolean
  resting: SheetState
  geometry: SheetGeometry
}

/**
 * The band's shared values, and what moves them as the sheet opens, closes, expands and
 * reduces.
 *
 * The way in rises from gone to its resting place on the Metro curve; the way out sinks
 * on the exit curve from wherever it is — a finger's release, or a way in interrupted
 * halfway. Between two open states — a press on the handle, a drag let go — it springs on
 * `navigation`, so a second gesture can take it over. `isMounted` outlives `isOpen` by
 * the way out, so the band is still there to sink.
 *
 * With motion reduced the band is set at its place and fades in and out instead; under
 * an ancestor's `disable-all` it is there or it is not.
 */
export function useSheetMotion({
  isOpen,
  isStill,
  resting,
  geometry,
}: SheetMotionInput): BottomSheetMotion {
  const glide = useTramEase()
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const [isMounted, setMounted] = useState(isOpen)
  const offset = useSharedValue(OFFSCREEN)
  const height = useSharedValue(0)
  const lowest = useSharedValue(0)
  const presence = useSharedValue(0)
  // Whether the band has reached an open place since it was mounted: what tells the way
  // in from a move between two open states.
  const hasArrived = useRef(false)
  const wantsOpen = useRef(isOpen)
  wantsOpen.current = isOpen

  // Mounted in the render that opens it, so the way in starts on its first frame.
  if (isOpen && !isMounted) setMounted(true)

  const unmount = useCallback(() => {
    hasArrived.current = false
    setMounted(false)
  }, [])

  // Gone is only the end of the way out once the sheet was asked to close.
  const leave = useCallback(() => {
    if (!wantsOpen.current) unmount()
  }, [unmount])

  const { height: measured, collapsedHeight } = geometry

  useEffect(() => {
    height.value = measured
    lowest.value = sheetOffset('collapsed', { height: measured, collapsedHeight })
  }, [measured, collapsedHeight, height, lowest])

  useEffect(() => {
    if (!isMounted) return

    // Not measured yet: nothing has been drawn, so closing has nothing to play.
    if (measured === 0) {
      if (!isOpen) unmount()
      return
    }

    const target = sheetOffset(resting, { height: measured, collapsedHeight })

    if (isStill) {
      offset.value = target
      presence.value = isOpen ? 1 : 0
      if (!isOpen) unmount()
      return
    }

    if (isReduced) {
      if (isOpen) {
        offset.value = target
        hasArrived.current = true
      }
      if (!isOpen && presence.value === 0) return unmount()
      presence.value = glide(isOpen ? 1 : 0)
      return
    }

    presence.value = 1

    if (!isOpen) {
      // Already gone — dragged all the way down: no way out left to play.
      if (offset.value >= measured) return unmount()
      offset.value = glide(measured, 'exit')
      return
    }

    if (!hasArrived.current) {
      // From gone, not from the pessimistic distance it waited at before its layout.
      offset.value = Math.min(offset.value, measured)
      offset.value = glide(target)
      hasArrived.current = true
      return
    }

    offset.value = animate(target, 'navigation')
  }, [
    isMounted,
    isOpen,
    isStill,
    isReduced,
    resting,
    measured,
    collapsedHeight,
    glide,
    animate,
    unmount,
    offset,
    presence,
  ])

  // Gone once the way out has ended — not when it starts, and not before the way in.
  useAnimatedReaction(
    () => {
      'worklet'
      return (
        presence.value === 0 || (height.value > 0 && offset.value >= height.value)
      )
    },
    (isGone, wasGone) => {
      'worklet'
      if (isGone && wasGone === false) scheduleOnRN(leave)
    },
    [presence, offset, height, leave]
  )

  const slid = useAnimatedStyle(() => {
    'worklet'
    return {
      opacity: presence.value,
      transform: [{ translateY: offset.value }],
    }
  }, [offset, presence])

  return useMemo(
    () => ({ isMounted, offset, height, lowest, presence, slid }),
    [isMounted, offset, height, lowest, presence, slid]
  )
}
