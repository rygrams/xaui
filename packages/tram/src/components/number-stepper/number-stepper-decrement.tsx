import { forwardRef } from 'react'
import type { View } from 'react-native'
import { StepperButton } from './number-stepper-button'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperButtonProps } from './number-stepper.type'

/**
 * One step down, by convention at the leading end of the row: a square key with a single
 * bar. It goes out when the value has nowhere left to go — asked of the result, not of
 * `min`.
 */
export const NumberStepperDecrement = forwardRef<View, NumberStepperButtonProps>(
  function NumberStepperDecrement(props, ref) {
    const { decrement, canDecrement } = useNumberStepper()

    return (
      <StepperButton
        ref={ref}
        name="NumberStepper.Decrement"
        hasUpright={false}
        onStep={decrement}
        isLive={canDecrement}
        {...props}
      />
    )
  }
)

NumberStepperDecrement.displayName = 'XAUI.Tram.NumberStepper.Decrement'
