/**
 * Create opacity variants for a color
 * @param color - Base color hex
 * @param opacity - Opacity value (0-1)
 * @returns Color with opacity
 */
export function withOpacity(color: string, opacity: number): string {
  const clampedOpacity = Math.max(0, Math.min(1, opacity))
  const alpha = Math.round(clampedOpacity * 255)
    .toString(16)
    .padStart(2, '0')
  return `${color}${alpha}`
}

const validThemeColors = [
  'primary',
  'secondary',
  'tertiary',
  'danger',
  'warning',
  'success',
  'default',
] as const

export function getSafeThemeColor(themeColor: string): ValidThemeColor {
  return validThemeColors.includes(themeColor as ValidThemeColor)
    ? (themeColor as ValidThemeColor)
    : 'primary'
}

export type ValidThemeColor = (typeof validThemeColors)[number]
