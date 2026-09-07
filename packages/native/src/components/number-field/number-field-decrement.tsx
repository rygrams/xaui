import { forwardRef } from 'react'
import type { View } from 'react-native'
import { FieldGroupPrefix } from '../field-group'
import { useNumberField } from './number-field.context'
import { StepButton } from './number-field-step-button'
import type { NumberFieldDecrementProps } from './number-field.type'

/**
 * One step down, on the leading edge.
 *
 * `NumberField.Increment`'s mirror in every way — the same target, the same dimming, the
 * same `FieldGroup` decorator — except that it draws one bar instead of two and takes the
 * step in the other direction.
 *
 * The leading edge, so the value sits between the pair. `start`, never `left` (R13): a
 * field read right to left puts the minus where that reader's eye starts.
 */
export const NumberFieldDecrement = forwardRef<View, NumberFieldDecrementProps>(
  function NumberFieldDecrement({ accessibilityLabel, children, ...props }, ref) {
    const { decrement, canDecrement } = useNumberField()

    return (
      <FieldGroupPrefix ref={ref} {...props}>
        <StepButton
          name="NumberField.Decrement"
          hasUpright={false}
          onPress={decrement}
          isLive={canDecrement}
          accessibilityLabel={accessibilityLabel}
        >
          {children}
        </StepButton>
      </FieldGroupPrefix>
    )
  }
)

NumberFieldDecrement.displayName = 'XAUI.NumberField.Decrement'
