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
import type { BottomSheetMotion } from './bottom-sheet.type'

/** Further than any band is tall, for the frames before its first layout. */
const OFFSCREEN = 2000

type SheetMotionInput = {
  isOpen: boolean
  isStill: boolean
  /** The band's measured height, in points; 0 before its first layout. */
  measured: number
}

/**
 * The band's shared values, and what moves them as the sheet opens and closes.
 *
 * The way in rises from gone to the top of its own height on the Metro curve; the way
 * out sinks on the exit curve from wherever it is — a finger's release, or a way in
 * interrupted halfway. A drag let go short of closing springs back on `navigation`, from
 * the content. `isMounted` outlives `isOpen` by the way out, so the band is still there
 * to sink.
 *
 * With motion reduced the band is set at its place and fades in and out instead; under
 * an ancestor's `disable-all` it is there or it is not.
 */
export function useSheetMotion({
  isOpen,
  isStill,
  measured,
}: SheetMotionInput): BottomSheetMotion {
  const glide = useTramEase()
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const [isMounted, setMounted] = useState(isOpen)
  const offset = useSharedValue(OFFSCREEN)
  const height = useSharedValue(0)
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

  useEffect(() => {
    height.value = measured
  }, [measured, height])

  useEffect(() => {
    if (!isMounted) return

    // Not measured yet: nothing has been drawn, so closing has nothing to play.
    if (measured === 0) {
      if (!isOpen) unmount()
      return
    }

    if (isStill) {
      offset.value = isOpen ? 0 : measured
      presence.value = isOpen ? 1 : 0
      if (!isOpen) unmount()
      return
    }

    if (isReduced) {
      if (isOpen) {
        offset.value = 0
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
      offset.value = glide(0)
      hasArrived.current = true
      return
    }

    // Measured again while up — its content changed: it settles at its new height.
    offset.value = animate(0, 'navigation')
  }, [
    isMounted,
    isOpen,
    isStill,
    isReduced,
    measured,
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
    () => ({ isMounted, offset, height, presence, slid }),
    [isMounted, offset, height, presence, slid]
  )
}
