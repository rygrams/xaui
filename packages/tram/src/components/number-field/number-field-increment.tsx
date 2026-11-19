import { forwardRef } from 'react'
import type { View } from 'react-native'
import { useNumberField } from './number-field.context'
import { StepCell } from './number-field-step'
import type { NumberFieldIncrementProps } from './number-field.type'

/**
 * One step up, at the trailing end of the box: the decrement's mirror, with a second bar
 * across the first. The value sits between the two, which is what makes them read as one
 * control.
 *
 * It goes out when the value has nowhere left to go — asked of the result, not of `max`:
 * a value half a step short of the ceiling can still reach it.
 */
export const NumberFieldIncrement = forwardRef<View, NumberFieldIncrementProps>(
  function NumberFieldIncrement(props, ref) {
    const { increment, canIncrement } = useNumberField()

    return (
      <StepCell
        ref={ref}
        name="NumberField.Increment"
        edge="end"
        hasUpright
        onStep={increment}
        isLive={canIncrement}
        {...props}
      />
    )
  }
)

NumberFieldIncrement.displayName = 'XAUI.Tram.NumberField.Increment'
