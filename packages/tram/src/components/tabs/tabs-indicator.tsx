import { forwardRef, useEffect, useSyncExternalStore } from 'react'
import type { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTabs } from './tabs.context'
import { useRuleStyle, useRuleTravel } from './tabs.hook'
import type { TabsIndicatorProps } from './tabs.type'

/**
 * A rule under the chosen title — an extra. Metro's tabs have none, and neither do
 * Tram's until the caller writes this inside `Tabs.List`: nothing is drawn, measured or
 * animated for it otherwise.
 *
 * Written, it is a line of the theme's border width, as wide as the title above it, in
 * the accent read as ink — `accent` and `color` on the root are its colour. It goes from
 * one tab to the next on the `navigation` spring, and is set without moving the first
 * time the tabs are measured.
 */
export const TabsIndicator = forwardRef<View, TabsIndicatorProps>(
  function TabsIndicator({ style, ...props }, ref) {
    const { indicatorStyle, value, isStill, row, claimIndicator } = useTabs()
    const [styleProps, rest] = useStyleProps(props)

    // Its being here is what makes the titles measure themselves.
    useEffect(claimIndicator, [claimIndicator])

    const rule = useSyncExternalStore(
      row.subscribe,
      () => (value === undefined ? undefined : row.rule(value)),
      () => undefined
    )
    const travel = useRuleTravel(rule, value, isStill)
    const placed = useRuleStyle(travel, row.isReversed() ? -1 : 1)

    return (
      <Animated.View
        // The animated wrapper types its ref as itself; at runtime it is the host view.
        ref={ref as never}
        // A drawing of a state the chosen tab already says.
        accessibilityElementsHidden
        importantForAccessibility="no"
        {...rest}
        style={[indicatorStyle, UNTOUCHED, placed, styleProps, style]}
      />
    )
  }
)

/** A touch on the rule is a touch on the tab above it. */
const UNTOUCHED = { pointerEvents: 'none' } as const

TabsIndicator.displayName = 'XAUI.Tram.Tabs.Indicator'
