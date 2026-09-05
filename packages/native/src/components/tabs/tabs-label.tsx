import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTabs, useTabsTrigger } from './tabs.context'
import type { TabsLabelProps } from './tabs.type'

/**
 * A tab's text. It is the one thing that says which tab is chosen when the indicator has
 * not arrived yet — the colour changes on the press, the pill takes a moment to follow.
 */
export const TabsLabel = forwardRef<Text, TabsLabelProps>(function TabsLabel(
  { children, numberOfLines = 1, style, ...props },
  ref
) {
  const { labelStyle, labelSelectedStyle } = useTabs()
  const { isSelected } = useTabsTrigger()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      {...rest}
      style={[labelStyle, isSelected && labelSelectedStyle, styleProps, style]}
    >
      {children}
    </Text>
  )
})

TabsLabel.displayName = 'XAUI.Tabs.Label'
