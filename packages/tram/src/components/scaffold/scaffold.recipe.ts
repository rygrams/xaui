import { createRecipe } from '@xaui/native/system'
import type { VariantTokens } from '@xaui/native/system'
import { LINE_WIDTH } from '../button/button.recipe'
import { roleType } from '../typography/typography.role'
import type { ScaffoldVariant } from './scaffold.type'

const SLOTS = ['root', 'header', 'headerTitle', 'content'] as const

export const DEFAULT_VARIANT: ScaffoldVariant = 'ghost'

/**
 * Only the **header** is in here: the page's ground is the theme's `background` under
 * every variant, as in Native — a scaffold that repainted the page would be a theme.
 *
 * `tertiary`'s edge is `muted`, the line a Tram `Surface` frames itself with, not the
 * theme's `border`: a line of full ink under a header reads as a control. `ghost` and
 * `tertiary` name no fill, so a tint lands on their title (and line) and the ground stays
 * the page's.
 */
const VARIANT_TOKENS: Record<ScaffoldVariant, VariantTokens> = {
  primary: { bg: 'accent', fg: 'accentForeground' },
  secondary: { bg: 'surface', fg: 'surfaceForeground' },
  tertiary: { fg: 'foreground', border: 'muted' },
  ghost: { fg: 'foreground' },
}

export const scaffoldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flex: 1, backgroundColor: theme.colors.background },
    // The title on the Tram scale, SemiLight: the size of a page header, a step under
    // the page's own giant title.
    headerTitle: roleType('title', theme),
    content: { backgroundColor: theme.colors.background },
  }),

  variantTokens: VARIANT_TOKENS,

  /**
   * The edge is the `Button`'s line, 2, and only under `tertiary`. A navigator's header
   * cannot be transparent — the screen would scroll through it — so the variants that
   * name no fill take the page's.
   */
  paint: (theme, colors) => ({
    header: {
      backgroundColor: colors.bg ?? theme.colors.background,
      borderBottomColor: colors.border,
      borderBottomWidth: colors.border ? LINE_WIDTH : 0,
    },
    headerTitle: { color: colors.fg },
  }),

  defaultVariants: { variant: DEFAULT_VARIANT },
})
