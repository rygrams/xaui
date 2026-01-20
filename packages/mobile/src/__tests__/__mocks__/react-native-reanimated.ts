import React from 'react'

type AnimatedStyle = Record<string, unknown>
type AnimatedStyleFactory<T extends AnimatedStyle = AnimatedStyle> = () => T
type AnimatedPropsFactory<T extends Record<string, unknown> = Record<string, unknown>> = () => T

type ViewProps = {
  [key: string]: unknown
}

const AnimatedView: React.FC<ViewProps> = props => React.createElement('div', props)

const Animated = {
  View: AnimatedView,
  createAnimatedComponent: <T,>(Component: React.ComponentType<T>) => Component,
}

export const useAnimatedStyle = <T extends AnimatedStyle>(
  factory: AnimatedStyleFactory<T>
): T => factory()

export const useAnimatedProps = <T extends Record<string, unknown>>(
  factory: AnimatedPropsFactory<T>
): T => factory()

export const useSharedValue = <T>(value: T) => ({ value })

export const withTiming = <T>(value: T) => value

export const Easing = {
  bezier: () => () => 0,
}

export default Animated
