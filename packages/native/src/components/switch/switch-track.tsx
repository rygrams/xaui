import { forwardRef } from 'react'
import { View } from 'react-native'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useSwitch } from './switch.context'
import { SWITCH_DURATION } from './switch.style'
import type { SwitchTrackProps } from './switch.type'

/**
 * The bar the knob slides on, and the surface that says on or off.
 *
 * ```tsx
 * <Switch.Track>
 *   <Switch.Thumb />
 * </Switch.Track>
 * ```
 *
 * Its colour is **crossed rather than swapped**: the two ends are values on the context
 * and `interpolateColor` walks between them on the UI thread, which is what makes a flip
 * read as one movement together with the knob rather than as a repaint under it.
 *
 * It never clips. On `secondary` the thumb stands outside the track, and `overflow:
 * hidden` would cut the knob in half rather than let it overlap.
 */
export const SwitchTrack = forwardRef<View, SwitchTrackProps>(function SwitchTrack(
  { children, animation = true, style, ...props },
  ref
) {
  const { trackStyle, track, isSelected } = useSwitch()
  const [styleProps, rest] = useStyleProps(props)

  const base = [trackStyle, styleProps, style]

  // Two components rather than a branch inside one: hooks cannot be conditional, and "no
  // animation" is only true if the Reanimated hooks are never reached.
  if (!animation) {
    return (
      <View
        ref={ref}
        {...rest}
        style={[base, { backgroundColor: isSelected ? track.on : track.off }]}
      >
        {children}
      </View>
    )
  }

  return (
    <CrossfadingTrack
      ref={ref}
      style={base}
      colors={track}
      isSelected={isSelected}
      {...rest}
    >
      {children}
    </CrossfadingTrack>
  )
})

SwitchTrack.displayName = 'XAUI.Switch.Track'

const CrossfadingTrack = forwardRef<
  View,
  {
    style: StyleProp<ViewStyle>
    colors: { off: string; on: string }
    isSelected: boolean
    children?: ReactNode
  }
>(function CrossfadingTrack({ style, colors, isSelected, children, ...rest }, ref) {
  // `useDerivedValue` rather than an assignment in an effect: the timing starts on the UI
  // thread the frame the prop changes, instead of waiting for a commit to schedule it.
  const progress = useDerivedValue(
    () => withTiming(isSelected ? 1 : 0, { duration: SWITCH_DURATION }),
    [isSelected]
  )

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        [colors.off, colors.on]
      ),
    }
  }, [progress, colors.off, colors.on])

  return (
    <Animated.View ref={ref} {...rest} style={[style, animatedStyle]}>
      {children}
    </Animated.View>
  )
})
