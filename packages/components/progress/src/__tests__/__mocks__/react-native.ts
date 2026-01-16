import { vi } from 'vitest'
import React from 'react'

type AccessibilityValue = {
  now?: number
  min?: number
  max?: number
}

type ViewProps = {
  children?: React.ReactNode
  accessible?: boolean
  accessibilityRole?: string
  accessibilityLabel?: string
  accessibilityValue?: AccessibilityValue
  collapsable?: boolean
  style?: Record<string, unknown> | Array<Record<string, unknown>>
  [key: string]: unknown
}

type AnimationConfig = {
  start: ReturnType<typeof vi.fn>
  stop: ReturnType<typeof vi.fn>
}

export const StyleSheet = {
  create: <T,>(styles: T): T => styles,
  absoluteFillObject: {},
}

export const View = ({
  children,
  accessible: _accessible,
  accessibilityRole,
  accessibilityLabel,
  accessibilityValue,
  collapsable: _collapsable,
  ...props
}: ViewProps) => {
  const htmlProps: Record<string, unknown> = { ...props, 'data-testid': 'view' }

  if (accessibilityRole) {
    htmlProps.role = accessibilityRole
  }

  if (accessibilityLabel) {
    htmlProps['aria-label'] = accessibilityLabel
  }

  if (accessibilityValue) {
    htmlProps['aria-valuenow'] = accessibilityValue.now
    htmlProps['aria-valuemin'] = accessibilityValue.min
    htmlProps['aria-valuemax'] = accessibilityValue.max
  }

  return React.createElement('div', htmlProps, children)
}

export const Text = ({ children, ...props }: ViewProps) =>
  React.createElement('span', { ...props, 'data-testid': 'text' }, children)

export const TouchableOpacity = ({ children, ...props }: ViewProps) =>
  React.createElement('button', { ...props, 'data-testid': 'touchable' }, children)

export const Pressable = ({ children, ...props }: ViewProps) =>
  React.createElement('button', { ...props, 'data-testid': 'pressable' }, children)

export const useColorScheme = vi.fn(() => 'light')

export const Platform = {
  OS: 'ios' as const,
  select: <T,>(obj: Record<string, T>): T | undefined => obj.ios || obj.default,
}

export const Easing = {
  linear: vi.fn(),
  bezier: vi.fn(() => vi.fn()),
  ease: vi.fn(),
  inOut: vi.fn((_easing: unknown) => vi.fn()),
}

class MockAnimatedValue {
  constructor(public value: number) {}
  setValue = vi.fn((value: number) => {
    this.value = value
  })
  stopAnimation = vi.fn()
  interpolate = vi.fn(() => new MockAnimatedValue(0))
}

const AnimatedView = ({
  children,
  accessible: _accessible,
  accessibilityRole,
  accessibilityLabel,
  accessibilityValue,
  collapsable: _collapsable,
  ...props
}: ViewProps) => {
  const htmlProps: Record<string, unknown> = { ...props, 'data-testid': 'animated-view' }

  if (accessibilityRole) {
    htmlProps.role = accessibilityRole
  }

  if (accessibilityLabel) {
    htmlProps['aria-label'] = accessibilityLabel
  }

  if (accessibilityValue) {
    htmlProps['aria-valuenow'] = accessibilityValue.now
    htmlProps['aria-valuemin'] = accessibilityValue.min
    htmlProps['aria-valuemax'] = accessibilityValue.max
  }

  return React.createElement('div', htmlProps, children)
}

export const Animated = {
  Value: MockAnimatedValue,
  View: AnimatedView,
  timing: vi.fn((): AnimationConfig => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  loop: vi.fn((_animation: AnimationConfig): AnimationConfig => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  sequence: vi.fn((_animations: AnimationConfig[]): AnimationConfig => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  delay: vi.fn((_duration: number): AnimationConfig => ({
    start: vi.fn(),
    stop: vi.fn(),
  })),
  createAnimatedComponent: vi.fn((_component: unknown) => {
    return ({ children, ...props }: ViewProps) =>
      React.createElement('div', { ...props, 'data-testid': 'animated-component' }, children)
  }),
}
