import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useMenu, useMenuItem } from './menu.context'
import type { MenuItemTitleProps } from './menu.type'

/**
 * The row's text, and the one node that carries its intent — a `danger` row is a red
 * label, not a red row. It takes the row's width so an indicator stays pinned to the end
 * whatever the label's length.
 */
export const MenuItemTitle = forwardRef<Text, MenuItemTitleProps>(
  function MenuItemTitle({ children, numberOfLines = 1, style, ...props }, ref) {
    const { itemTitleStyle } = useMenu()
    const { variant } = useMenuItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[itemTitleStyle[variant], styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

MenuItemTitle.displayName = 'XAUI.Menu.ItemTitle'
