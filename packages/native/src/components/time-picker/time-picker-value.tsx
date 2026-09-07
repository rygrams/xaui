import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTimePicker } from './time-picker.context'
import type { TimePickerValueProps } from './time-picker.type'

/**
 * The time the field reads, through `Intl`.
 *
 * **The format is the platform's, not a string this library writes.** `formatOptions` on the
 * root is `Intl.DateTimeFormatOptions`, so a caller asks for `timeStyle: 'short'` or for
 * their own combination and gets the locale's own punctuation, its own hour cycle and its own
 * period marker — none of which a template in here would know.
 *
 * With no time chosen it reads `placeholder`, in the placeholder's colour, and children
 * replace both.
 */
export const TimePickerValue = forwardRef<Text, TimePickerValueProps>(
  function TimePickerValue({ children, placeholder, style, ...props }, ref) {
    const { text, valueStyle, placeholderStyle } = useTimePicker()
    const [styleProps, rest] = useStyleProps(props)

    const isEmpty = children === undefined && text === undefined

    return (
      <Text
        ref={ref}
        numberOfLines={1}
        {...rest}
        style={[isEmpty ? placeholderStyle : valueStyle, styleProps, style]}
      >
        {children ?? text ?? placeholder}
      </Text>
    )
  }
)

TimePickerValue.displayName = 'XAUI.TimePicker.Value'
