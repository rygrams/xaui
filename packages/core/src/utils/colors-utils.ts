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

export const addOpacityToColor = (color: string, opacity: number): string => {
  if (color.startsWith('rgba(')) {
    const inner = color.slice(5, -1)
    const parts = inner.split(',').map(part => part.trim())
    if (parts.length < 3) return color
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`
  }
  if (color.startsWith('rgb(')) {
    const inner = color.slice(4, -1)
    const parts = inner.split(',').map(part => part.trim())
    if (parts.length < 3) return color
    return `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${opacity})`
  }
  const hex = color.replace('#', '')
  if (hex.length < 6) return color
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export type ValidThemeColor = (typeof validThemeColors)[number]
