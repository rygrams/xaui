import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTextField } from './text-field.context'
import type { TextFieldErrorProps } from './text-field.type'

/**
 * What is wrong with the value, in `danger`.
 *
 * **It always renders what it is given.** `isInvalid` paints the border, the label and the
 * description; it does not mount or unmount this slot, because a slot that silently
 * renders nothing is a slot you cannot debug — you write the condition yourself and see
 * it:
 *
 * ```tsx
 * <TextField isInvalid={Boolean(error)}>
 *   <TextField.Field value={value} onChangeText={onChange} />
 *   {error ? <TextField.Error>{error}</TextField.Error> : null}
 * </TextField>
 * ```
 *
 * `accessibilityLiveRegion` is deliberately not set: an error that appears while you are
 * still typing in the field is announced by the field's own `aria-invalid`, and a live
 * region on top of that reads the message on every keystroke that changes it.
 */
export const TextFieldError = forwardRef<Text, TextFieldErrorProps>(
  function TextFieldError({ children, style, ...props }, ref) {
    const { errorStyle } = useTextField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} style={[errorStyle, styleProps, style]} {...rest}>
        {children}
      </Text>
    )
  }
)

TextFieldError.displayName = 'XAUI.TextField.Error'
