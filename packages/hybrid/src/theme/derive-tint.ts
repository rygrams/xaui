import { alpha, contrastOn, isHex, mix } from '../utils/colors'
import type { XAUITheme } from './theme.type'

export type XAUITint = {
  base: string
  foreground: string
  soft: string
  softForeground: string
  pressed: string
  softPressed: string
}

const cache = new Map<string, XAUITint>()

export function deriveTint(tint: string, theme: XAUITheme): XAUITint {
  const key = `${theme.id}|${theme.mode}|${tint}`
  const hit = cache.get(key)
  if (hit) return hit

  if (!isHex(tint)) {
    throw new Error(
      `XAUI: color="${tint}" must be a hex value (#rgb or #rrggbb). A tint's ` +
        'contrasted, soft and pressed slices are derived in OKLab, which cannot read ' +
        'rgba() or a named colour. Pass the hex here and put transparency in `style`.'
    )
  }

  const derived: XAUITint = {
    base: tint,
    foreground: contrastOn(tint, theme.colors.snow, theme.colors.eclipse),
    soft: alpha(tint, 0.15),
    softForeground: mix(tint, theme.colors.foreground, 0.2),
    pressed: mix(tint, theme.colors.foreground, 0.1),
    softPressed: alpha(tint, 0.2),
  }

  cache.set(key, derived)
  return derived
}
