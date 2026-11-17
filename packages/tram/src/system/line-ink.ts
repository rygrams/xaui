import { accentInk } from '../theme/accent-ink'
import { tramAccents } from '../theme/tram-tokens'
import type { FlatPaint } from './flat-paint'

/**
 * The colour of a line that is not the theme's accent — a field's border once it has the
 * focus — or `undefined` when it is. The counterpart of `flatPaint` for what is read
 * rather than filled: a named accent is its ink on `ground`, 4.5:1 at least. A raw
 * `color` wins and is the caller's word, never corrected.
 */
export function lineInk(
  { accent, color }: FlatPaint,
  ground: string
): string | undefined {
  return color ?? (accent && accentInk(tramAccents[accent], ground))
}
