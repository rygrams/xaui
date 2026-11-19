import { accentInk } from '../theme/accent-ink'
import { tramAccents } from '../theme/tram-tokens'
import type { TramAccentName } from '../theme/tram-tokens'

/** How a ground is given a colour of its own — the `Surface`, the `Card`. */
export type GroundPaint = {
  accent?: TramAccentName
  color?: string
  /** Whether the colour is the ground's line rather than its fill. */
  isLine: boolean
  /** The page the line is drawn on. */
  page: string
}

/**
 * The tint a ground hands its recipe, or `undefined` for the theme's own colours. A raw
 * `color` is the caller's word and is never corrected. A named accent fills with its true
 * colour, and is the mode's ink where it is a line on the page: yellow on white is 1.68:1.
 */
export function groundPaint({
  accent,
  color,
  isLine,
  page,
}: GroundPaint): string | undefined {
  if (color) return color
  if (!accent) return undefined

  const hue = tramAccents[accent]

  return isLine ? accentInk(hue, page) : hue
}
