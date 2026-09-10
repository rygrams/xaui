import { forwardRef } from 'react'
import type { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonFillProps } from './slide-button.type'

/**
 * The trail behind the handle — how far the slide has come, not a state.
 *
 * Optional: compose it for the affordance, leave it out for a bare pill.
 *
 * **Its width is the fraction of the travel the handle has covered, laid over the whole
 * pill — not the handle's raw offset.** The two agree at rest, where both are nothing.
 * They part at the end, and that is the point: the handle comes to rest a handle's width
 * short of the trailing cap, because that is where the handle physically *is*, and a trail
 * that stopped with it left a confirmed slide showing sixty-odd points of unswept pill —
 * reading as almost done at the moment it is done. Spread over the pill, the trail lands
 * full.
 *
 * In between, the trail's leading edge sits under the handle for all but the first and last
 * few points of the drag, so there is no seam to see while the finger is down.
 *
 * Driven on the UI thread; a spring here would let the trail and the handle come apart
 * under the finger.
 */
export const SlideButtonFill = forwardRef<View, SlideButtonFillProps>(
  function SlideButtonFill({ style, ...props }, ref) {
    const { fillStyle, offset, travel, trackLength } = useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    const width = useAnimatedStyle(
      () => ({ width: travel > 0 ? (offset.get() / travel) * trackLength : 0 }),
      [travel, trackLength]
    )

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
