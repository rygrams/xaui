import { TRAM_TOUCH_TARGET } from '../theme/tram-tokens'

/**
 * How far `hitSlop` has to reach, on each side, for a control drawn `drawn` points across
 * to be pressed like one of 48. Nothing for a control that is already there.
 */
export function touchReach(drawn: number): number {
  return Math.max(0, (TRAM_TOUCH_TARGET - drawn) / 2)
}
