import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemContentProps } from './list.type'

/**
 * The text column, and the thing that pushes the suffix to the end of the row: it takes
 * whatever width the prefix and the suffix leave, so a row with a long title truncates
 * rather than shoving its trailing control off the edge.
 */
export const ListItemContent = forwardRef<View, ListItemContentProps>(
  function ListItemContent({ children, style, ...props }, ref) {
    const { contentStyle } = useList()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListItemContent.displayName = 'XAUI.List.ItemContent'
