import type { ViewStyle } from 'react-native'
import { inkOn } from '../../system/flat-paint'
import type { AlertVariant } from './alert.type'

/** How the icon square is drawn: a square of colour, or the ink's line around the glyph. */
export type MarkDrawing = 'fill' | 'line'

/**
 * On a `contained` alert the ground is already the colour: a square of it would vanish,
 * so the mark is the ink's line. On `flat` and `outline` it is the true colour, filled.
 */
export function markDrawing(variant: AlertVariant): MarkDrawing {
  return variant === 'contained' ? 'line' : 'fill'
}

export type AlertMark = {
  /** What the icon square adds to its recipe style. */
  box: ViewStyle
  /** The glyph's colour. */
  glyph: string
}

/**
 * The icon square's paint. `hue` is the true colour the alert is in — the theme's accent,
 * a named one, or a raw `color` — and `onHue` the ink the theme computed for its own
 * accent; `ink` is the text's colour as the recipe resolved it.
 */
export function alertMark(
  variant: AlertVariant,
  hue: string,
  onHue: string | undefined,
  ink: string
): AlertMark {
  if (markDrawing(variant) === 'line') {
    return { box: { borderColor: ink }, glyph: ink }
  }

  return {
    box: { backgroundColor: hue, borderColor: hue },
    glyph: onHue ?? inkOn(hue, ink),
  }
}
