import { forwardRef, useCallback } from 'react'
import type { LayoutChangeEvent, Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTabs, useTabsTrigger } from './tabs.context'
import type { TabsLabelProps } from './tabs.type'

/**
 * A tab's title, set on the Tram scale by the tabs' size — `subtitle`, `title`,
 * `section`. Its colour is the whole of the chosen state on screen: the page's ink for the
 * chosen tab, grey for the others, fading from one to the other when the choice changes.
 * Neither its size nor its weight moves. The case is the app's.
 *
 * It measures itself only while a `Tabs.Indicator` is written — the rule is as wide as
 * the title, and nothing else needs to know.
 */
export const TabsLabel = forwardRef<Text, TabsLabelProps>(function TabsLabel(
  { children, numberOfLines = 1, style, onLayout, ...props },
  ref
) {
  const { labelStyle, tones, hasIndicator, row } = useTabs()
  const { value, chosen, isDisabled } = useTabsTrigger()
  const [styleProps, rest] = useStyleProps(props)
  const { rest: atRest, chosen: inInk } = tones

  const tone = useAnimatedStyle(() => {
    'worklet'
    return { color: interpolateColor(chosen.value, [0, 1], [atRest, inInk]) }
  }, [chosen, atRest, inInk])

  const measure = useCallback(
    (event: LayoutChangeEvent) => {
      onLayout?.(event)
      const { x, width } = event.nativeEvent.layout
      row.setLabel(value, { x, width })
    },
    [onLayout, row, value]
  )

  return (
    <Animated.Text
      // The animated wrapper types its ref as itself; at runtime it is the host text.
      ref={ref as never}
      numberOfLines={numberOfLines}
      {...rest}
      onLayout={hasIndicator ? measure : onLayout}
      // A tab that cannot be chosen is grey, chosen or not: the recipe's own colour.
      style={[labelStyle, isDisabled ? undefined : tone, styleProps, style]}
    >
      {children}
    </Animated.Text>
  )
})

TabsLabel.displayName = 'XAUI.Tram.Tabs.Label'
