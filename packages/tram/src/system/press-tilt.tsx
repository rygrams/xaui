import { forwardRef, useCallback, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import type {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PressableFeedback } from '@xaui/native/system'
import type { PressableFeedbackProps } from '@xaui/native/system'
import { scale, tilt } from '../motion/motion-tokens'
import { useTramMotion } from '../motion/use-tram-motion'
import { leanFor } from './tilt'
import type { Box, Point } from './tilt'

const AnimatedFeedback = Animated.createAnimatedComponent(PressableFeedback)

export type PressTiltProps = PressableFeedbackProps & {
  /** How far the box shrinks under the finger — a `scale` token. The `Button`'s by default. */
  depth?: number
  /**
   * An animated style of the caller's — a toggle's colours — laid beside the tilt. Kept
   * out of `style`, which is read for its transform, and an animated style cannot be.
   */
  animatedStyle?: StyleProp<ViewStyle>
}

/**
 * The tilt itself, apart from what is pressed: `lean` sends the box toward a point of
 * it, `settle` brings it back flat, and `style` is the transform to put on it — appended
 * to the `own` one, which is the caller's and stays where it was put.
 *
 * Both run on the `press` spring, so a second touch interrupts the first — or fade, with
 * motion reduced. `PressTilt` leans the pressable that was touched; a `ToggleButton.Group`
 * leans the whole of its box when one of its buttons is.
 */
export function usePressLean(depth: number, style: StyleProp<ViewStyle>) {
  const animate = useTramMotion()
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const size = useSharedValue(1)

  const lean = useCallback(
    (touch: Point, box: Box) => {
      const toward = leanFor(touch, box)
      rotateX.value = animate(toward.rotateX)
      rotateY.value = animate(toward.rotateY)
      size.value = animate(depth)
    },
    [animate, depth, rotateX, rotateY, size]
  )

  const settle = useCallback(() => {
    rotateX.value = animate(0)
    rotateY.value = animate(0)
    size.value = animate(1)
  }, [animate, rotateX, rotateY, size])

  const placed = StyleSheet.flatten(style)?.transform
  const own = Array.isArray(placed) ? placed : NO_TRANSFORM

  const tilted = useAnimatedStyle(() => {
    'worklet'
    return {
      transform: [
        ...own,
        { perspective: tilt.perspective },
        { rotateX: `${rotateX.value}deg` },
        { rotateY: `${rotateY.value}deg` },
        { scale: size.value },
      ],
    }
  }, [own, rotateX, rotateY, size])

  return { lean, settle, style: tilted }
}

/**
 * The Tram press: the pressable leans toward the finger and shrinks a little, as if pushed
 * in where it was touched, then springs back.
 *
 * It is Native's `PressableFeedback` with its own animations off, because that primitive
 * owns `asChild`, the disabled state and the style props; only the movement is Tram's.
 * The `Button` presses this way, a choice of the `Select`, and a `ToggleButton` alone.
 */
export const PressTilt = forwardRef<View, PressTiltProps>(function PressTilt(
  {
    isPressed = false,
    depth = scale.press,
    animatedStyle,
    style,
    onPressIn,
    onLayout,
    ...props
  },
  ref
) {
  const box = useRef({ width: 0, height: 0 })
  // The tilt is appended to the caller's own transform rather than replacing it: `style`
  // is the last word, and a button moved with `translateY` must stay where it was put.
  const motion = usePressLean(depth, style as StyleProp<ViewStyle>)
  const { lean, settle } = motion

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    box.current = { width, height }
    onLayout?.(event)
  }

  // The lean starts here rather than in the effect below: only the touch says where.
  const handlePressIn = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent
    lean({ x: locationX, y: locationY }, box.current)
    onPressIn?.(event)
  }

  // The release follows the state, so a press that ends without a lift — the button
  // turning disabled under the finger — still comes back.
  useEffect(() => {
    if (!isPressed) settle()
  }, [isPressed, settle])

  return (
    <AnimatedFeedback
      // The animated wrapper types its ref as itself; at runtime it is the host view.
      ref={ref as never}
      isPressed={isPressed}
      // `box-only`: the touch lands on the box, never on the label inside it, so its
      // location is measured from the box's own corner.
      style={[style, BOX_ONLY, animatedStyle, motion.style]}
      onLayout={handleLayout}
      onPressIn={handlePressIn}
      {...props}
    />
  )
})

const BOX_ONLY = { pointerEvents: 'box-only' } as const

const NO_TRANSFORM: never[] = []

PressTilt.displayName = 'XAUI.Tram.PressTilt'
