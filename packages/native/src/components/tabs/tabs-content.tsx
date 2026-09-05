import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTabs } from './tabs.context'
import type { TabsContentProps } from './tabs.type'

/**
 * What a tab shows. Mounted when its tab is chosen, absent otherwise.
 *
 * Absent rather than hidden, deliberately: a tab bar over four screens of content should
 * not have four screens of content mounted. A panel that must keep its state across a
 * switch — a half-typed form, a scroll position — is one the caller holds the state for,
 * which is the same trade every router makes.
 */
export const TabsContent = forwardRef<View, TabsContentProps>(function TabsContent(
  { value, children, accessibilityRole = 'tab', style, ...props },
  ref
) {
  const { value: selected } = useTabs()
  const [styleProps, rest] = useStyleProps(props)

  if (selected !== value) return null

  return (
    <View
      ref={ref}
      accessibilityRole={accessibilityRole}
      {...rest}
      style={[styleProps, style]}
    >
      {children}
    </View>
  )
})

TabsContent.displayName = 'XAUI.Tabs.Content'
