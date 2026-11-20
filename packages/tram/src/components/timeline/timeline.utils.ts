import type { TimelineStatus } from '@xaui/native'
import { faintFill } from '../../system/faint-fill'
import { inkOn } from '../../system/flat-paint'
import type { TimelineTilePaint } from './timeline.type'

/** The colours a tile is painted from: the theme's, and the entry's own accent. */
export type TilePalette = {
  background: string
  foreground: string
  muted: string
  accent: string
  accentForeground: string
  success: string
  successForeground: string
  warning: string
  warningForeground: string
  danger: string
  dangerForeground: string
}

/**
 * The six tiles a timeline can draw, decided once.
 *
 * | status      | fill                    | ink               |
 * | ----------- | ----------------------- | ----------------- |
 * | `default`   | the accent              | `onAccent`        |
 * | `current`   | the page's ink          | the ground        |
 * | `muted`     | the faint grey          | the page's ink    |
 * | `success` … | green, amber, red       | their `onAccent`  |
 *
 * `current` is the ink rather than the accent so that "being done" tells itself apart
 * from "done" without a hue, as Native's ring does. `accent` reaches `default` only:
 * green means what happened, and a tint that repainted it would lie.
 */
export function tilePaints(
  palette: TilePalette
): Record<TimelineStatus, TimelineTilePaint> {
  const flat = (fill: string, fallback: string) => ({
    fill,
    ink: inkOn(fill, fallback),
  })

  return {
    default: flat(palette.accent, palette.accentForeground),
    current: { fill: palette.foreground, ink: palette.background },
    muted: {
      fill: faintFill(palette.foreground, palette.background) ?? palette.muted,
      ink: palette.foreground,
    },
    success: flat(palette.success, palette.successForeground),
    warning: flat(palette.warning, palette.warningForeground),
    danger: flat(palette.danger, palette.dangerForeground),
  }
}
