import { forwardRef } from 'react'
import type { View } from 'react-native'
import { NumberPadCell } from './number-pad-cell'
import type { NumberPadActionProps } from './number-pad.type'

/**
 * The free corner of the bottom row, opposite the backspace.
 *
 * It does nothing on its own — the press is the caller's, because what belongs there is
 * theirs: a fingerprint that unlocks, a `Clear`, the pad's own decimal separator. Bare like
 * the backspace, so the two corners read as a pair around the `0`.
 *
 * ```tsx
 * <NumberPad>
 *   <NumberPad.Action onPress={unlock} accessibilityLabel="Unlock with Face ID">
 *     <NumberPad.Icon as={FaceIdIcon} color={theme.colors.accent} />
 *   </NumberPad.Action>
 * </NumberPad>
 * ```
 *
 * A key that inserts goes there as a `NumberPad.Key` instead; this one is for everything
 * that is not a character.
 */
export const NumberPadAction = forwardRef<View, NumberPadActionProps>(
  function NumberPadAction({ children, ...props }, ref) {
    return (
      <NumberPadCell ref={ref} tone="ghost" {...props}>
        {children}
      </NumberPadCell>
    )
  }
)

NumberPadAction.displayName = 'XAUI.NumberPad.Action'
