import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonFillProps } from './slide-button.type'

/**
 * The trail behind the thumb — how far the slide has come, not a state.
 *
 * Optional: compose it for the affordance, leave it out for a bare pill. Its width tracks
 * the thumb's **centre** rather than its leading edge, so the trail sits under the disc
 * instead of stopping short of it. Driven on the UI thread; a spring here would let the
 * trail and the disc come apart under the finger.
 */
export const SlideButtonFill = forwardRef<View, SlideButtonFillProps>(
  function SlideButtonFill({ style, ...props }, ref) {
    const { fillStyle, offset, thumbSize } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    const width = useAnimatedStyle(() => ({
      width: offset.get() + thumbSize / 2,
    }))

    return (
      <Animated.View
        ref={ref}
        {...rest}
        style={[fillStyle, width, styleProps, style]}
      />
    )
  }
)

SlideButtonFill.displayName = 'XAUI.SlideButton.Fill'
