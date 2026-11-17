import { tramAccents } from '../../theme/tram-tokens'
import type { TramAccentName } from '../../theme/tram-tokens'

/** The two ways a dot is given a colour of its own. */
export type RadioPaint = {
  accent?: TramAccentName
  color?: string
}

/** A raw tint wins over a named accent; neither is the theme's accent, by omission. */
function tintOf({ accent, color }: RadioPaint): string | undefined {
  return color ?? (accent && tramAccents[accent])
}

/**
 * The colour of an option's dot when it is not the theme's accent, or `undefined` when it
 * is. The option's own paint wins over its set's — whichever of the two words it used —
 * and nothing is painted while invalid: an option that is wrong has to read as wrong
 * rather than as branded.
 */
export function dotTint(
  own: RadioPaint,
  set: RadioPaint | null,
  isInvalid: boolean
): string | undefined {
  if (isInvalid) return undefined

  return tintOf(own) ?? (set ? tintOf(set) : undefined)
}
