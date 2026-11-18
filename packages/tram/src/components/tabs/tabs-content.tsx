import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTabs } from './tabs.context'
import { usePanelArrival } from './tabs.hook'
import type { TabsContentProps } from './tabs.type'

/**
 * What a tab shows — only the chosen tab's panel is rendered. Absent rather than hidden:
 * a panel that must keep its state across a change is one the caller holds the state for.
 *
 * On a change the panel on screen fades out, fast, and the next one comes in from the
 * side of its tab — from the end going forward, from the start going back — as it fades
 * in. What is inside is not touched: a content that wants its rows in cascade reads
 * `travel` and `towardEnd` from `useTabs` and moves them itself.
 *
 * A `tabpanel`, named by its tab.
 */
export const TabsContent = forwardRef<View, TabsContentProps>(function TabsContent(
  { value, children, role = 'tabpanel', style, ...props },
  ref
) {
  const {
    contentStyle,
    value: selected,
    shown,
    isStill,
    travel,
    towardEnd,
    leaving,
    tabId,
    panelId,
  } = useTabs()
  const [styleProps, rest] = useStyleProps(props)

  const isShown = shown === value
  const isLeaving = isShown && selected !== value
  const { arrived, from } = usePanelArrival({
    isShown,
    side: travel * towardEnd,
    isStill,
  })

  const entering = useAnimatedStyle(() => {
    'worklet'
    if (isLeaving) return { opacity: leaving.value, transform: [{ translateX: 0 }] }

    return {
      opacity: arrived.value,
      transform: [{ translateX: (1 - arrived.value) * from.value }],
    }
  }, [isLeaving, leaving, arrived, from])

  if (!isShown) return null

  return (
    <Animated.View
      // The animated wrapper types its ref as itself; at runtime it is the host view.
      ref={ref as never}
      id={panelId(value)}
      role={role}
      aria-labelledby={tabId(value)}
      {...rest}
      style={[contentStyle, entering, styleProps, style]}
    >
      {children}
    </Animated.View>
  )
})

TabsContent.displayName = 'XAUI.Tram.Tabs.Content'
