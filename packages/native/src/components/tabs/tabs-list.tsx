import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTabs } from './tabs.context'
import type { TabsListProps } from './tabs.type'

/**
 * The row the triggers sit in, and the box the indicator slides inside.
 *
 * It hugs its tabs rather than filling the row: a tab bar as wide as the screen with three
 * tabs in it is a segmented control pretending to be a navigation bar. `alignSelf` on the
 * caller's side is how you widen it.
 */
export const TabsList = forwardRef<View, TabsListProps>(function TabsList(
  { children, accessibilityRole = 'tablist', style, ...props },
  ref
) {
  const { listStyle } = useTabs()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View
      ref={ref}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[listStyle, styleProps, style]}
    >
      {children}
    </View>
  )
})

TabsList.displayName = 'XAUI.Tabs.List'
