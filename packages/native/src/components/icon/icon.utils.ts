import type { ThemeColor } from '../../types'

export const isThemeColor = (color: string): color is ThemeColor => {
  const themeColors: ThemeColor[] = [
    'primary',
    'secondary',
    'tertiary',
    'danger',
    'warning',
    'success',
    'default',
  ]
  return themeColors.includes(color as ThemeColor)
}
