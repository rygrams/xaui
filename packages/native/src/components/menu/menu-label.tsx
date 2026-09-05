import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useMenu } from './menu.context'
import type { MenuLabelProps } from './menu.type'

/**
 * A heading over a run of rows. Not a row: no press, and a screen reader announces it as a
 * header so the group it opens is announced with it.
 */
export const MenuLabel = forwardRef<Text, MenuLabelProps>(function MenuLabel(
  { children, accessibilityRole = 'header', style, ...props },
  ref
) {
  const { labelStyle } = useMenu()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[labelStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

MenuLabel.displayName = 'XAUI.Menu.Label'
