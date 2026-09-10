import { forwardRef } from 'react'
import { View } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { sweptWidth } from './slide-button.animation'
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
 * It is drawn inside a window cut to the pill's shape, because its own corner cannot be:
 * `radius.full` is clamped to half the shorter side, so while the trail is narrower than
 * the pill is tall it draws a squarer corner than the pill's and shows outside it. The
 * window is here rather than on the root so that the cut lands on the trail alone and not
 * on the handle's shadow.
 *
 * Driven on the UI thread; a spring here would let the trail and the handle come apart
 * under the finger.
 */
export const SlideButtonFill = forwardRef<View, SlideButtonFillProps>(
  function SlideButtonFill({ style, ...props }, ref) {
    const { fillClipStyle, fillStyle, offset, travel, trackLength } =
      useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    // The directive is not decoration. In the published `dist` the bundler renames
    // duplicate imports — `useAnimatedStyle2`, `useAnimatedStyle3` — and the plugin's
    // auto-workletization matches the callee by *name*, so a renamed call site is silently
    // left as a plain function and crashes the first time the UI thread runs it.
    const width = useAnimatedStyle(() => {
      'worklet'
      return { width: sweptWidth(offset.get(), travel, trackLength) }
    }, [travel, trackLength])

    // `box-none` and not `none`: the window is a cut, not a lid — it must not catch a touch
    // itself, but anything a caller hangs on the trail still has to receive one.
    return (
      <View pointerEvents="box-none" style={fillClipStyle}>
        <Animated.View
          ref={ref}
          {...rest}
          style={[fillStyle, width, styleProps, style]}
        />
      </View>
    )
  }
)

SlideButtonFill.displayName = 'XAUI.SlideButton.Fill'
