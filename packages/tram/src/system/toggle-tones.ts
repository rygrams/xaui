import { flatPaint, inkOn } from './flat-paint'
import type { FlatPaint } from './flat-paint'
import { lineInk } from './line-ink'

/** The three colours a toggle is drawn in, in one of its two states. */
export type ToggleTone = {
  /** The inside of the box. */
  fill: string
  /** The box's own line. A button of a group has none; it reads `fill` alone. */
  line: string
  /** The label and the icon. */
  text: string
}

/** Released and chosen: the two ends a toggle fades between. */
export type ToggleTones = { off: ToggleTone; on: ToggleTone }

/** The theme's colours a toggle is drawn from. */
export type ToggleColors = {
  /** The page: what a released box is filled with. */
  ground: string
  /** The page's ink: the line and the label of a released box. */
  ink: string
  /** The grey a disabled toggle is drawn in. */
  muted: string
  /** The theme's accent, as a fill, and the ink that reads on it. */
  accent: string
  onAccent: string
  /** The theme's accent as ink, on the ground. */
  link: string
}

/** How the toggle is drawn: in a box, or as its label alone. */
export type ToggleDrawing = { variant: 'outline' | 'text'; isDisabled: boolean }

const NONE = 'transparent'

/**
 * The colours of a toggle at rest and chosen, for the paint it was given.
 *
 * - **outline** — released, the ground inside a line of ink, the label in the ink;
 *   chosen, a flat fill of the true colour — the theme's accent, a named `accent`, or a
 *   raw `color` — with its line in the same colour and its label in the ink that reads
 *   on it: black on lime, amber and yellow.
 * - **text** — no box in either state: only the label moves, from the ink to the accent
 *   read as ink, moved until it holds 4.5:1 on the ground.
 * - **disabled** — grey is the state, with no opacity: a grey line and label, and a
 *   chosen box is a grey fill with its label in the ground's colour.
 *
 * A raw `color` is the caller's word and is never corrected. One that is not a hex cannot
 * be measured, and its label takes the theme's `onAccent`.
 */
export function toggleTones(
  paint: FlatPaint,
  colors: ToggleColors,
  drawing: ToggleDrawing
): ToggleTones {
  const { ground, ink, muted } = colors

  if (drawing.variant === 'text') {
    const read = drawing.isDisabled ? muted : (lineInk(paint, ground) ?? colors.link)

    return {
      off: { fill: NONE, line: NONE, text: drawing.isDisabled ? muted : ink },
      on: { fill: NONE, line: NONE, text: read },
    }
  }

  if (drawing.isDisabled) {
    return {
      off: { fill: ground, line: muted, text: muted },
      on: { fill: muted, line: muted, text: ground },
    }
  }

  const own = flatPaint(paint)
  const fill = own ?? colors.accent
  const text = own ? inkOn(own, colors.onAccent) : colors.onAccent

  return {
    off: { fill: ground, line: ink, text: ink },
    on: { fill, line: fill, text },
  }
}
