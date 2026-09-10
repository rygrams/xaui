import { forwardRef } from 'react'
import type { View } from 'react-native'
import { FieldGroupSuffix } from '../field-group'
import { useNumberField } from './number-field.context'
import { StepButton } from './number-field-step-button'
import type { NumberFieldIncrementProps } from './number-field.type'

/**
 * One step up, on the trailing edge.
 *
 * ```tsx
 * <FieldGroup>
 *   <NumberField.Decrement accessibilityLabel="Un de moins" />
 *   <NumberField.Field />
 *   <NumberField.Increment accessibilityLabel="Un de plus" />
 * </FieldGroup>
 * ```
 *
 * It goes in a `FieldGroup`: that is the thing that lays a control over a field and measures
 * it, and the field reads the same measurement to leave it room.
 *
 * **The trailing edge is not a choice.** The value sits between the two buttons, which is
 * the only arrangement in which they read as one control rather than as two marks that
 * happen to be nearby — so `Increment` takes this edge and `Decrement` the other.
 *
 * It goes flat when the value has nowhere left to go, and it stops taking presses there.
 * That is asked of the **result** rather than of `max`: a value half a step short of the
 * ceiling can still reach it, and a button dead at that point strands the reader.
 *
 * With no children it draws its own plus, so this works in a project that has installed no
 * icon set. Pass an `<Icon>` to replace it.
 */
export const NumberFieldIncrement = forwardRef<View, NumberFieldIncrementProps>(
  function NumberFieldIncrement({ accessibilityLabel, children, ...props }, ref) {
    const { increment, canIncrement } = useNumberField()

    return (
      <FieldGroupSuffix ref={ref} {...props}>
        <StepButton
          name="NumberField.Increment"
          hasUpright
          onPress={increment}
          isLive={canIncrement}
          accessibilityLabel={accessibilityLabel}
        >
          {children}
        </StepButton>
      </FieldGroupSuffix>
    )
  }
)

NumberFieldIncrement.displayName = 'XAUI.NumberField.Increment'
