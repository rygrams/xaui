import { channels, onAccent, relativeLuminance } from './on-accent'

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

function contrast(first: string, second: string): number {
  const [low, high] = [relativeLuminance(first), relativeLuminance(second)].sort(
    (a, b) => a - b
  )

  return (high + 0.05) / (low + 0.05)
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
  const toward = channels(onAccent(ground))
  let ink = accent

  for (let step = 0; step <= STEPS; step += 1) {
    ink = step === 0 ? accent : toHex(blend(from, toward, step / STEPS))
    if (contrast(ink, ground) >= INK_CONTRAST) break
  }

  cache.set(key, ink)
  return ink
}

/**
 * The ink of a label lying on the accent's soft slice — the `flat` box. The slice is
 * translucent, so it is flattened on `ground` first: that is the colour actually behind
 * the label.
 */
export function accentSoftInk(accent: string, ground: string): string {
  const slice = toHex(blend(channels(ground), channels(accent), SOFT_ALPHA))

  return accentInk(accent, slice)
}
