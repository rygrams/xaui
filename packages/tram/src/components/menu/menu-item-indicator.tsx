import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useMenu } from './menu.context'
import type { MenuItemIndicatorProps } from './menu.type'

/**
 * A fixed box of 24 at either end of a row — a check, a glyph. Its size does not depend on
 * what is in it, so two rows whose indicators differ still line their titles up. What
 * goes in it is the caller's; an `Icon` there is drawn in the title's ink.
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

MenuItemIndicator.displayName = 'XAUI.Tram.Menu.ItemIndicator'
