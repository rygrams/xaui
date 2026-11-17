import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { TRAM_RADIUS } from './tram-tokens'

/**
 * The corner a radius key draws on a **box** — a track, a thumb, a checkbox: the theme's
 * value, never past the Tram corner. `full` is capped with the rest, since a box rounded
 * all the way is a pill.
 */
export function boxCornerFor(key: RadiusKey, radius: XAUITheme['radius']): number {
  return Math.min(radius[key], TRAM_RADIUS)
}

/**
 * The corner of a control that may be a circle — the `Button`, whose icon-only form is
 * the App Bar's round one. As a box, with `full` let through: a circle is the only shape
 * that goes past the Tram corner.
 */
export function cornerFor(key: RadiusKey, radius: XAUITheme['radius']): number {
  return key === 'full' ? radius.full : boxCornerFor(key, radius)
}
