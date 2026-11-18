import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useMenu } from './menu.context'
import type { MenuGroupProps } from './menu.type'

/**
 * A run of rows under one heading, announced as a group. It draws nothing: what sets two
 * groups apart is the heading over the second one. It arrives as one step of the cascade.
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

MenuGroup.displayName = 'XAUI.Tram.Menu.Group'
