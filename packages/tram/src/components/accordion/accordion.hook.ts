import { useCallback, useMemo } from 'react'
import {
  Easing,
  FadeIn,
  FadeOut,
  LinearTransition,
  ReduceMotion,
  useReducedMotion,
} from 'react-native-reanimated'
import { useControllableState } from '@xaui/native'
import {
  isExpandedIn,
  nextExpansion,
  useAnimationDisabled,
} from '@xaui/native/system'
import { duration, ease } from '../../motion/motion-tokens'
import type {
  AccordionMotion,
  AccordionSelectionMode,
  AccordionValue,
} from './accordion.type'

type Options = {
  value: AccordionValue | undefined
  defaultValue: AccordionValue | undefined
  onValueChange: ((value: AccordionValue) => void) | undefined
  selectionMode: AccordionSelectionMode
  isCollapsible: boolean
}

/**
 * What is open, in whichever shape the mode calls for. The controlled half is
 * `useControllableState`'s; the rule is Native's `nextExpansion`.
 */
export function useExpansion({
  value,
  defaultValue,
  onValueChange,
  selectionMode,
  isCollapsible,
}: Options) {
  const [current, setCurrent] = useControllableState<AccordionValue>({
    value,
    defaultValue: defaultValue ?? (selectionMode === 'multiple' ? [] : ''),
    onChange: onValueChange,
  })

  const isExpanded = useCallback(
    (item: string) => isExpandedIn(current, item),
    [current]
  )

  const toggle = useCallback(
    (item: string) => {
      setCurrent(was => nextExpansion(was, item, selectionMode, isCollapsible))
    },
    [isCollapsible, selectionMode, setCurrent]
  )

  return useMemo(() => ({ isExpanded, toggle }), [isExpanded, toggle])
}

const [X1, Y1, X2, Y2] = ease.metro

/**
 * How a row opens: its height on the Metro curve, `base` long, and the panel fading in
 * over the same length; closing, the panel goes in `fast` and the height follows. No
 * measured height anywhere — the panel is mounted or not, and the layout transition
 * carries the row between the two, so a panel that grows afterwards grows with it.
 *
 * With motion reduced the height does not move at all and the panel takes the short
 * fade every Tram motion collapses to; under `disable-all` nothing moves.
 */
export function useAccordionMotion(): AccordionMotion {
  const isReduced = useReducedMotion()
  const isStill = useAnimationDisabled()

  return useMemo(() => {
    if (isStill)
      return { layout: undefined, entering: undefined, exiting: undefined }

    if (isReduced) {
      return {
        layout: undefined,
        entering: FadeIn.duration(duration.reduced).reduceMotion(ReduceMotion.Never),
        exiting: undefined,
      }
    }

    const metro = Easing.bezier(X1, Y1, X2, Y2)

    return {
      layout: LinearTransition.duration(duration.base).easing(metro),
      entering: FadeIn.duration(duration.base).easing(metro),
      exiting: FadeOut.duration(duration.fast),
    }
  }, [isReduced, isStill])
}
