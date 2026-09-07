import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDatePicker } from './date-picker.context'
import type { DatePickerValueProps } from './date-picker.type'

/**
 * The chosen day, or the placeholder until there is one.
 *
 * The root formats it through `Intl` and the picker's `formatOptions`, so the field and the
 * calendar under it never disagree about which day is chosen or how it is written.
 * `children` overrides the text outright — a relative "Aujourd'hui" is the case for it.
 *
 * Single-line: a date long enough to wrap would grow a control whose height is fixed.
 */
export const DatePickerValue = forwardRef<Text, DatePickerValueProps>(
  function DatePickerValue(
    { placeholder, children, numberOfLines = 1, style, ...props },
    ref
  ) {
    const { valueStyle, placeholderStyle, label } = useDatePicker()
    const [styleProps, rest] = useStyleProps(props)

    const text = children ?? label
    const isEmpty = text === undefined || text === ''

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[valueStyle, isEmpty && placeholderStyle, styleProps, style]}
      >
        {isEmpty ? placeholder : text}
      </Text>
    )
  }
)

DatePickerValue.displayName = 'XAUI.DatePicker.Value'
