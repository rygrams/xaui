import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useMenu } from './menu.context'
import type { MenuItemDescriptionProps } from './menu.type'

/**
 * The second line of a row. It stays muted whatever the row's intent: a `danger` row says
 * what it does in red once, and a red sentence under it says it twice.
 */
export const MenuItemDescription = forwardRef<Text, MenuItemDescriptionProps>(
  function MenuItemDescription({ children, style, ...props }, ref) {
    const { itemDescriptionStyle } = useMenu()
    const [styleProps, rest] = useStyleProps(props)

    return (
      <Text ref={ref} {...rest} style={[itemDescriptionStyle, styleProps, style]}>
        {children}
      </Text>
    )
  }
)

MenuItemDescription.displayName = 'XAUI.Menu.ItemDescription'
