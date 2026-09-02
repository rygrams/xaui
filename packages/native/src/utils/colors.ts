export type Rgb = [number, number, number]
export type Oklab = [number, number, number]

const srgbToLinear = (c: number) =>
  c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4

const linearToSrgb = (c: number) =>
  c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055

const clamp01 = (n: number) => Math.min(1, Math.max(0, n))

const HEX = /^#?(?:[0-9a-f]{3}|[0-9a-f]{6})$/i

export function hexToRgb(hex: string): Rgb {
  if (!HEX.test(hex)) {
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
          .map(c => c + c)
          .join('')
      : raw
  return [
    parseInt(full.slice(0, 2), 16) / 255,
    parseInt(full.slice(2, 4), 16) / 255,
    parseInt(full.slice(4, 6), 16) / 255,
  ]
}

export function rgbToHex([r, g, b]: Rgb): string {
  const to = (n: number) =>
    Math.round(clamp01(n) * 255)
      .toString(16)
      .padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

export function rgbToOklab([r, g, b]: Rgb): Oklab {
  const R = srgbToLinear(r)
  const G = srgbToLinear(g)
  const B = srgbToLinear(b)
  const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B)
  const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B)
  const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B)
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ]
}

export function oklabToRgb([L, a, b]: Oklab): Rgb {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    clamp01(linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
    clamp01(linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
    clamp01(linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
  ]
}

/** `oklch()` from the design source, converted once — React Native cannot parse it. */
export function oklchToHex(
  lightness: number,
  chroma: number,
  hueDeg: number
): string {
  const h = (hueDeg * Math.PI) / 180
  return rgbToHex(
    oklabToRgb([lightness, chroma * Math.cos(h), chroma * Math.sin(h)])
  )
}

/**
 * `color-mix(in oklab, base (1 - amount), other amount)`.
 * Mixing in OKLab rather than sRGB is what keeps blends from turning grey.
 */
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

/** `color-mix(in oklab, colour X%, transparent)` — RN needs the rgba() form. */
export function alpha(hex: string, amount: number): string {
  const [r, g, b] = hexToRgb(hex).map(v => Math.round(v * 255))
  return `rgba(${r}, ${g}, ${b}, ${amount})`
}

export function lightnessOf(hex: string): number {
  return rgbToOklab(hexToRgb(hex))[0]
}

/** Picks the readable text colour on `hex` between two primitives. */
export function contrastOn(hex: string, light: string, dark: string): string {
  return lightnessOf(hex) > 0.62 ? dark : light
}

function relativeLuminance(hex: string): number {
  const [r, g, b] = hexToRgb(hex).map(srgbToLinear)
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/** WCAG 2.x contrast ratio, 1 to 21. Used by the CI contrast guard. */
export function contrastRatio(a: string, b: string): number {
  const l1 = relativeLuminance(a)
  const l2 = relativeLuminance(b)
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1]
  return (hi + 0.05) / (lo + 0.05)
}
