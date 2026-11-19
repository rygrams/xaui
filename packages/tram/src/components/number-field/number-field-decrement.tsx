import { forwardRef } from 'react'
import type { View } from 'react-native'
import { useNumberField } from './number-field.context'
import { StepCell } from './number-field-step'
import type { NumberFieldDecrementProps } from './number-field.type'

/**
 * One step down, at the leading end of the box: a square key with a single bar, and a
 * rule between it and the value. `start`, never `left`: a field read right to left puts
 * the minus where that reader's eye starts.
 *
 * It goes out when the value has nowhere left to go — asked of the result, not of `min`.
 */
export const NumberFieldDecrement = forwardRef<View, NumberFieldDecrementProps>(
  function NumberFieldDecrement(props, ref) {
    const { decrement, canDecrement } = useNumberField()

    return (
      <StepCell
        ref={ref}
        name="NumberField.Decrement"
        edge="start"
        hasUpright={false}
        onStep={decrement}
        isLive={canDecrement}
        {...props}
      />
    )
  }
)

NumberFieldDecrement.displayName = 'XAUI.Tram.NumberField.Decrement'
