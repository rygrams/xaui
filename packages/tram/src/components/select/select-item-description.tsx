import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSelect } from './select.context'
import type { SelectItemDescriptionProps } from './select.type'

/** An item's second line, in the muted ink — chosen or not. */
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

SelectItemDescription.displayName = 'XAUI.Tram.Select.ItemDescription'
