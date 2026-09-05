import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useInput } from './input.context'
import type { InputErrorProps } from './input.type'

/**
 * What is wrong with the value, in `danger`.
 *
 * **It always renders what it is given.** `isInvalid` paints the border, the label and the
 * description; it does not mount or unmount this slot, because a slot that silently
 * renders nothing is a slot you cannot debug — you write the condition yourself and see
 * it:
 *
 * ```tsx
 * <Input isInvalid={Boolean(error)}>
 *   <Input.Field value={value} onChangeText={onChange} />
 *   {error ? <Input.Error>{error}</Input.Error> : null}
 * </Input>
 * ```
 *
 * `accessibilityLiveRegion` is deliberately not set: an error that appears while you are
 * still typing in the field is announced by the field's own `aria-invalid`, and a live
 * region on top of that reads the message on every keystroke that changes it.
 */
export const InputError = forwardRef<Text, InputErrorProps>(function InputError(
  { children, style, ...props },
  ref
) {
  const { errorStyle } = useInput()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[errorStyle, styleProps, style]} {...rest}>
      {children}
    </Text>
  )
})

InputError.displayName = 'XAUI.Input.Error'
