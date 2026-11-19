import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperValueProps } from './number-stepper.type'

/**
 * The number, between the two keys, in tabular figures on the Tram scale and in the page's
 * ink whatever the keys are painted.
 *
 * ```tsx
 * <NumberStepper.Value />
 * <NumberStepper.Value>{value => `${value ?? 0} pers.`}</NumberStepper.Value>
 * ```
 *
 * With no children it is the value written through `formatOptions`, and an em dash while
 * there is none. A function child is given the number itself.
 */
export const NumberStepperValue = forwardRef<Text, NumberStepperValueProps>(
  function NumberStepperValue({ children, style, ...props }, ref) {
    const { value, text, valueStyle } = useNumberStepper()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        accessibilityRole="text"
        // One line: a second would make the row taller than its keys.
        numberOfLines={1}
        {...rest}
        style={[valueStyle, styleProps, style]}
      >
        {typeof children === 'function' ? children(value) : (children ?? text)}
      </Text>
    )
  }
)

NumberStepperValue.displayName = 'XAUI.Tram.NumberStepper.Value'
