import { vi } from 'vitest'

export const StyleSheet = {
  create: <T,>(styles: T): T => styles,
}

export const View = 'View'
export const Text = 'Text'
export const TouchableOpacity = 'TouchableOpacity'
export const Pressable = 'Pressable'

export const useColorScheme = vi.fn(() => 'light')

export const Platform = {
  OS: 'ios',
  select: <T,>(obj: Record<string, T>): T | undefined => obj.ios || obj.default,
}
