import { vi } from 'vitest'

export const StyleSheet = {
  create: <T>(styles: T): T => styles,
}

export const View = 'View'
export const Text = 'Text'
export const Pressable = 'Pressable'

export const useColorScheme = vi.fn(() => 'light')

export const Platform = {
  OS: 'ios',
  select: <T>(obj: Record<string, T>): T | undefined => obj.ios || obj.default,
}

export const Animated = {
  View: 'Animated.View',
  Value: class AnimatedValue {
    constructor(public value: number) {}
  },
  timing: vi.fn(() => ({
    start: vi.fn(),
  })),
  spring: vi.fn(() => ({
    start: vi.fn(),
  })),
  parallel: vi.fn(() => ({
    start: vi.fn(),
  })),
  createAnimatedComponent: (component: unknown) => component,
}
