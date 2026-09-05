import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useSelect } from './select.context'
import type { SelectItemLabelProps } from './select.type'

/** The row's text. Truncates rather than wrapping, so every row is one row tall. */
export const SelectItemLabel = forwardRef<Text, SelectItemLabelProps>(
  function SelectItemLabel({ children, numberOfLines = 1, style, ...props }, ref) {
    const { itemLabelStyle } = useSelect()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[itemLabelStyle, styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

SelectItemLabel.displayName = 'XAUI.Select.ItemLabel'
