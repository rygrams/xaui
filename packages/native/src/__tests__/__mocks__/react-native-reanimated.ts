import React from 'react'

type AnimatedStyle = Record<string, unknown>
type AnimatedStyleFactory<T extends AnimatedStyle = AnimatedStyle> = () => T
type AnimatedPropsFactory<T extends Record<string, unknown> = Record<string, unknown>> =
  () => T

type ViewProps = {
  [key: string]: unknown
}

const flattenStyle = (style: unknown): Record<string, unknown> | undefined => {
  if (Array.isArray(style)) {
    return Object.assign({}, ...style.map(flattenStyle))
  }
  return style as Record<string, unknown>
}

const AnimatedView: React.FC<ViewProps> = props => {
  const { style, ...rest } = props
  const flattenedStyle = flattenStyle(style)
  return React.createElement('div', { ...rest, style: flattenedStyle })
}

const Animated = {
  View: AnimatedView,
  createAnimatedComponent: <T extends Record<string, unknown>>(
    Component: React.ComponentType<T>
  ) => {
    return (props: T & { animatedProps?: Record<string, unknown> }) => {
      const { animatedProps, style, ...rest } = props as T & {
        animatedProps?: Record<string, unknown>
        style?: unknown
      }
      const finalProps = {
        ...rest,
        style: flattenStyle(style),
        ...(animatedProps || {}),
      } as unknown as T
      return React.createElement(Component, finalProps)
    }
  },
}

export const useAnimatedStyle = <T extends AnimatedStyle>(
  factory: AnimatedStyleFactory<T>
): T => factory()

export const useAnimatedProps = <T extends Record<string, unknown>>(
  factory: AnimatedPropsFactory<T>
): T => factory()

export const useSharedValue = <T>(value: T) => ({ value })

export const withTiming = <T>(value: T) => value

export const withSequence = <T>(...args: T[]) => args[args.length - 1]

export const withRepeat = <T>(value: T) => value

export const cancelAnimation = () => {}

export const Easing = {
  bezier: () => () => 0,
  linear: () => 0,
}

export default Animated
