import { useCallback } from 'react'
import type { StyleProp, TextStyle } from 'react-native'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTextField } from '../text-field'
import type { FieldBlurEvent, FieldFocusEvent } from '../text-field'
import { useOptionalFieldGroup } from './field-group.context'

type Handlers = {
  onFocus?: (event: FieldFocusEvent) => void
  onBlur?: (event: FieldBlurEvent) => void
}

/**
 * What a field does to stand in a `FieldGroup`: it wears the box's field style — no line,
 * the box's inner height — and hands its focus to the box, whose line moves instead. The
 * `FieldGroup.Field` and any field that may be grouped (the `PhoneNumberField`'s) share it.
 *
 * Outside a group it changes nothing: no style, and the handlers are the caller's, composed.
 */
export function useFieldInGroup({ onFocus, onBlur }: Handlers): {
  style: StyleProp<TextStyle>
  onFocus: (event: FieldFocusEvent) => void
  onBlur: (event: FieldBlurEvent) => void
} {
  const group = useOptionalFieldGroup()
  const { isStill } = useTextField()
  const animate = useTramMotion()

  const moveFocus = useCallback(
    (to: number) => {
      if (!group) return
      // Arrives and stops, as the field's own line does.
      group.focus.value = isStill ? to : animate(to, 'navigation')
    },
    [group, isStill, animate]
  )

  // Composed, never replaced: a caller's handler runs, and the line still moves.
  const handleFocus = useCallback(
    (event: FieldFocusEvent) => {
      moveFocus(1)
      onFocus?.(event)
    },
    [moveFocus, onFocus]
  )

  const handleBlur = useCallback(
    (event: FieldBlurEvent) => {
      moveFocus(0)
      onBlur?.(event)
    },
    [moveFocus, onBlur]
  )

  return { style: group?.fieldStyle, onFocus: handleFocus, onBlur: handleBlur }
}
