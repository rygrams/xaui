import type { RadiusKey, XAUITheme } from '@xaui/native/theme'
import { TRAM_RADIUS } from './tram-tokens'

/**
 * The corner a radius key draws in Tram: the theme's value, never past the Tram corner.
 * `full` is the one key let through — a circle is the only shape that goes further.
 */
export function cornerFor(key: RadiusKey, radius: XAUITheme['radius']): number {
  return key === 'full' ? radius.full : Math.min(radius[key], TRAM_RADIUS)
}
