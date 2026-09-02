import { deriveTint } from '../../theme/derive-tint'
import type { XAUITint } from '../../theme/derive-tint'
import type { XAUITheme } from '../../theme/theme.type'
import type { VariantTokens } from './recipe.type'

/**
 * Which slice of the tint stands in for a token, read off the token's own name.
 *
 * The theme names colours strictly — `accent`, `accentForeground`, `accentSoft`,
 * `accentSoftForeground`, `accentPressed`, `accentSoftPressed` — so the suffix already
 * states the role the token plays in its family. Having each variant declare that a
 * second time would be the same information twice, free to drift apart.
 *
 * Longest suffix first, and the tests are case-sensitive on purpose: that is what keeps
 * the standalone `foreground` token (a neutral, not a family's contrast colour) mapping
 * to `base`, so a tinted `ghost` button paints its label in the tint rather than looking
 * for a colour to contrast against.
 */
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

/**
 * The variant's roles, filled from the tint instead of the theme. Because it maps the
 * roles the variant already declared, the tint lands exactly where the variant put its
 * tokens — a background for `primary`, a label for `ghost`, a border for `tertiary` —
 * with no per-variant instruction about what `color` means.
 */
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
