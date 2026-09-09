import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListBox } from './list-box.context'
import type { ListBoxItemContentProps } from './list-box.type'

/**
 * The text column, and the thing that pushes the suffix to the end of the row: it takes
 * whatever width the prefix and the suffix leave, so a row with a long title truncates
 * rather than shoving its trailing control off the edge.
 */
export const ListBoxItemContent = forwardRef<View, ListBoxItemContentProps>(
  function ListBoxItemContent({ children, style, ...props }, ref) {
    const { contentStyle } = useListBox()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListBoxItemContent.displayName = 'XAUI.ListBox.ItemContent'
