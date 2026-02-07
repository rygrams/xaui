import { colors } from '../tokens'

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

export type PaletteNumber =
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950
type PaletteScale = Exclude<(typeof colors)[keyof typeof colors], string>
type RGB = [number, number, number]

const normalizeHexColor = (color: string): string => {
  const normalized = color.trim().toLowerCase()
  if (!normalized.startsWith('#')) return normalized

  if (normalized.length === 9) return normalized.slice(0, 7)
  if (normalized.length === 5) {
    const [r, g, b] = normalized.slice(1, 4).split('')
    return `#${r}${r}${g}${g}${b}${b}`
  }
  return normalized
}

const colorPalettes = Object.values(colors).filter(
  (value): value is PaletteScale => typeof value === 'object' && value !== null
)

const hexToRgb = (color: string): RGB | null => {
  const normalized = normalizeHexColor(color)
  if (!normalized.startsWith('#') || normalized.length !== 7) return null

  const r = parseInt(normalized.slice(1, 3), 16)
  const g = parseInt(normalized.slice(3, 5), 16)
  const b = parseInt(normalized.slice(5, 7), 16)

  return Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) ? null : [r, g, b]
}

const colorDistance = (a: RGB, b: RGB): number => {
  const dr = a[0] - b[0]
  const dg = a[1] - b[1]
  const db = a[2] - b[2]
  return dr * dr + dg * dg + db * db
}

/**
 * Create opacity variants for a color
 * @param color - Base color hex
 * @param paletteNumber - Palette number (50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950)
 * @returns Color from matched (or nearest) palette family at the requested palette number
 */
export function withPaletteNumber(
  color: string,
  paletteNumber: PaletteNumber
): string {
  const normalizedInput = normalizeHexColor(color)
  const inputRgb = hexToRgb(normalizedInput)

  if (!inputRgb) return color

  const exactPalette = colorPalettes.find(scale =>
    Object.values(scale).some(
      scaleColor => normalizeHexColor(scaleColor) === normalizedInput
    )
  )

  if (exactPalette) return exactPalette[paletteNumber]

  let nearestPalette: PaletteScale | null = null
  let nearestDistance = Number.POSITIVE_INFINITY

  for (const palette of colorPalettes) {
    for (const swatch of Object.values(palette)) {
      const swatchRgb = hexToRgb(swatch)
      if (!swatchRgb) continue

      const distance = colorDistance(inputRgb, swatchRgb)
      if (distance < nearestDistance) {
        nearestDistance = distance
        nearestPalette = palette
      }
    }
  }

  return nearestPalette ? nearestPalette[paletteNumber] : color
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
