import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTextField } from './text-field.context'
import type { TextFieldErrorProps } from './text-field.type'

/**
 * What is wrong with the value, under the field, in `danger` read as ink.
 *
 * It always renders what it is given: `isInvalid` draws the border, and mounting this
 * slot stays the caller's condition. It carries the second id the field points at with
 * `aria-describedby`, so the message is read with the field.
 */
export const TextFieldError = forwardRef<Text, TextFieldErrorProps>(
  function TextFieldError({ children, style, nativeID, ...props }, ref) {
    const { errorStyle, errorId } = useTextField()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        nativeID={nativeID ?? errorId}
        style={[errorStyle, styleProps, style]}
        {...rest}
      >
        {children}
      </Text>
    )
  }
)

TextFieldError.displayName = 'XAUI.Tram.TextField.Error'
