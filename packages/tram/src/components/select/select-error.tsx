import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectErrorProps } from './select.type'

/**
 * What is wrong with the chosen value, under the field, in `danger` read as ink. It
 * renders what it is given — mounting it stays the caller's condition — and carries the
 * second id the trigger is described by.
 */
export const SelectError = forwardRef<Text, SelectErrorProps>(function SelectError(
  { children, style, nativeID, ...props },
  ref
) {
  const { errorStyle, errorId } = useSelect()
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
})

SelectError.displayName = 'XAUI.Tram.Select.Error'
