import { useEffect } from 'react'
import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
} from 'react-native-reanimated'
import type { SharedValue } from 'react-native-reanimated'
import { useTramMotion } from '../motion/use-tram-motion'
import { markOpacity, markScale } from './selection-mark'

type SpringingMarkProps = {
  /** The mark's drawing — its place, its shape, its colour. */
  style: StyleProp<ViewStyle>
  isShown: boolean
  /** A vertical scale laid over the arrival: the checkbox's square becoming a bar. */
  scaleY?: SharedValue<number>
  children?: ReactNode
}

/**
 * The mark of a selection control, and how it comes and goes: the checkbox's square, the
 * radio's dot.
 *
 * It grows from the centre on `press` — the firm bounce that answers a finger — and on
 * the way out the same spring reaches nothing in a few frames, where `markScale` stops
 * it. With motion reduced it fades in and out at its full size instead: growing is motion
 * for its own sake.
 */
export function SpringingMark({
  style,
  isShown,
  scaleY,
  children,
}: SpringingMarkProps) {
  const animate = useTramMotion()
  const isReduced = useReducedMotion()
  const presence = useSharedValue(isShown ? 1 : 0)

  useEffect(() => {
    presence.value = animate(isShown ? 1 : 0)
  }, [isShown, animate, presence])

  const arriving = useAnimatedStyle(() => {
    'worklet'
    const stretch = { scaleY: scaleY ? scaleY.value : 1 }

    if (isReduced) {
      return { opacity: markOpacity(presence.value), transform: [stretch] }
    }

    return {
      opacity: 1,
      transform: [{ scale: markScale(presence.value) }, stretch],
    }
  }, [presence, scaleY, isReduced])

  return <Animated.View style={[style, arriving]}>{children}</Animated.View>
}
