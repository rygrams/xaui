import type { ColorValue, ViewStyle } from 'react-native'
import { contrastOn, isHex } from '../../utils/colors'
import type { RadiusStyle } from './pressable-feedback.type'

/**
 * The colours an ink is picked from — the theme's two extremes and its fallback.
 * Named rather than taking the whole theme, so this stays a pure function with a test.
 */
export type InkColors = {
  snow: string
  eclipse: string
  foreground: string
}

/**
 * The ink an overlay needs to be visible on this control.
 *
 * A wash or a wave has to contrast with what it sits on, and the root is the only thing
 * that knows: it can read its own `backgroundColor`. Two cases fall back to the theme's
 * `foreground`, and both for the same reason — the control is showing what is behind it:
 *
 * - **No background at all**, a `ghost` or a transparent row.
 * - **A translucent one.** Every `…Soft` token is an `rgba()`, and a luminance cannot be
 *   read off a colour that is partly whatever is underneath. `contrastOn` throws on
 *   anything that is not hex rather than guessing, so this asks first.
 */
export function inkFor(
  background: ColorValue | undefined,
  colors: InkColors
): string {
  if (typeof background !== 'string' || !isHex(background)) return colors.foreground
  return contrastOn(background, colors.snow, colors.eclipse)
}

/**
 * The keys copied off the root's style. The `Left`/`Right` corner forms are absent by
 * decision, not by omission: R13 bans them because RN mirrors only the logical ones.
 */
const RADIUS_KEYS = [
  'borderRadius',
  'borderStartStartRadius',
  'borderStartEndRadius',
  'borderEndStartRadius',
  'borderEndEndRadius',
] as const satisfies readonly (keyof RadiusStyle)[]

/**
 * The root's corners, for an overlay to round itself to the same shape.
 *
 * An absolute fill has square corners; every control here is rounded. Copying is what
 * keeps the clip on the overlay instead of on the root — a root that clipped would also
 * cut a badge sitting on its corner, which has nothing to do with the press.
 *
 * Undefined keys are dropped rather than passed through as `undefined`, so the returned
 * object composes into a style array without overriding what an earlier entry set.
 */
export function radiusFrom(style: ViewStyle | undefined): RadiusStyle {
  if (!style) return {}

  const radius: RadiusStyle = {}
  for (const key of RADIUS_KEYS) {
    const value = style[key]
    if (value !== undefined) radius[key] = value
  }
  return radius
}
