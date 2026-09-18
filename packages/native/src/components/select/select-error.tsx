import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectErrorProps } from './select.type'

/**
 * What is wrong with the chosen value, in `danger` — the `TextField.Error`, on a field
 * that opens a list.
 *
 * **It always renders what it is given.** `isInvalid` paints the trigger's border and
 * turns the label and the description, but it does not mount or unmount this slot: a slot
 * that silently renders nothing is one you cannot debug, so you write the condition
 * yourself.
 */
export const SelectError = forwardRef<Text, SelectErrorProps>(function SelectError(
  { children, style, ...props },
  ref
) {
  const { errorStyle } = useSelect()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text ref={ref} style={[errorStyle, styleProps, style]} {...rest}>
      {children}
    </Text>
  )
})

SelectError.displayName = 'XAUI.Select.Error'
