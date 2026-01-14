export const useColorScheme = () => 'light' as 'light' | 'dark' | null | undefined

export const Platform = {
  OS: 'ios' as const,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  select: (obj: any) => obj.ios || obj.default,
}

export const StyleSheet = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: <T extends Record<string, any>>(styles: T): T => styles,
}
