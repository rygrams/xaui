import { useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useTabs } from './tabs.context'
import { INDICATOR_SPRING } from './tabs.animation'
import type { TabsIndicatorProps } from './tabs.type'

/**
 * The one node that says which tab is chosen.
 *
 * It slides between the triggers' measured rectangles on a spring, on the UI thread — so
 * it keeps travelling while whatever the new tab shows is mounting.
 *
 * **It renders nothing until a rectangle exists.** On the first frame no trigger has been
 * laid out, and an indicator at zero width would flash at the start of the row before
 * jumping to the chosen tab.
 */
export function TabsIndicator({ style, ...props }: TabsIndicatorProps) {
  const { indicatorStyle, value, rects } = useTabs()
  const [styleProps, rest] = useStyleProps(props)

  const rect = value === undefined ? undefined : rects[value]
  const x = useSharedValue(rect?.x ?? 0)
  const width = useSharedValue(rect?.width ?? 0)
  // Not animated: it is what tells the first frame apart from every frame after it.
  const hasArrived = useSharedValue(rect !== undefined)

  useEffect(() => {
    if (rect === undefined) return

    // The first placement jumps and every one after it springs. Animating the first would
    // slide the indicator in from the start of the row on mount, which reads as the tab
    // bar arranging itself rather than as a control at rest.
    if (hasArrived.get()) {
      x.set(withSpring(rect.x, INDICATOR_SPRING))
      width.set(withSpring(rect.width, INDICATOR_SPRING))
    } else {
      x.set(rect.x)
      width.set(rect.width)
      hasArrived.set(true)
    }
  }, [rect, hasArrived, width, x])

  const travel = useAnimatedStyle(() => ({
    transform: [{ translateX: x.get() }],
    width: width.get(),
    opacity: hasArrived.get() ? 1 : 0,
  }))

  return (
    <Animated.View {...rest} style={[indicatorStyle, travel, styleProps, style]} />
  )
}

TabsIndicator.displayName = 'XAUI.Tabs.Indicator'
