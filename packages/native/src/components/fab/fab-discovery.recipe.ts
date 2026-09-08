import { createRecipe } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'

const SLOTS = [
  'overlay',
  'circle',
  'halo',
  'content',
  'title',
  'description',
  'action',
] as const

/**
 * **One variant, and it is the accent.**
 *
 * A coach mark has no emphasis to choose between: it says "this, out of everything on the
 * screen", and the theme already has a colour that means exactly that. What a caller may
 * want instead is a raw one — a brand colour for an onboarding tour that is not the app's
 * accent — and that is `color`, which travels through this table.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  default: { bg: 'accent', fg: 'accentForeground' },
}

/** The ring's stroke, and how far through it the disc shows. */
const HALO_WIDTH = 1
const HALO_OPACITY = 0.35

/** The description, against a title at full strength on the same ground. */
const DESCRIPTION_OPACITY = 0.86

export const fabDiscoveryRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    overlay: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      start: 0,
      end: 0,
      backgroundColor: theme.colors.backdrop,
    },
    // Every part is placed by `discoveryGeometry`, so all any of them carries here is what
    // it is made of. The `top`, `start` and `size` arrive from the measurement.
    circle: { position: 'absolute' },
    halo: {
      position: 'absolute',
      borderWidth: theme.borderWidth.default * HALO_WIDTH,
      opacity: HALO_OPACITY,
    },
    content: { position: 'absolute', gap: theme.spacing(2.5) },
    title: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes['2xl'],
      lineHeight: theme.lineHeights['2xl'],
    },
    description: {
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.md,
      lineHeight: theme.lineHeights.md,
      opacity: DESCRIPTION_OPACITY,
    },
    action: {
      fontFamily: theme.fontFamilies.body,
      fontWeight: theme.fontWeights.semibold,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      // Underlined rather than boxed: a button on the disc would be a second surface on a
      // surface, and this is the one place in the library where a link is the right shape.
      textDecorationLine: 'underline',
    },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The disc takes the fill and everything drawn **on** it takes the contrast colour — the
   * ring included, which is that colour at a third, so it reads as a lit edge round the
   * target rather than as a second stroke.
   */
  paint: (_theme, colors) => ({
    circle: { backgroundColor: colors.bg },
    halo: { borderColor: colors.fg },
    title: { color: colors.fg },
    description: { color: colors.fg },
    action: { color: colors.fg },
  }),

  // `variant` is named even though the table has one entry: without it the selection
  // resolves to `undefined` and `paint` is handed no colours at all.
  defaultVariants: { variant: 'default' },
})
