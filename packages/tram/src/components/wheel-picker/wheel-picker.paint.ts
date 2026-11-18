import { flatPaint } from '../../system/flat-paint'
import type { FlatPaint } from '../../system/flat-paint'
import { accentInk } from '../../theme/accent-ink'
import { tramAccents } from '../../theme/tram-tokens'
import type { WheelPickerVariant } from './wheel-picker.type'

/**
 * The colour a wheel that is not in the theme's accent is tinted with, or `undefined`
 * when it is.
 *
 * | Variant     | A named `accent`              | A raw `color` |
 * | ----------- | ----------------------------- | ------------- |
 * | `contained` | the true colour — a flat fill | as given      |
 * | `light`     | the ink — it is text on the ground: yellow on white is 1.68:1 | as given |
 */
export function wheelTintFor(
  { accent, color }: FlatPaint,
  variant: WheelPickerVariant,
  ground: string
): string | undefined {
  if (variant === 'contained') return flatPaint({ accent, color })

  return color ?? (accent && accentInk(tramAccents[accent], ground))
}
