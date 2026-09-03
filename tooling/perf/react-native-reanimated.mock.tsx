import { useRef } from 'react'
import type { ComponentType } from 'react'
import { View } from './react-native.mock'

/**
 * Reanimated, reduced to the shape the components import.
 *
 * The baseline is measured with `animation={false}`, which routes every component down
 * its static branch and reaches none of these hooks — that is the point of that branch,
 * and it is asserted rather than assumed. They exist because the modules import them at
 * the top level, not because the measurement runs them.
 */

export function useSharedValue<T>(initial: T) {
  const ref = useRef({ value: initial })
  return ref.current
}

export function useAnimatedStyle(build: () => object): object {
  return build()
}

export function useAnimatedReaction(): void {}

export function withTiming<T>(to: T): T {
  return to
}

export function withRepeat<T>(value: T): T {
  return value
}

export function withDelay<T>(_delay: number, value: T): T {
  return value
}

export function cancelAnimation(): void {}

export function interpolate(value: number): number {
  return value
}

const identity = (t: number) => t

export const Easing = {
  linear: identity,
  ease: identity,
  out: () => identity,
}

const Animated = {
  View,
  createAnimatedComponent: <P,>(Component: ComponentType<P>) => Component,
}

export default Animated
