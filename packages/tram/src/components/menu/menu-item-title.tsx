import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useMenu, useMenuItem } from './menu.context'
import type { MenuItemTitleProps } from './menu.type'

/**
 * The row's text, in `title` — the big text of the Metro context menu — and the one node
 * that carries its intent: a `danger` row is a red title, not a red row, and a disabled
 * one is grey. It wraps rather than cutting the action short; `numberOfLines` cuts it.
 */
export const MenuItemTitle = forwardRef<Text, MenuItemTitleProps>(
  function MenuItemTitle({ children, style, ...props }, ref) {
    const { itemTitleStyle } = useMenu()
    const { variant, isDisabled } = useMenuItem()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text
        ref={ref}
        {...rest}
        style={[itemTitleStyle[isDisabled ? 'grey' : variant], styleProps, style]}
      >
        {children}
      </Text>
    )
  }
)

MenuItemTitle.displayName = 'XAUI.Tram.Menu.ItemTitle'
