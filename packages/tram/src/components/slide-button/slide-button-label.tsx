import { forwardRef } from 'react'
import type { Text } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonLabelProps } from './slide-button.type'

/**
 * The instruction, centred across the whole box on the Tram scale and clear of the thumb
 * at both ends — it never runs under it, at rest or once arrived.
 *
 * ```tsx
 * <SlideButton.Label>glisser pour confirmer</SlideButton.Label>
 * ```
 *
 * In the page's ink at rest; once the slide has counted it turns, with the box filling,
 * to the colour that reads on the accent. One line: the box's height is fixed. The case
 * is the app's — Tram does not rewrite what it is given.
 */
export const SlideButtonLabel = forwardRef<Text, SlideButtonLabelProps>(
  function SlideButtonLabel({ children, style, numberOfLines = 1, ...props }, ref) {
    const { labelStyle, inks, done } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)
    const { label, labelDone } = inks

    const ink = useAnimatedStyle(() => {
      'worklet'
      return { color: interpolateColor(done.value, [0, 1], [label, labelDone]) }
    }, [done, label, labelDone])

    return (
      <Animated.Text
        ref={ref}
        numberOfLines={numberOfLines}
        {...rest}
        style={[labelStyle, ink, styleProps, style]}
      >
        {children}
      </Animated.Text>
    )
  }
)

SlideButtonLabel.displayName = 'XAUI.Tram.SlideButton.Label'
