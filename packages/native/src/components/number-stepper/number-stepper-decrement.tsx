import { forwardRef } from 'react'
import type { View } from 'react-native'
import { StepperButton } from './number-stepper-button'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperButtonProps } from './number-stepper.type'

/**
 * One step down, and by convention the leading end of the pair.
 *
 * `NumberStepper.Increment`'s mirror in every way — the same target, the same feedback, the
 * same dimming — except that it draws one bar instead of two and takes the step in the
 * other direction.
 *
 * **A decrement that becomes a bin at the floor is `children` and a ternary**, not a prop of
 * its own:
 *
 * ```tsx
 * <NumberStepper.Decrement
 *   accessibilityLabel={quantity === 1 ? 'Retirer du panier' : 'Un de moins'}
 *   onPress={quantity === 1 ? remove : undefined}
 * >
 *   {quantity === 1 ? <Icon as={TrashIcon} color="#ef4444" /> : undefined}
 * </NumberStepper.Decrement>
 * ```
 *
 * A caller's own `onPress` replaces the step rather than running beside it: removing the row
 * is not also decrementing it.
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

NumberStepperDecrement.displayName = 'XAUI.NumberStepper.Decrement'
