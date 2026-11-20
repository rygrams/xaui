import { forwardRef } from 'react'
import type { View } from 'react-native'
import { NumberPadCell } from './number-pad-cell'
import type { NumberPadActionProps } from './number-pad.type'

/**
 * The free corner of the bottom row, as a pressable cell: what it does is the caller's —
 * a decimal separator, a fingerprint, a clear. It holds a `NumberPad.Label` or a
 * `NumberPad.Icon`, smaller than a digit.
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

NumberPadAction.displayName = 'XAUI.Tram.NumberPad.Action'
