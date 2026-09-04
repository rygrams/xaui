import type { TextStyle } from 'react-native'
import { createRecipe } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { TypographySlot, TypographyVariant } from './typography.type'

/** Every role produces the same one slot, so the recipe's style functions share a shape. */
type StyleFn = (theme: XAUITheme) => Record<TypographySlot, TextStyle>

const SLOTS = ['root'] as const

/**
 * Ten lines of data. Nine roles are ink alone; `code` is the one that also names a fill,
 * because inline code reads as code by sitting on a surface rather than by its font.
 *
 * A raw `color` reads the same `fg` role, so tinting any role tints it the same way and
 * nothing here has to know about it.
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
  // The one role that paints a surface as well as ink: inline code reads as code because
  // it sits on something, and `default` is the neutral fill the rest of the library uses.
  code: { fg: 'foreground', bg: 'default' },
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
  code: { step: 'sm', weight: 'regular', family: 'mono' },
}

function metricsOf({ step, weight, family, letterSpacing }: Role): StyleFn {
  return theme => ({
    root: {
      fontSize: theme.fontSizes[step],
      lineHeight: theme.lineHeights[step],
      fontWeight: theme.fontWeights[weight],
      fontFamily: theme.fontFamilies[family],
      ...(letterSpacing === undefined ? {} : { letterSpacing }),
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
  // `backgroundColor` is undefined for the nine roles that name no fill, which React
  // Native reads as transparent — so one paint function covers all ten.
  paint: (_theme, colors) => ({
    root: { color: colors.fg, backgroundColor: colors.bg },
  }),
  variants: { variant: ROLE_AXIS },
  defaultVariants: { variant: 'body' },
})
