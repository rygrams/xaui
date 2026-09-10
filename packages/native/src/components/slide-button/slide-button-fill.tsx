import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonFillProps } from './slide-button.type'

/**
 * The trail behind the handle — how far the slide has come, not a state.
 *
 * Optional: compose it for the affordance, leave it out for a bare pill. Its width **is**
 * the handle's offset, so it is nothing at rest — nothing to draw over the pill's leading
 * corner — and it grows from the leading edge to just under the handle as the drag runs.
 * Driven on the UI thread; a spring here would let the trail and the handle come apart
 * under the finger.
 */
export const SlideButtonFill = forwardRef<View, SlideButtonFillProps>(
  function SlideButtonFill({ style, ...props }, ref) {
    const { fillStyle, offset } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    const width = useAnimatedStyle(() => ({ width: offset.get() }))

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
