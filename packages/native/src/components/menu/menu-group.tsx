import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useMenu } from './menu.context'
import type { MenuGroupProps } from './menu.type'

/**
 * A run of rows under one heading, announced as a group.
 *
 * It draws nothing — no fill, no separator. What separates two groups is the heading over
 * the second one, and a rule as well would be saying it twice.
 */
export const MenuGroup = forwardRef<View, MenuGroupProps>(function MenuGroup(
  { children, accessibilityRole = 'menu', style, ...props },
  ref
) {
  const { groupStyle } = useMenu()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View
      ref={ref}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[groupStyle, styleProps, style]}
    >
      {children}
    </View>
  )
})

MenuGroup.displayName = 'XAUI.Menu.Group'
