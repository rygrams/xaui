export const useColorScheme = () => 'light' as 'light' | 'dark' | null | undefined

export const Platform = {
  OS: 'ios' as const,
  select: <T>(obj: Record<string, T>): T | undefined => obj.ios || obj.default,
}

export const StyleSheet = {
  create: <T extends Record<string, unknown>>(styles: T): T => styles,
}
