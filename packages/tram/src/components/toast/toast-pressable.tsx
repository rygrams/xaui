import { forwardRef } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import type { GestureResponderEvent, View, ViewProps } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { scale } from '../../motion/motion-tokens'
import { useTramMotion } from '../../motion/use-tram-motion'
import { useTramHaptic } from '../../theme/tram-haptics'

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type ToastPressableProps = ViewProps & {
  onPress: (event: GestureResponderEvent) => void
  /** `true` under an ancestor's `disable-all`: the size is set, not sprung. */
  isStill: boolean
}

/**
 * The box of a toast that answers a touch: it shrinks a little under the finger, on the
 * `press` spring, and comes back. No tilt — the toast is as wide as the screen, and a bar
 * that leans reads as one that is leaving. The colours do not move.
 *
 * Not one accessible element: the actions inside it have to stay reachable, so the press
 * is offered to a screen reader from the toast's text instead.
 */
export const ToastPressable = forwardRef<View, ToastPressableProps>(
  function ToastPressable({ isStill, style, ...props }, ref) {
    const animate = useTramMotion()
    const haptic = useTramHaptic()
    const size = useSharedValue(1)

    const settle = (to: number) => {
      size.value = isStill ? to : animate(to)
    }

    // Appended to the caller's own transform rather than replacing it, as the tilt is.
    const placed = StyleSheet.flatten(style)?.transform
    const own = Array.isArray(placed) ? placed : NO_TRANSFORM

    const pressed = useAnimatedStyle(() => {
      'worklet'
      return { transform: [...own, { scale: size.value }] }
    }, [own, size])

    return (
      <AnimatedPressable
        // The animated wrapper types its ref as itself; at runtime it is the host view.
        ref={ref as never}
        accessible={false}
        {...props}
        style={[style, pressed]}
        // Felt as the finger lands, with the movement.
        onPressIn={() => {
          haptic('press')
          settle(scale.press)
        }}
        onPressOut={() => settle(1)}
      />
    )
  }
)

const NO_TRANSFORM: never[] = []

ToastPressable.displayName = 'XAUI.Tram.Toast.Pressable'
