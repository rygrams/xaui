import { alpha, contrastOn, isHex, mix } from '../utils/colors'
import type { XAUITheme } from './theme.type'

/**
 * A raw tint, expanded into the slices a variant consumes. One `color` gives the base;
 * the other five come out of the same OKLab formulas as `deriveColors`, so a free tint
 * behaves exactly like `accent` or `danger` — same ratios, same rendering — instead of
 * following a parallel mechanic.
 */
export type XAUITint = {
  base: string
  foreground: string
  soft: string
  softForeground: string
  pressed: string
  softPressed: string
}

const cache = new Map<string, XAUITint>()

/**
 * Memoized per tint *and* theme: sRGB → OKLab → sRGB is not free per render, and
 * `softForeground` mixes with the theme's `foreground`, which differs between modes.
 */
export function deriveTint(tint: string, theme: XAUITheme): XAUITint {
  const key = `${theme.id}|${theme.mode}|${tint}`
  const hit = cache.get(key)
  if (hit) return hit

  if (!isHex(tint)) {
    throw new Error(
      `XAUI: color="${tint}" must be a hex value (#rgb or #rrggbb). A tint's contrasted, ` +
        'soft and pressed slices are derived in OKLab, which cannot read rgba() or a ' +
        'named colour. Pass the hex here and put the transparency in `style`.'
    )
  }

  const foreground = contrastOn(tint, theme.colors.snow, theme.colors.eclipse)
  const derived: XAUITint = {
    base: tint,
    foreground,
    soft: alpha(tint, 0.15),
    softForeground: mix(tint, theme.colors.foreground, 0.2),
    pressed: mix(tint, foreground, 0.1),
    softPressed: alpha(tint, 0.2),
  }

  cache.set(key, derived)
  return derived
}
