import type { ColorMode, XAUITheme } from './theme.type'

export type XAUIAppearance = {
  colorMode: ColorMode
  barContent: ColorMode
  statusBarStyle: 'light-content' | 'dark-content'
  background: string
  foreground: string
  border: string
}

export function appearanceFor(theme: XAUITheme): XAUIAppearance {
  const barContent: ColorMode = theme.mode === 'dark' ? 'light' : 'dark'
  return {
    colorMode: theme.mode,
    barContent,
    statusBarStyle: barContent === 'light' ? 'light-content' : 'dark-content',
    background: theme.colors.background,
    foreground: theme.colors.foreground,
    border: theme.colors.border,
  }
}
