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
