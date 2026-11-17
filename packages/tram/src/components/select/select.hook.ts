import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import { useTramEase } from '../../motion/use-tram-ease'
import { useTramMotion } from '../../motion/use-tram-motion'
import { NO_ROW } from '../../system/list-picker'
import type { SelectListSlot, SelectMotion } from './select.type'

/**
 * What the field shows once a value is chosen, without the caller repeating it: items
 * register their label, and `Select.Value` reads it. A ref rather than state — a
 * registration that re-rendered the list would do so once per row.
 */
export function useLabelRegistry() {
  const labels = useRef(new Map<string, string>())
  const [, repaint] = useState(0)

  const registerLabel = useCallback((value: string, label: string) => {
    if (labels.current.get(value) === label) return
    labels.current.set(value, label)
    // The field repaints once the label it was missing has arrived.
    repaint(count => count + 1)
  }, [])

  const labelFor = useCallback((value: string) => labels.current.get(value), [])

  return useMemo(() => ({ labelFor, registerLabel }), [labelFor, registerLabel])
}

/**
 * Where `Select.Content` hands its list to the box. The two are siblings in the caller's
 * JSX, and an unfolded list is drawn inside the box's line: the content publishes its
 * element here and the box renders it. A store of its own rather than the root's state,
 * so that publishing re-renders the box and not the content that published.
 */
export function createListSlot(): SelectListSlot {
  let list: ReactNode = null
  const listeners = new Set<() => void>()

  return {
    get: () => list,
    set(next) {
      list = next
      listeners.forEach(listener => listener())
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}

/** The part of the unfolding over which the field's row gives way to the list. */
const HANDOVER = 0.15

type Unfolding = { isOpen: boolean; isInline: boolean; isStill: boolean }

/**
 * The select's shared values, and what moves them. The box's height and the border ride
 * the `navigation` spring, so a close that interrupts an opening sets off from where the
 * box is. With motion reduced the height is set at once and the list fades; under an
 * ancestor's `disable-all` everything is set at once.
 */
export function useUnfolding({
  isOpen,
  isInline,
  isStill,
}: Unfolding): SelectMotion {
  const animate = useTramMotion()
  const glide = useTramEase()
  const isReduced = useReducedMotion()

  const inPlace = isOpen && isInline ? 1 : 0
  const unfold = useSharedValue(inPlace)
  const line = useSharedValue(isOpen ? 1 : 0)
  const fade = useSharedValue(inPlace)
  const current = useSharedValue(NO_ROW)

  useEffect(() => {
    const to = isOpen ? 1 : 0

    line.value = isStill ? to : animate(to, 'navigation')
    unfold.value = isStill || isReduced ? inPlace : animate(inPlace, 'navigation')
    // Only read with motion reduced, where it is the list's whole way in.
    fade.value = isReduced && !isStill ? glide(inPlace) : inPlace
  }, [isOpen, inPlace, isStill, isReduced, animate, glide, line, unfold, fade])

  const shown = useDerivedValue(() => {
    'worklet'
    if (isReduced) return fade.value

    return interpolate(unfold.value, [0, HANDOVER], [0, 1], Extrapolation.CLAMP)
  }, [isReduced, fade, unfold])

  return useMemo(
    () => ({ unfold, line, shown, current }),
    [unfold, line, shown, current]
  )
}
