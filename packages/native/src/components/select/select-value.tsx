import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectValueProps } from './select.type'

/**
 * What is chosen, or the placeholder until something is.
 *
 * The label comes from the item that registered it, so the caller writes it once — in the
 * list — rather than twice. `children` overrides that, which is the answer for a list
 * rendered lazily: the root has never mounted the item, so it has never seen its label.
 *
 * Single-line by default. A value long enough to wrap would grow a control whose height
 * is fixed, so it truncates instead.
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

SelectValue.displayName = 'XAUI.Select.Value'
