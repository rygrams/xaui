import type { ViewStyle } from 'react-native'
import type { XAUITheme } from '@xaui/native/theme'
import { inkOn } from '../../system/flat-paint'
import { markDrawing, softMarkOf } from '../../system/report-tokens'
import type { AlertVariant } from './alert.type'

export type AlertMark = {
  /** What the icon square adds to its recipe style. */
  box: ViewStyle
  /** The glyph's colour. */
  glyph: string
}

/**
 * The icon square's paint: the colour the alert is about, filled — or, on an alert that
 * is itself that colour, the ink's line around the glyph.
 *
 * `paint` is the tint the alert was given (`accent`, `color`); `ink` is the text's colour
 * as the recipe resolved it.
 */
export function alertMark(
  variant: AlertVariant,
  paint: string | undefined,
  ink: string,
  theme: XAUITheme
): AlertMark {
  if (markDrawing(variant, paint !== undefined) === 'line') {
    return { box: { borderColor: ink }, glyph: ink }
  }

  // `default` reports nothing in particular: its square is the accent.
  const name = softMarkOf(variant) ?? 'accent'
  const fill = paint ?? theme.colors[name]
  const glyph = paint ? inkOn(paint, ink) : theme.colors[`${name}Foreground`]

  return { box: { backgroundColor: fill, borderColor: fill }, glyph }
}
