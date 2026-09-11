import { deriveTint } from '../../theme/derive-tint'
import type { XAUITint } from '../../theme/derive-tint'
import type { XAUITheme } from '../../theme/theme.type'
import type { VariantTokens } from './recipe.type'

const TINT_SLICE_BY_SUFFIX: ReadonlyArray<[RegExp, keyof XAUITint]> = [
  [/SoftForeground$/, 'softForeground'],
  [/SoftPressed$/, 'softPressed'],
  [/Soft$/, 'soft'],
  [/Foreground$/, 'foreground'],
  [/Pressed$/, 'pressed'],
]

export function tintSliceFor(token: string): keyof XAUITint {
  for (const [suffix, slice] of TINT_SLICE_BY_SUFFIX) {
    if (suffix.test(token)) return slice
  }
  return 'base'
}

export function resolveTint(
  tokens: VariantTokens | undefined,
  color: string,
  theme: XAUITheme
): Record<string, string> {
  const tint = deriveTint(color, theme)
  const colors: Record<string, string> = {}
  for (const [role, token] of Object.entries(tokens ?? {})) {
    colors[role] = tint[tintSliceFor(token)]
  }
  return colors
}
