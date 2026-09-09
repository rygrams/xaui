import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useListBox } from './list-box.context'
import type { ListBoxItemPrefixProps } from './list-box.type'

/**
 * What leads the row: an icon, an avatar, a checkbox.
 *
 * An `Icon` inside it inherits the row's glyph size and its muted colour from the context
 * the item provides, so the marks down a list match without each one being told to.
 */
export const ListBoxItemPrefix = forwardRef<View, ListBoxItemPrefixProps>(
  function ListBoxItemPrefix({ children, style, ...props }, ref) {
    const { prefixStyle } = useListBox()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[prefixStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListBoxItemPrefix.displayName = 'XAUI.ListBox.ItemPrefix'
