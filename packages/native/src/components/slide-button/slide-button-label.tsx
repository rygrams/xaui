import { forwardRef } from 'react'
import { StyleSheet, Text } from 'react-native'
import Animated, { useAnimatedStyle } from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { sweptWidth } from './slide-button.animation'
import { useSlideButton } from './slide-button.context'
import type { SlideButtonLabelProps } from './slide-button.type'

/**
 * The clip the swept copy lives in: the pill's leading edge out to the trail's edge.
 *
 * It carries no token, only the geometry — an absolutely-placed window whose width the
 * trail drives. `justifyContent` is what centres the copy inside it, the same way the
 * root centres the resting label, so the two lines share a baseline without either of
 * them naming a `top`.
 */
const CLIP = StyleSheet.create({
  window: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    overflow: 'hidden',
    justifyContent: 'center',
  },
})

/**
 * The instruction, centred across the whole pill. The thumb slides over it rather than
 * beside it — there is no gap to keep, because they are not laid out together.
 *
 * **It is drawn twice.** On the four intent variants the pill sweeps from its soft slice
 * to the vivid one, and no single text colour survives that: painted for the soft pill a
 * label reads about 1.3:1 against the vivid trail, painted for the trail it is invisible
 * at rest. So the second copy is painted for the swept ground and clipped to exactly the
 * trail's width — a word the trail is halfway through is dark on the half that is still
 * soft and light on the half that is not. Where a variant names no `fgSelected` both
 * copies resolve to the same colour and the second one costs a `Text` that changes
 * nothing.
 *
 * The clip's width is driven on the UI thread off the same shared offset the trail reads,
 * so the two edges are the same edge and never separate under the finger.
 */
export const SlideButtonLabel = forwardRef<Text, SlideButtonLabelProps>(
  function SlideButtonLabel({ children, style, ...props }, ref) {
    const { labelStyle, labelSweptStyle, offset, travel, trackLength } =
      useSlideButton()
    const [styleProps, rest] = useStyleProps(props)

    // The directive is not decoration. In the published `dist` the bundler renames
    // duplicate imports — `useAnimatedStyle2`, `useAnimatedStyle3` — and the plugin's
    // auto-workletization matches the callee by *name*, so a renamed call site is silently
    // left as a plain function and crashes the first time the UI thread runs it.
    const clip = useAnimatedStyle(() => {
      'worklet'
      return { width: sweptWidth(offset.get(), travel, trackLength) }
    }, [travel, trackLength])

    return (
      <>
        <Text
          ref={ref}
          numberOfLines={1}
          {...rest}
          style={[labelStyle, styleProps, style]}
        >
          {children}
        </Text>
        <Animated.View pointerEvents="none" style={[CLIP.window, clip]}>
          <Text
            numberOfLines={1}
            {...rest}
            // The same words a second time: one label to a screen reader, not two.
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
            style={[labelSweptStyle, styleProps, style]}
          >
            {children}
          </Text>
        </Animated.View>
      </>
    )
  }
)

SlideButtonLabel.displayName = 'XAUI.SlideButton.Label'
