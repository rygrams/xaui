import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemPrefixProps } from './list.type'

/**
 * What leads the row: an icon, an avatar, a checkbox.
 *
 * An `Icon` inside it inherits the row's glyph size and its muted colour from the context
 * the item provides, so the marks down a list match without each one being told to.
 */
export const ListItemPrefix = forwardRef<View, ListItemPrefixProps>(
  function ListItemPrefix({ children, style, ...props }, ref) {
    const { prefixStyle } = useList()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[prefixStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListItemPrefix.displayName = 'XAUI.List.ItemPrefix'
