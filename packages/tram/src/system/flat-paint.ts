import { isHex, onAccent } from '../theme/on-accent'
import { tramAccents } from '../theme/tram-tokens'
import type { TramAccentName } from '../theme/tram-tokens'

/** The two ways a control is given a colour of its own. */
export type FlatPaint = {
  accent?: TramAccentName
  color?: string
}

/**
 * The colour of a flat fill that is not the theme's accent — a switch's track, a mark —
 * or `undefined` when it is. A raw `color` wins over a named `accent`, and the accent is
 * its true colour: a fill is never the accent read as ink.
 */
export function flatPaint({ accent, color }: FlatPaint): string | undefined {
  return color ?? (accent && tramAccents[accent])
}

/**
 * The ink that reads on a flat fill of `fill`: black on lime, amber and yellow, white on
 * the rest. A raw colour that is not a hex — `rgb()`, a name — cannot be measured, and
 * takes `fallback`: the caller's word is never corrected, only read where it can be.
 */
export function inkOn(fill: string, fallback: string): string {
  return isHex(fill) ? onAccent(fill) : fallback
}
