import { forwardRef } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { useProgressBar } from './progress-bar.context'
import type { ProgressBarFillProps } from './progress-bar.type'

/**
 * Long enough to read as movement, short enough that a value arriving every few hundred
 * milliseconds is never waiting on the last one. The `ProgressCircle`'s arc uses the same
 * number, because two progress indicators on one screen moving at two speeds is a bug
 * nobody files and everybody sees.
 */
const DURATION = 240

/**
 * How much of the rail is behind you.
 *
 * It is a **child that grows**, not a layer over the rail: the rail clips, so one `radius`
 * rounds both and the fill cannot escape the corner at 100%.
 *
 * The width animates, because a bar that jumps is a bar you cannot see move — a download
 * reporting every 5% would otherwise render as eight still frames. `animation={false}`
 * turns it off for a value the caller is already animating itself.
 */
export const ProgressBarFill = forwardRef<View, ProgressBarFillProps>(
  function ProgressBarFill({ animation = true, style, ...props }, ref) {
    const { fillStyle, fraction } = useProgressBar()
    const [styleProps, rest] = useStyleProps(props)
    const merged = [fillStyle, styleProps, style]

    // Two components rather than a branch inside one: hooks cannot be conditional, and
    // "no animation" is only true if the Reanimated hooks are never reached.
    if (!animation) {
      return <View ref={ref} {...rest} style={[merged, widthOf(fraction)]} />
    }

    return <AnimatedFill ref={ref} {...rest} fraction={fraction} style={merged} />
  }
)

ProgressBarFill.displayName = 'XAUI.ProgressBar.Fill'

/** A percentage rather than a measured width, so the fill needs no layout pass to be right. */
function widthOf(fraction: number): ViewStyle {
  return { width: `${fraction * 100}%` }
}

type AnimatedFillProps = Omit<ProgressBarFillProps, 'animation' | 'style'> & {
  fraction: number
  style: StyleProp<ViewStyle>
}

const AnimatedFill = forwardRef<View, AnimatedFillProps>(function AnimatedFill(
  { fraction, style, ...rest },
  ref
) {
  // `useDerivedValue` rather than an assignment in an effect: the timing starts on the UI
  // thread the frame the prop changes, instead of waiting for a commit to schedule it.
  const progress = useDerivedValue(() => {
    'worklet'
    return withTiming(fraction, { duration: DURATION })
  }, [fraction])

  const animatedStyle = useAnimatedStyle(() => {
    'worklet'
    return { width: `${progress.value * 100}%` }
  }, [progress])

  return <Animated.View ref={ref} {...rest} style={[style, animatedStyle]} />
})
