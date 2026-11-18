import { useCallback, useEffect, useState } from 'react'
import type { NativeSyntheticEvent, TargetedEvent } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { duration } from '../../motion/motion-tokens'
import { useTramEase } from '../../motion/use-tram-ease'
import { nextStop } from '../../system/roving-stop'
import { useTramHaptic } from '../../theme/tram-haptics'
import type { ToggleButtonGroupContextValue } from './toggle-button-group.type'

/** What the web hands a key handler; React Native's types have no keyboard event. */
type KeyEvent = { key: string; preventDefault: () => void }

type FocusEvent = NativeSyntheticEvent<TargetedEvent>

/** A host node as the web has it. */
export type WebNode = { focus?: () => void; matches?: (selector: string) => boolean }

/** The arrow keys, as steps along a row and down a column. */
const ROW_STEPS: Record<string, 1 | -1> = { ArrowRight: 1, ArrowLeft: -1 }
const COLUMN_STEPS: Record<string, 1 | -1> = { ArrowDown: 1, ArrowUp: -1 }

/**
 * A toggle's way between its two states: 0 released, 1 chosen. One value for the fill,
 * the line, the label and the icon, so they arrive together.
 *
 * Chosen on the Metro curve in `duration.base`; released on the exit curve in
 * `duration.fast` — it leaves faster than it arrives. A second touch during the fade
 * sets off from where the value is. With motion reduced both give way to the short fade;
 * under an ancestor's `disable-all` the value is set.
 */
export function useSelectionFade(
  isSelected: boolean,
  isStill: boolean
): SharedValue<number> {
  const glide = useTramEase()
  const chosen = useSharedValue(isSelected ? 1 : 0)

  useEffect(() => {
    if (isStill) {
      chosen.value = isSelected ? 1 : 0
      return
    }

    chosen.value = isSelected
      ? glide(1, 'metro', duration.base)
      : glide(0, 'exit', duration.fast)
  }, [isSelected, isStill, glide, chosen])

  return chosen
}

/**
 * The arrow keys of a case of a group, on the web: they go to the next case and choose
 * it, past a disabled one, round at either end — along a row turned round with it under
 * RTL, since the arrows follow the screen. Nothing for a button alone.
 */
export function useCellKeys(
  cell: ToggleButtonGroupContextValue | null,
  value: string | undefined
) {
  const haptic = useTramHaptic()

  return useCallback(
    (event: KeyEvent) => {
      if (!cell || value === undefined) return
      const isColumn = cell.orientation === 'vertical'
      const step = (isColumn ? COLUMN_STEPS : ROW_STEPS)[event.key]
      if (step === undefined) return

      const along = !isColumn && cell.row.isReversed() ? (-step as 1 | -1) : step
      const next = nextStop(cell.row.stops(), value, along)
      if (next === undefined || next === value) return

      event.preventDefault()
      cell.row.focus(next)
      haptic('selection')
      cell.select(next)
    },
    [cell, value, haptic]
  )
}

/**
 * Whether the keyboard's focus is on the box, on the web. The platform's own ring is
 * dropped there — it is rounded — and this one is drawn instead, a square line of ink
 * inside the box; a press that focuses the box draws nothing.
 */
export function useFocusRing(
  onFocus: ((event: FocusEvent) => void) | null | undefined,
  onBlur: ((event: FocusEvent) => void) | null | undefined
) {
  const [isVisible, setVisible] = useState(false)

  const handleFocus = useCallback(
    (event: FocusEvent) => {
      const target = event.target as unknown as WebNode
      setVisible(target?.matches?.(':focus-visible') ?? false)
      onFocus?.(event)
    },
    [onFocus]
  )

  const handleBlur = useCallback(
    (event: FocusEvent) => {
      setVisible(false)
      onBlur?.(event)
    },
    [onBlur]
  )

  return { isVisible, onFocus: handleFocus, onBlur: handleBlur }
}
