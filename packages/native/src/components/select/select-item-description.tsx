import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectItemDescriptionProps } from './select.type'

/**
 * The second line of a row. Unlike the label it wraps, because the thing it exists to
 * carry is the sentence a label was too short for.
 */
export const SelectItemDescription = forwardRef<Text, SelectItemDescriptionProps>(
  function SelectItemDescription({ children, style, ...props }, ref) {
    const { itemDescriptionStyle } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[itemDescriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

SelectItemDescription.displayName = 'XAUI.Select.ItemDescription'
