import { vi } from 'vitest'

export const StyleSheet = {
  create: <T,>(styles: T): T => styles,
}

export const View = 'View'
export const Text = 'Text'
export const Pressable = 'Pressable'
export const ScrollView = 'ScrollView'
export const Animated = {
  View: 'Animated.View',
  timing: vi.fn(() => ({
    start: vi.fn(),
  })),
  parallel: vi.fn(() => ({
    start: vi.fn(),
  })),
  Value: vi.fn(() => ({
    setValue: vi.fn(),
  })),
}

export const Easing = {
  ease: vi.fn(),
  out: vi.fn((fn) => fn),
}

export const useColorScheme = vi.fn(() => 'light')

export const Platform = {
  OS: 'ios',
  select: <T,>(obj: Record<string, T>): T | undefined => obj.ios || obj.default,
}
