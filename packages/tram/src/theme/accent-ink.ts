import { channels, isHex, linear, relativeLuminance } from './on-accent'

/** WCAG AA for text at any size — the bar `muted` already holds. */
const INK_CONTRAST = 4.5

/** The share of a colour in its soft slice: Native's `accentSoft`, restated. */
const SOFT_ALPHA = 0.15

const STEPS = 100

type Channels = [number, number, number]

function toHex(rgb: Channels): string {
  const digits = rgb.map(channel =>
    Math.round(channel * 255)
      .toString(16)
      .padStart(2, '0')
  )

  return `#${digits.join('').toUpperCase()}`
}

/** `from`, moved `share` of the way to `to`, channel by channel. */
function blend(from: Channels, to: Channels, share: number): Channels {
  return from.map(
    (channel, index) => channel + (to[index] - channel) * share
  ) as Channels
}

/**
 * `from`, moved `share` of the way to `to`, in sRGB, as hex. Both must be hex: the caller
 * checks with `isHex`, as a theme can hand any colour string.
 */
export function blendHex(from: string, to: string, share: number): string {
  return toHex(blend(channels(from) as Channels, channels(to) as Channels, share))
}

function contrast(first: string, second: string): number {
  const [low, high] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => a - b
  )

  return (high + 0.05) / (low + 0.05)
}

/**
 * The end of the scale an ink moves toward: whichever of black and white stands out more
 * on `ground`. Measured, not read off `onAccent` — that threshold is tuned for the text
 * on a fill, and on a mid grey it picks white, which tops out under 3:1.
 */
function farthestFrom(ground: string): string {
  return contrast('#000000', ground) >= contrast('#FFFFFF', ground)
    ? '#000000'
    : '#FFFFFF'
}

// Only palette accents and theme grounds reach it — a raw `color` is never corrected —
// so the table stays the size of the palette.
const cache = new Map<string, string>()

/**
 * The accent as **ink**: the colour it takes when it is text or a line drawn on `ground`
 * rather than a fill.
 *
 * A fill keeps the true colour and puts `onAccent` on it. Ink has nothing to put on
 * anything — it is the thing read — and eight of the twenty accents sit under 3:1 on
 * white, yellow at 1.68. So the accent moves toward the ground's own ink, black on a
 * light ground and white on a dark one, by the smallest whole percent that reaches
 * 4.5:1. An accent that already reads comes back untouched.
 */
export function accentInk(accent: string, ground: string): string {
  const key = `${accent}|${ground}`
  const hit = cache.get(key)
  if (hit) return hit

  const from = channels(accent)
  const toward = channels(farthestFrom(ground))
  let ink = accent

  for (let step = 0; step <= STEPS; step += 1) {
    ink = step === 0 ? accent : toHex(blend(from, toward, step / STEPS))
    if (contrast(ink, ground) >= INK_CONTRAST) break
  }

  cache.set(key, ink)
  return ink
}

/**
 * The accent's soft slice flattened on `ground`: the colour a `flat` box actually shows.
 * `share` lays more of the accent for a slice that has to read across a whole row.
 */
export function softSlice(
  accent: string,
  ground: string,
  share: number = SOFT_ALPHA
): string {
  return toHex(blend(channels(ground), channels(accent), share))
}

/**
 * The ink of a label lying on the accent's soft slice — the `flat` box. The slice is
 * translucent, so it is flattened on `ground` first: that is the colour actually behind
 * the label.
 */
export function accentSoftInk(accent: string, ground: string): string {
  return accentInk(accent, softSlice(accent, ground))
}

/**
 * How far apart two colours look: their distance in OKLab, where 0 is the same colour and
 * white is 1 from black. Lightness and hue both count — two greys of one luminance are
 * close, a blue and a grey of one luminance are not.
 */
export function inkDistance(first: string, second: string): number {
  const [l1, a1, b1] = oklab(first)
  const [l2, a2, b2] = oklab(second)

  return Math.hypot(l1 - l2, a1 - a2, b1 - b2)
}

function oklab(hex: string): Channels {
  const [red, green, blue] = channels(hex).map(linear)
  const long = Math.cbrt(
    0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue
  )
  const medium = Math.cbrt(
    0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue
  )
  const short = Math.cbrt(
    0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue
  )

  return [
    0.2104542553 * long + 0.793617785 * medium - 0.0040720468 * short,
    1.9779984951 * long - 2.428592205 * medium + 0.4505937099 * short,
    0.0259040371 * long + 0.7827717662 * medium - 0.808675766 * short,
  ]
}

/**
 * The least distance (`inkDistance`) between two levels of text set one under the other —
 * a title, the line in the accent, the grey detail — for the eye to tell them apart at a
 * glance rather than by reading them.
 */
export const INK_APART = 0.1

/**
 * `ink`, kept apart from the other inks it is read beside. The grey accents — steel,
 * olive, mauve, taupe, brown — read as ink on white come within a few hundredths of the
 * page's `muted`: a line in the accent under a grey detail then looks like a second grey
 * line. Such an ink moves on, toward the end of the scale that stands out on `ground`, by
 * the smallest whole percent that puts it `INK_APART` from every colour of `apart`.
 * Moving away from the ground only raises its contrast there, so it still reads.
 *
 * An ink already apart comes back untouched; so does one no step can part — and any
 * colour that is not a hex, which cannot be measured.
 */
export function distinctInk(
  ink: string,
  ground: string,
  apart: readonly string[]
): string {
  if (![ink, ground, ...apart].every(isHex)) return ink

  const isApart = (candidate: string) =>
    apart.every(other => inkDistance(candidate, other) >= INK_APART)

  if (isApart(ink)) return ink

  const from = channels(ink)
  const toward = channels(farthestFrom(ground))

  for (let step = 1; step <= STEPS; step += 1) {
    const candidate = toHex(blend(from, toward, step / STEPS))
    if (isApart(candidate)) return candidate
  }

  return ink
}
