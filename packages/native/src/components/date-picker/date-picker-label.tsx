import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDatePicker } from './date-picker.context'
import type { DatePickerLabelProps } from './date-picker.type'

/**
 * What the field is for — the `TextField.Label` on a date field.
 *
 * It turns `danger` with `isInvalid`, so a wrong field is findable on a long form without
 * reading every message. Its colour is the theme's `foreground`, not the field's: the label
 * sits outside the box, so a tinted field does not tint it.
 */
export const DatePickerLabel = forwardRef<Text, DatePickerLabelProps>(
  function DatePickerLabel({ children, style, ...props }, ref) {
    const { labelStyle } = useDatePicker()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[labelStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

DatePickerLabel.displayName = 'XAUI.DatePicker.Label'
