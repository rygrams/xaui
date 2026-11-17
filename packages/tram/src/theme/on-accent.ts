const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i

/**
 * Above this the fill is light enough that white text washes out. It sits under amber
 * (0.447) so that lime, amber and yellow take black, and above pink (0.358) so that the
 * seventeen others keep the white Metro always used.
 */
const LIGHT_FILL_LUMINANCE = 0.4

function channels(hex: string): [number, number, number] {
  if (!HEX.test(hex)) {
    throw new Error(
      `onAccent: expected a #RGB or #RRGGBB colour, received "${hex}".`
    )
  }
  const digits = hex.slice(1)
  const full =
    digits.length === 3
      ? digits
          .split('')
          .map(digit => digit + digit)
          .join('')
      : digits

  return [0, 2, 4].map(
    start => parseInt(full.slice(start, start + 2), 16) / 255
  ) as [number, number, number]
}

function linear(channel: number): number {
  return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
}

/** WCAG relative luminance, 0 (black) to 1 (white). */
export function relativeLuminance(hex: string): number {
  const [red, green, blue] = channels(hex)
  return 0.2126 * linear(red) + 0.7152 * linear(green) + 0.0722 * linear(blue)
}

/** The text colour that reads on a flat fill of `hex`: black on lime, amber and yellow. */
export function onAccent(hex: string): '#000000' | '#FFFFFF' {
  return relativeLuminance(hex) > LIGHT_FILL_LUMINANCE ? '#000000' : '#FFFFFF'
}
