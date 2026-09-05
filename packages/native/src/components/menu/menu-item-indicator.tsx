import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useMenu } from './menu.context'
import type { MenuItemIndicatorProps } from './menu.type'

/**
 * A fixed box at either end of a row — a check, a glyph, a count. Its size does not depend
 * on what is in it, so two rows whose indicators differ still line their titles up.
 *
 * It renders nothing on its own, unlike the `Select`'s: a menu has no selected row to mark,
 * so what goes in the box is always the caller's.
 */
export const MenuItemIndicator = forwardRef<View, MenuItemIndicatorProps>(
  function MenuItemIndicator({ children, style, ...props }, ref) {
    const { itemIndicatorStyle } = useMenu()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <View ref={ref} {...rest} style={[itemIndicatorStyle, styleProps, style]}>
        {children}
      </View>
    )
  }
)

MenuItemIndicator.displayName = 'XAUI.Menu.ItemIndicator'
