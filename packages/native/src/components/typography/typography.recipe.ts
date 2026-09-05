import type { TextStyle } from 'react-native'
import { createRecipe } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TypographySlot, TypographyVariant } from './typography.type'

/** Every role produces the same one slot, so the recipe's style functions share a shape. */
type StyleFn = (theme: XAUITheme) => Record<TypographySlot, TextStyle>

const SLOTS = ['root'] as const

/**
 * Ten lines of data, and every one of them is ink alone — including `code`, whose chip is
 * painted with the role's metrics rather than declared here.
 *
 * That is what keeps `color` honest. The tint pass fills the roles a variant declares, so
 * a `bg` here would make `<Typography variant="code" color="#7c3aed" />` paint the fill in
 * the tint as well as the text — one purple on another, and the label gone. In a text
 * component there is one thing to tint, and the chip is not it.
 */
const VARIANT_TOKENS: Record<TypographyVariant, VariantTokens> = {
  h1: { fg: 'foreground' },
  h2: { fg: 'foreground' },
  h3: { fg: 'foreground' },
  h4: { fg: 'foreground' },
  h5: { fg: 'foreground' },
  h6: { fg: 'foreground' },
  body: { fg: 'foreground' },
  'body-sm': { fg: 'foreground' },
  'body-xs': { fg: 'foreground' },
  code: { fg: 'foreground' },
}

type Role = {
  /** One key indexes both scales, so a size can never be paired with a foreign leading. */
  step: FontSizeKey
  weight: keyof XAUITheme['fontWeights']
  family: keyof XAUITheme['fontFamilies']
  /**
   * Display type is set tighter than body type: the same tracking that keeps 14pt legible
   * reads as loose and unset at 36.
   */
  letterSpacing?: number
  /**
   * The chip `code` sits in: the neutral fill, rounded, padded, and hugging its word.
   *
   * Inline code reads as code by sitting on a surface rather than by its font, and the
   * four keys are one decision — a `Text` carrying a `backgroundColor` stretches to its
   * container, so a fill without `alignSelf` paints a band across the line, and one
   * without padding paints on the glyphs. Hence a flag, not four keys nine roles would
   * leave undefined.
   */
  chip?: true
}

/**
 * The role table. It is the reason the component has no `size` and no `weight` prop —
 * those axes are not free to combine, they are chosen together and named once.
 */
const ROLES: Record<TypographyVariant, Role> = {
  h1: { step: '4xl', weight: 'bold', family: 'heading', letterSpacing: -0.5 },
  h2: { step: '3xl', weight: 'bold', family: 'heading', letterSpacing: -0.4 },
  h3: { step: '2xl', weight: 'bold', family: 'heading', letterSpacing: -0.3 },
  h4: { step: 'xl', weight: 'semibold', family: 'heading' },
  h5: { step: 'lg', weight: 'semibold', family: 'heading' },
  h6: { step: 'md', weight: 'semibold', family: 'heading' },
  body: { step: 'md', weight: 'regular', family: 'body' },
  'body-sm': { step: 'sm', weight: 'regular', family: 'body' },
  'body-xs': { step: 'xs', weight: 'regular', family: 'body' },
  code: { step: 'sm', weight: 'regular', family: 'mono', chip: true },
}

function metricsOf({ step, weight, family, letterSpacing, chip }: Role): StyleFn {
  return theme => ({
    root: {
      fontSize: theme.fontSizes[step],
      lineHeight: theme.lineHeights[step],
      fontWeight: theme.fontWeights[weight],
      fontFamily: theme.fontFamilies[family],
      ...(letterSpacing === undefined ? {} : { letterSpacing }),
      ...(chip === undefined
        ? {}
        : {
            alignSelf: 'flex-start' as const,
            backgroundColor: theme.colors.default,
            paddingHorizontal: theme.spacing(1.5),
            paddingVertical: theme.spacing(0.5),
            borderRadius: theme.radius.md,
          }),
    },
  })
}

/**
 * The axis is named `variant` deliberately, and it is the only recipe in the library where
 * that happens. Everywhere else a variant names colours and a separate axis carries the
 * measurements; here the role *is* both, so splitting it into `variant` plus a `size`
 * would reintroduce exactly the illegal combinations the ten roles exist to remove.
 *
 * `resolveSelection` puts the chosen variant in the selection under that key, so the
 * engine finds this axis with no special case — and the metrics stay inside the cache key,
 * which is what makes ten roles resolve to ten stable `StyleSheet` references for the
 * app's lifetime instead of allocating on every text node.
 */
const ROLE_AXIS = Object.fromEntries(
  Object.entries(ROLES).map(([name, spec]) => [name, metricsOf(spec)])
) as Record<TypographyVariant, StyleFn>

/**
 * There is no `base`. A text node's defaults are React Native's own, and restating them
 * here would only give them a second place to drift from.
 */
export const typographyRecipe = createRecipe({
  slots: SLOTS,
  variantTokens: VARIANT_TOKENS,
  // Ink only. The chip's fill is a token, not a role, so it belongs to the metrics above —
  // where it also stays inside the cache key instead of being recomputed with the tint.
  paint: (_theme, colors) => ({ root: { color: colors.fg } }),
  variants: { variant: ROLE_AXIS },
  defaultVariants: { variant: 'body' },
})
