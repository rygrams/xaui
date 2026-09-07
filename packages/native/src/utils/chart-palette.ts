import { hexToRgb, isHex, oklabToRgb, rgbToHex, rgbToOklab } from './colors'
import type { Oklab } from './colors'

/**
 * How far the ramp travels in OKLab lightness, from the darkest series to the lightest.
 *
 * A **span**, not a step: the number of series is only known at the call site, so a fixed
 * step would put two series almost on top of each other at six and off the end of the scale
 * at three. Spreading a fixed span across however many there are keeps the gap between
 * neighbours as wide as the data allows.
 */
const SPAN = 0.34

/** Never black, never white: either end of the scale stops being a colour. */
const MIN_LIGHTNESS = 0.34
const MAX_LIGHTNESS = 0.84

/**
 * How close the chroma search gets before it stops. Half a percent is below what an 8-bit
 * channel can express, so a finer answer would round to the same colour.
 */
const CHROMA_EPSILON = 0.005

/**
 * `count` colours for `count` series, walked out of one.
 *
 * **A ramp rather than a wheel**, and that is the design: a chart's series are usually the
 * same quantity split — organic and paid traffic, mobile and desktop — so shades of one
 * colour say "parts of a whole" where a rainbow says "unrelated things". It is also the only
 * scheme that survives a caller changing the accent, because there is nothing to change but
 * the seed.
 *
 * The walk is in **OKLab lightness**, which is perceptual: equal steps look equally far
 * apart, where equal steps in sRGB crowd at the dark end. Chroma and hue are untouched, so
 * every series is recognisably the seed colour.
 *
 * The seed keeps its own place in the ramp rather than sitting at one end — a two-series
 * chart drawn from the accent should still contain the accent.
 */
export function chartPalette(seed: string, count: number): string[] {
  const size = Math.max(Math.floor(count), 0)
  if (size === 0) return []
  // A colour we cannot read is a colour we cannot walk: hand back the seed as many times as
  // asked rather than a row of black, which is what parsing failure would otherwise draw.
  if (!isHex(seed)) return Array.from({ length: size }, () => seed)
  if (size === 1) return [seed]

  const [L, a, b] = rgbToOklab(hexToRgb(seed))

  // Centred on the seed, then clamped as a whole: shifting the window keeps the spacing
  // even, where clamping each entry would pile several of them onto the same end stop.
  const half = SPAN / 2
  const shift = Math.min(
    Math.max(0, MIN_LIGHTNESS - (L - half)),
    // The second `Math.max` is the case where the span is wider than the scale allows;
    // there the window fills it and the clamp below does the rest.
    Math.max(0, MAX_LIGHTNESS - MIN_LIGHTNESS - SPAN)
  )
  const start = L - half + shift - Math.max(0, L + half + shift - MAX_LIGHTNESS)

  return Array.from({ length: size }, (_, index) => {
    const lightness = clamp(start + (SPAN * index) / (size - 1))
    return rgbToHex(oklabToRgb(inGamut(lightness, a, b)))
  })
}

function clamp(lightness: number): number {
  return Math.min(Math.max(lightness, MIN_LIGHTNESS), MAX_LIGHTNESS)
}

/**
 * The same hue at that lightness, with **chroma reduced until sRGB can hold it**.
 *
 * No sRGB colour holds a deep blue's chroma at 84% lightness, and something has to give.
 * `oklabToRgb` clamps each channel, which gives away the hue: the channel that overflowed
 * stops moving while the others keep going, and a blue drifts several degrees towards cyan
 * across a ramp. Pulling chroma in instead keeps the angle exactly and gives away only
 * saturation — which is what a lighter shade of one colour is anyway.
 *
 * A binary search rather than a formula, because the sRGB gamut's boundary in OKLab has no
 * closed form. Eight or nine passes over three multiplications is nothing next to the
 * conversions either side of it.
 */
function inGamut(lightness: number, a: number, b: number): Oklab {
  if (fitsInGamut(lightness, a, b)) return [lightness, a, b]

  let low = 0
  let high = 1

  while (high - low > CHROMA_EPSILON) {
    const mid = (low + high) / 2
    if (fitsInGamut(lightness, a * mid, b * mid)) low = mid
    else high = mid
  }

  return [lightness, a * low, b * low]
}

/**
 * Whether the colour survives the trip into sRGB unclamped.
 *
 * The conversion is repeated here rather than read off `oklabToRgb`, which clamps and so
 * cannot report that it did. One tolerance either side of the channel range, because the
 * arithmetic lands a hair outside on colours that are exactly on the boundary.
 */
function fitsInGamut(L: number, a: number, b: number): boolean {
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3

  const channels = [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]

  return channels.every(channel => channel >= -1e-4 && channel <= 1 + 1e-4)
}
