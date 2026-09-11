export type Rgb = [number, number, number]
export type Oklab = [number, number, number]

const srgbToLinear = (channel: number) =>
  channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4

const linearToSrgb = (channel: number) =>
  channel <= 0.0031308 ? 12.92 * channel : 1.055 * channel ** (1 / 2.4) - 0.055

const clamp01 = (value: number) => Math.min(1, Math.max(0, value))
const HEX = /^#?(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

export function isHex(value: string): boolean {
  return HEX.test(value)
}

export function hexToRgb(hex: string): Rgb {
  if (!isHex(hex)) {
    throw new Error(
      `XAUI: "${hex}" is not a hex colour. Tokens that feed mix() and alpha() must be ` +
        '#rgb or #rrggbb — named colours and rgb()/rgba() values cannot be blended.'
    )
  }
  const raw = hex.replace('#', '')
  const full =
    raw.length === 3
      ? raw
          .split('')
          .map(character => character + character)
          .join('')
      : raw
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ]
}

export function rgbToHex([red, green, blue]: Rgb): string {
  const channel = (value: number) =>
    Math.round(clamp01(value) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${channel(red)}${channel(green)}${channel(blue)}`
}

export function rgbToOklab([red, green, blue]: Rgb): Oklab {
  const linearRed = srgbToLinear(red)
  const linearGreen = srgbToLinear(green)
  const linearBlue = srgbToLinear(blue)
  const l = Math.cbrt(
    0.4122214708 * linearRed + 0.5363325363 * linearGreen + 0.0514459929 * linearBlue
  )
  const m = Math.cbrt(
    0.2119034982 * linearRed + 0.6806995451 * linearGreen + 0.1073969566 * linearBlue
  )
  const s = Math.cbrt(
    0.0883024619 * linearRed + 0.2817188376 * linearGreen + 0.6299787005 * linearBlue
  )
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

export function oklabToRgb([lightness, a, b]: Oklab): Rgb {
  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    clamp01(linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    clamp01(linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    clamp01(linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  ]
}

export function oklchToHex(
  lightness: number,
  chroma: number,
  hueDegrees: number
): string {
  const hue = (hueDegrees * Math.PI) / 180
  return rgbToHex(
    oklabToRgb([lightness, chroma * Math.cos(hue), chroma * Math.sin(hue)])
  )
}

export function mix(base: string, other: string, amount: number): string {
  const from = rgbToOklab(hexToRgb(base))
  const to = rgbToOklab(hexToRgb(other))
  return rgbToHex(
    oklabToRgb([
      from[0] + (to[0] - from[0]) * amount,
      from[1] + (to[1] - from[1]) * amount,
      from[2] + (to[2] - from[2]) * amount,
    ])
  )
}

export function alpha(hex: string, amount: number): string {
  const [red, green, blue] = hexToRgb(hex).map(value => Math.round(value * 255))
  return `rgba(${red}, ${green}, ${blue}, ${amount})`
}

export function lightnessOf(hex: string): number {
  return rgbToOklab(hexToRgb(hex))[0]
}

export function contrastOn(hex: string, light: string, dark: string): string {
  return lightnessOf(hex) > 0.62 ? dark : light
}

function relativeLuminance(hex: string): number {
  const [red, green, blue] = hexToRgb(hex).map(srgbToLinear)
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

export function contrastRatio(a: string, b: string): number {
  const first = relativeLuminance(a)
  const second = relativeLuminance(b)
  const [high, low] = first > second ? [first, second] : [second, first]
  return (high + 0.05) / (low + 0.05)
}
