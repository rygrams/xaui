import { flatPaint, inkOn } from './flat-paint'
import type { FlatPaint } from './flat-paint'
import { lineInk } from './line-ink'

/** The two ways a disc is drawn: a flat fill of the colour, or a line of it on the ground. */
export type DiscDrawing = 'contained' | 'outline'

/** What a flat disc is asked to be: a paint of its own, or none, and whether it answers. */
export type DiscAsk = FlatPaint & { variant?: DiscDrawing; isDisabled?: boolean }

/** The colours of the theme a disc reads: its accent, the page's ground, ink and grey. */
export type DiscGround = {
  accent: string
  accentForeground: string
  /** The accent as ink on the ground: what an outline is drawn in. */
  link: string
  background: string
  foreground: string
  muted: string
}

export type DiscPaint = {
  /** The flat fill of the circle — `transparent` for an outline. */
  fill: string
  /** The circle's line. A filled disc draws it in its fill, so both are the same size. */
  line: string
  /** What is drawn on the fill — the glyph, the busy ring. */
  glyph: string
  /** What is written beside the disc, on the page. */
  label: string
}

const NONE = 'transparent'

/**
 * The colours of a disc — the `Fab` — and of the word under it.
 *
 * Filled, the fill is the true colour: the theme's accent, a named `accent`, or a raw
 * `color`, which wins and is never corrected. The glyph is the ink that reads on that
 * fill, black on lime, amber and yellow.
 *
 * Outlined — the Metro App Bar's button — there is no fill: the line and the glyph are
 * the colour read as ink on the ground, the theme's `link` or a named accent moved until
 * it reads, and a raw `color` as it was given.
 *
 * The word is on the page, so it is the page's ink. Disabled, the grey is the state: a
 * flat fill of `muted` with the glyph cut out of it in the colour of the ground, or a
 * grey line and glyph; the word in the same grey. Nothing is dimmed.
 */
export function discPaint(ask: DiscAsk, ground: DiscGround): DiscPaint {
  const isOutline = ask.variant === 'outline'

  if (ask.isDisabled) {
    return isOutline
      ? { fill: NONE, line: ground.muted, glyph: ground.muted, label: ground.muted }
      : {
          fill: ground.muted,
          line: ground.muted,
          glyph: ground.background,
          label: ground.muted,
        }
  }

  if (isOutline) {
    const ink = lineInk(ask, ground.background) ?? ground.link

    return { fill: NONE, line: ink, glyph: ink, label: ground.foreground }
  }

  const own = flatPaint(ask)
  const fill = own ?? ground.accent

  return {
    fill,
    line: fill,
    glyph: own ? inkOn(own, ground.accentForeground) : ground.accentForeground,
    label: ground.foreground,
  }
}
