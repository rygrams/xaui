import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useNumberStepper } from './number-stepper.context'
import type { NumberStepperValueProps } from './number-stepper.type'

/**
 * The number, between the two buttons.
 *
 * ```tsx
 * <NumberStepper.Value />
 * <NumberStepper.Value>{value => `${value ?? 0} pers.`}</NumberStepper.Value>
 * ```
 *
 * With no children it is the value written through `formatOptions`, and an em dash while
 * there is none — an em dash and not a zero, because a stepper that has never been pressed
 * is holding nothing rather than holding none.
 *
 * A function child is given the number itself, for a unit, a plural or a word in place of a
 * digit. It keeps the page's own ink whatever the buttons are painted, because it sits on
 * the pill rather than on a button.
 */
export const NumberStepperValue = forwardRef<Text, NumberStepperValueProps>(
  function NumberStepperValue({ children, style, ...props }, ref) {
    const { value, text, valueStyle } = useNumberStepper()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        // The number is what a screen reader should read as the stepper's value, and it is
        // the one part of this control that is text rather than a mark.
        accessibilityRole="text"
        // One line, so a number with no room left truncates instead of wrapping — a second
        // line is a row taller than its own buttons. Before the caller's props, because a
        // `Value` holding a word that must wrap is theirs to allow.
        numberOfLines={1}
        {...rest}
        style={[valueStyle, styleProps, style]}
      >
        {typeof children === 'function' ? children(value) : (children ?? text)}
      </Text>
    )
  }
)

NumberStepperValue.displayName = 'XAUI.NumberStepper.Value'
