import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDatePicker } from './date-picker.context'
import type { DatePickerDescriptionProps } from './date-picker.type'

/**
 * The hint under the field — the format expected, what the day is used for. The
 * `TextField.Description`, on a date field.
 *
 * It turns `danger` with `isInvalid`, like the label, and sits inset by half the field's
 * padding so the column reads as one block rather than a label, a box and a stray line.
 */
export const DatePickerDescription = forwardRef<Text, DatePickerDescriptionProps>(
  function DatePickerDescription({ children, style, ...props }, ref) {
    const { descriptionStyle } = useDatePicker()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[descriptionStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

DatePickerDescription.displayName = 'XAUI.DatePicker.Description'
