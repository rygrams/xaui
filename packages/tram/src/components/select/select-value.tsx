import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectValueProps } from './select.type'

/**
 * What is chosen, in the page's ink, or the placeholder until something is. The label
 * comes from the item that registered it, so the caller writes it once — in the list.
 *
 * A single line: a value long enough to wrap would grow a box whose height is set.
 */
export const SelectValue = forwardRef<Text, SelectValueProps>(function SelectValue(
  { placeholder, children, numberOfLines = 1, style, ...props },
  ref
) {
  const { valueStyle, placeholderStyle, value, labelFor } = useSelect()
  const [styleProps, rest] = useStyleProps(props)

  const label = children ?? (value !== undefined ? labelFor(value) : undefined)
  const isEmpty = label === undefined || label === ''

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      {...rest}
      style={[valueStyle, isEmpty && placeholderStyle, styleProps, style]}
    >
      {isEmpty ? placeholder : label}
    </Text>
  )
})

SelectValue.displayName = 'XAUI.Tram.Select.Value'
