import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useDatePicker } from './date-picker.context'
import type { DatePickerErrorProps } from './date-picker.type'

/**
 * What is wrong with the chosen day, in `danger` — the `TextField.Error`, on a date field.
 *
 * **It always renders what it is given.** `isInvalid` paints the field border and turns the
 * label and the description, but it does not mount or unmount this slot: a slot that
 * silently renders nothing is one you cannot debug, so you write the condition yourself.
 * `DatePicker.Field` does exactly that with its `errorMessage` prop.
 */
export const DatePickerError = forwardRef<Text, DatePickerErrorProps>(
  function DatePickerError({ children, style, ...props }, ref) {
    const { errorStyle } = useDatePicker()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[errorStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

DatePickerError.displayName = 'XAUI.DatePicker.Error'
