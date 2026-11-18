import { flatPaint, inkOn } from './flat-paint'
import type { FlatPaint } from './flat-paint'

/** What a flat disc is asked to be: a paint of its own, or none, and whether it answers. */
export type DiscAsk = FlatPaint & { isDisabled?: boolean }

/** The colours of the theme a disc reads: its accent, the page's ground, ink and grey. */
export type DiscGround = {
  accent: string
  accentForeground: string
  background: string
  foreground: string
  muted: string
}

export type DiscPaint = {
  /** The flat fill of the circle. */
  fill: string
  /** What is drawn on the fill — the glyph, the busy ring. */
  glyph: string
  /** What is written beside the disc, on the page. */
  label: string
}

/**
 * The colours of a filled disc — the `Fab` — and of the word under it.
 *
 * The fill is the true colour: the theme's accent, a named `accent`, or a raw `color`,
 * which wins and is never corrected. The glyph is the ink that reads on that fill, black
 * on lime, amber and yellow. The word is on the page, so it is the page's ink.
 *
 * Disabled, the grey is the state: a flat fill of `muted`, the glyph cut out of it in the
 * colour of the ground, the word in the same grey. Nothing is dimmed.
 */
export function discPaint(ask: DiscAsk, ground: DiscGround): DiscPaint {
  if (ask.isDisabled) {
    return { fill: ground.muted, glyph: ground.background, label: ground.muted }
  }

  const own = flatPaint(ask)

  return {
    fill: own ?? ground.accent,
    glyph: own ? inkOn(own, ground.accentForeground) : ground.accentForeground,
    label: ground.foreground,
  }
}
