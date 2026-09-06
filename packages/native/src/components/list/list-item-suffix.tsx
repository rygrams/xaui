import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useList } from './list.context'
import type { ListItemSuffixProps } from './list.type'

/**
 * What trails the row: a value, a switch, a chevron, a badge.
 *
 * **It draws nothing of its own.** HeroUI's puts a chevron here by default; the trailing
 * end of a settings row is a `Switch` at least as often, and a slot that guesses makes you
 * pass a child in order to render nothing. What goes there is the row's business, and the
 * row is one line away from saying so.
 */
export const ListItemSuffix = forwardRef<View, ListItemSuffixProps>(
  function ListItemSuffix({ children, style, ...props }, ref) {
    const { suffixStyle } = useList()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[suffixStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

ListItemSuffix.displayName = 'XAUI.List.ItemSuffix'
