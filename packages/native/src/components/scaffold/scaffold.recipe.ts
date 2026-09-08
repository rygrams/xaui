import { createRecipe } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { ScaffoldVariant } from './scaffold.type'

const SLOTS = ['root', 'header', 'headerTitle', 'content'] as const

/**
 * Four lines of data, and only the **header** is in them: the page's ground is the
 * theme's `background` under every variant, because a scaffold that repainted the page
 * per variant would be a theme rather than a chrome.
 *
 * `ghost` and `tertiary` name no `bg` on purpose. A ghost button paints its label in the
 * tint because it declared no background to take it; the same declaration here is what
 * makes `<Scaffold color="…">` a brand title on the page's own ground, and a tinted
 * `tertiary` a brand hairline with it. `paint` supplies the ground both of them left
 * unnamed.
 */
const VARIANT_TOKENS: Record<ScaffoldVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'surface', fg: 'surfaceForeground' },
  tertiary: { fg: 'foreground', border: 'border' },
  ghost: { fg: 'foreground' },
}

export const scaffoldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    // The app's ground. `flex: 1` because a scaffold is the whole screen — there is
    // nothing beside it to share the space with.
    root: { flex: 1, backgroundColor: theme.colors.background },
    headerTitle: {
      fontFamily: theme.fontFamilies.heading,
      fontWeight: theme.fontWeights.semibold,
    },
    content: { backgroundColor: theme.colors.background },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The border width follows the *presence* of the border role, as it does in every other
   * recipe — `tertiary` is the only variant that names one. It is the bottom edge rather
   * than a box: a header is closed by the line under it, and R13 has no quarrel with a
   * vertical edge.
   */
  paint: (theme, colors) => ({
    header: {
      // The page's own ground when the variant names none. A navigator's header cannot be
      // transparent the way a ghost button can — the screen would scroll through it.
      backgroundColor: colors.bg ?? theme.colors.background,
      borderBottomColor: colors.border,
      borderBottomWidth: colors.border ? theme.borderWidth.default : 0,
    },
    headerTitle: { color: colors.fg },
  }),

  defaultVariants: { variant: 'ghost' },
})
