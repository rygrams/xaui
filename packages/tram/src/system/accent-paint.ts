import { accentInk, accentSoftInk } from '../theme/accent-ink'

/** The four ways a Tram box takes its colour. The `Button` has all four; a `Tile` two. */
export type AccentDrawing = 'contained' | 'flat' | 'outline' | 'text'

export type AccentPaint = {
  /** What the recipe's tint pass is given. */
  tint: string
  /** The label's colour, when the tint's own derivation would not read. */
  label?: string
}

/**
 * How a named accent paints one variant on `ground`. A fill is the true colour; where the
 * accent is the line or the label itself, it is the mode's ink — yellow on white is 1.68:1.
 *
 * | Variant           | Tint            | Label                      |
 * | ----------------- | --------------- | -------------------------- |
 * | `contained`       | the true colour | the tint's own foreground  |
 * | `flat`            | the true colour | the ink, on the soft slice |
 * | `outline`, `text` | the ink         | the tint                   |
 */
export function accentPaintFor(
  accent: string,
  variant: AccentDrawing,
  ground: string
): AccentPaint {
  if (variant === 'contained') return { tint: accent }
  if (variant === 'flat')
    return { tint: accent, label: accentSoftInk(accent, ground) }

  return { tint: accentInk(accent, ground) }
}
