import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useSelect, useSelectItem } from './select.context'
import type { SelectItemLabelProps } from './select.type'

/**
 * An item's text: the page's ink, the accent's for the current choice, grey for an item
 * that cannot be chosen. That colour is the whole mark of the selection.
 */
export const SelectItemLabel = forwardRef<Text, SelectItemLabelProps>(
  function SelectItemLabel({ children, style, ...props }, ref) {
    const { itemLabelStyle, currentStyle, itemDisabledStyle } = useSelect()
    const { isSelected, isDisabled } = useSelectItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        {...rest}
        style={[
          itemLabelStyle,
          isSelected && currentStyle,
          isDisabled && itemDisabledStyle,
          styleProps,
          style,
        ]}
      >
        {children}
      </Text>
    )
  }
)

SelectItemLabel.displayName = 'XAUI.Tram.Select.ItemLabel'
