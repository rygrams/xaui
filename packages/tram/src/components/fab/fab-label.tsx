import { forwardRef } from 'react'
import type { Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useFab } from './fab.context'
import type { FabLabelProps } from './fab.type'

/**
 * The word under the circle, on an extended `Fab`: the App Bar's label, a caption in the
 * page's ink, centred, on one line. Written as a direct child of the `Fab`, which lays it
 * under the circle and draws it only while `isExtended`.
 *
 * It names the button and is not read a second time: the root takes its text as its
 * accessibility label, and the label itself is hidden from a screen reader.
 *
 * The case is the app's.
 */
export const FabLabel = forwardRef<Text, FabLabelProps>(function FabLabel(
  { children, style, numberOfLines = 1, ...props },
  ref
) {
  const { labelStyle, labelTone } = useFab()
  const [styleProps, rest] = useStyleProps(props)
  const { ink, grey, dim } = labelTone

  const tone = useAnimatedStyle(() => {
    'worklet'
    return { color: interpolateColor(dim.value, [0, 1], [ink, grey]) }
  }, [dim, ink, grey])

  return (
    <Animated.Text
      // The animated wrapper types its ref as itself; at runtime it is the host text.
      ref={ref as never}
      numberOfLines={numberOfLines}
      accessible={false}
      aria-hidden
      importantForAccessibility="no"
      accessibilityElementsHidden
      style={[labelStyle, tone, styleProps, style]}
      {...rest}
    >
      {children}
    </Animated.Text>
  )
})

FabLabel.displayName = 'XAUI.Tram.Fab.Label'
