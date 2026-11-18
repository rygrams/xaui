import { forwardRef, useEffect, useRef } from 'react'
import { StyleSheet } from 'react-native'
import type { GestureResponderEvent, LayoutChangeEvent, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { PressableFeedback } from '@xaui/native/system'
import type { PressableFeedbackProps } from '@xaui/native/system'
import { scale, tilt } from '../motion/motion-tokens'
import { useTramMotion } from '../motion/use-tram-motion'
import { leanFor } from './tilt'

const AnimatedFeedback = Animated.createAnimatedComponent(PressableFeedback)

export type PressTiltProps = PressableFeedbackProps & {
  /** How far the box shrinks under the finger — a `scale` token. The `Button`'s by default. */
  depth?: number
}

/**
 * The Tram press: the pressable leans toward the finger and shrinks a little, as if pushed
 * in where it was touched, then springs back. Both run on the `press` spring, so a second
 * touch interrupts the first — or fade, with motion reduced.
 *
 * It is Native's `PressableFeedback` with its own animations off, because that primitive
 * owns `asChild`, the disabled state and the style props; only the movement is Tram's.
 * The `Button` presses this way, and a choice of the `Select`.
 */
export const PressTilt = forwardRef<View, PressTiltProps>(function PressTilt(
  { isPressed = false, depth = scale.press, style, onPressIn, onLayout, ...props },
  ref
) {
  const animate = useTramMotion()
  const box = useRef({ width: 0, height: 0 })
  const rotateX = useSharedValue(0)
  const rotateY = useSharedValue(0)
  const size = useSharedValue(1)

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout
    box.current = { width, height }
    onLayout?.(event)
  }

  // The lean starts here rather than in the effect below: only the touch says where.
  const handlePressIn = (event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent
    const lean = leanFor({ x: locationX, y: locationY }, box.current)
    rotateX.value = animate(lean.rotateX)
    rotateY.value = animate(lean.rotateY)
    size.value = animate(depth)
    onPressIn?.(event)
  }

  // The release follows the state, so a press that ends without a lift — the button
  // turning disabled under the finger — still comes back.
  useEffect(() => {
    if (isPressed) return
    rotateX.value = animate(0)
    rotateY.value = animate(0)
    size.value = animate(1)
  }, [isPressed, animate, rotateX, rotateY, size])

  // The tilt is appended to the caller's own transform rather than replacing it: `style`
  // is the last word, and a button moved with `translateY` must stay where it was put.
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

  return (
    <AnimatedFeedback
      // The animated wrapper types its ref as itself; at runtime it is the host view.
      ref={ref as never}
      isPressed={isPressed}
      // `box-only`: the touch lands on the box, never on the label inside it, so its
      // location is measured from the box's own corner.
      style={[style, BOX_ONLY, tilted]}
      onLayout={handleLayout}
      onPressIn={handlePressIn}
      {...props}
    />
  )
})

const BOX_ONLY = { pointerEvents: 'box-only' } as const

const NO_TRANSFORM: never[] = []

PressTilt.displayName = 'XAUI.Tram.PressTilt'
