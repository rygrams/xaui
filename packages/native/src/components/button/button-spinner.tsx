import { useEffect } from 'react'
import { View } from 'react-native'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  Easing,
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { useButton } from './button.context'
import type { ButtonSpinnerProps } from './button.type'

/** One turn. Slow enough to read as waiting, fast enough not to read as stuck. */
const ROTATION_DURATION = 800

/**
 * The busy indicator. `isLoading` inserts one when none is composed, so
 * `<Button isLoading>Envoi…</Button>` works; composing it explicitly is how you put it
 * after the label instead of before it.
 *
 * A ring rather than RN's `ActivityIndicator`: the recipe owns its diameter and its
 * colour like every other measurement, which is what makes it follow the button's `size`
 * and its variant with nothing to pass. P3 extracts it into the standalone `Spinner`, and
 * this slot becomes its call site.
 */
export function ButtonSpinner({ style, animation = true }: ButtonSpinnerProps) {
  const { spinnerStyle } = useButton()

  // Two components rather than a branch inside one: hooks cannot be conditional, and
  // "no animation" is only true if the Reanimated hooks are never reached.
  if (!animation) return <View style={[spinnerStyle, style]} />

  return <SpinningRing style={[spinnerStyle, style]} />
}

ButtonSpinner.displayName = 'XAUI.Button.Spinner'

function SpinningRing({ style }: { style: StyleProp<ViewStyle> }) {
  const angle = useSharedValue(0)

  useEffect(() => {
    angle.value = withRepeat(
      withTiming(360, { duration: ROTATION_DURATION, easing: Easing.linear }),
      -1,
      false
    )
    // A repeat with no end runs until something stops it, and unmounting the button is
    // not by itself that something.
    return () => cancelAnimation(angle)
  }, [angle])

  const animatedStyle = useAnimatedStyle(
    () => ({ transform: [{ rotate: `${angle.value}deg` }] }),
    [angle]
  )

  return <Animated.View style={[style, animatedStyle]} />
}
