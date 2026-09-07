import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDateRangePicker } from './date-range-picker.context'
import type { DateRangePickerValueProps } from './date-range-picker.type'

/**
 * The period the field reads, through `Intl`.
 *
 * **A start with no end reads as itself**, not as "start – ". A dash with nothing after it
 * says the field is broken, where a lone date says it is half answered — which is exactly
 * what it is between the two presses.
 */
export const DateRangePickerValue = forwardRef<Text, DateRangePickerValueProps>(
  function DateRangePickerValue({ children, placeholder, style, ...props }, ref) {
    const { text, valueStyle, placeholderStyle } = useDateRangePicker()
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

DateRangePickerValue.displayName = 'XAUI.DateRangePicker.Value'
