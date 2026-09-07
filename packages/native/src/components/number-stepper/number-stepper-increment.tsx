import { forwardRef } from 'react'
import type { View } from 'react-native'
import { StepperButton } from './number-stepper-button'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperButtonProps } from './number-stepper.type'

/**
 * One step up, and by convention the trailing end of the pair.
 *
 * ```tsx
 * <NumberStepper.Increment accessibilityLabel="Un de plus" />
 * ```
 *
 * Its mark fades and it stops taking presses when the value has nowhere left to go —
 * the mark, not the box: a button dimmed whole goes translucent, and then the pill it is
 * raised off reads straight through it. That is asked of the **result** rather than of `max`: a value half a step short of the ceiling
 * can still reach it, and a button dead at that point strands the reader.
 *
 * With no children it draws its own plus. Pass an `<Icon>` to replace it, and an `onPress`
 * of your own to replace the step.
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

NumberStepperIncrement.displayName = 'XAUI.NumberStepper.Increment'
