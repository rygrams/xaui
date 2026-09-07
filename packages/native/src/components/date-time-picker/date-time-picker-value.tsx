import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDateTimePicker } from './date-time-picker.context'
import type { DateTimePickerValueProps } from './date-time-picker.type'

/**
 * The moment the field reads, through `Intl`.
 *
 * `formatOptions` on the root is `Intl.DateTimeFormatOptions`, so a caller asks for
 * `{ dateStyle: 'medium', timeStyle: 'short' }` — the default — or their own combination, and
 * gets the locale's own order, punctuation and hour cycle. None of which a template in here
 * would know.
 */
export const DateTimePickerValue = forwardRef<Text, DateTimePickerValueProps>(
  function DateTimePickerValue({ children, placeholder, style, ...props }, ref) {
    const { text, valueStyle, placeholderStyle } = useDateTimePicker()
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

DateTimePickerValue.displayName = 'XAUI.DateTimePicker.Value'
