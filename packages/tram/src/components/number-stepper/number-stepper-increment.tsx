import { forwardRef } from 'react'
import type { View } from 'react-native'
import { StepperButton } from './number-stepper-button'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperButtonProps } from './number-stepper.type'

/**
 * One step up, by convention at the trailing end of the row: a square key with a plus, two
 * bars a quarter turn apart. It goes out when the value has nowhere left to go — asked of
 * the result, not of `max`.
 */
export const NumberStepperIncrement = forwardRef<View, NumberStepperButtonProps>(
  function NumberStepperIncrement(props, ref) {
    const { increment, canIncrement } = useNumberStepper()

    return (
      <StepperButton
        ref={ref}
        name="NumberStepper.Increment"
        hasUpright
        onStep={increment}
        isLive={canIncrement}
        {...props}
      />
    )
  }
)

NumberStepperIncrement.displayName = 'XAUI.Tram.NumberStepper.Increment'
