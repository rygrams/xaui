import Animated from 'react-native-reanimated'
import { useSlidingIndicator } from '../../hooks/use-sliding-indicator'
import { useStyleProps } from '../../system/style-props'
import { useTabs } from './tabs.context'
import type { TabsIndicatorProps } from './tabs.type'

/**
 * The one node that says which tab is chosen.
 *
 * The sliding is `useSlidingIndicator`, shared with the `Segment`: the same filled shape
 * following the chosen child along a row, with the same two behaviours worth getting right
 * — nothing drawn before the first layout, and a first placement that jumps where every
 * one after it springs.
 */
export function TabsIndicator({ style, ...props }: TabsIndicatorProps) {
  const { indicatorStyle, value, rects } = useTabs()
  const [styleProps, rest] = useStyleProps(props)

  const travel = useSlidingIndicator(value === undefined ? undefined : rects[value])

  return (
    <Animated.View {...rest} style={[indicatorStyle, travel, styleProps, style]} />
  )
}

TabsIndicator.displayName = 'XAUI.Tabs.Indicator'
