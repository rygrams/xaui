import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, XAUITheme } from '../../theme/theme.type'
import type { AutocompleteSize, AutocompleteSlot } from './autocomplete.type'

const SLOTS = ['search', 'empty'] as const

/**
 * **Two slots, because the rest is the `Select`'s.**
 *
 * An autocomplete's trigger *is* a select's trigger, its panel is a select's panel and its
 * rows are a select's rows — the tokens, the four field levels, the anchored surface, all
 * of it. Declaring them a second time here would be two tables to keep in step, and the
 * drift would show up as a select and an autocomplete sitting side by side in a form with
 * fields half a shade apart. So the root resolves `selectRecipe` for those and this one for
 * the two things a select has never had: the field you type in, and what the panel says
 * when nothing matches.
 */
const VARIANT_TOKENS: Record<'default', VariantTokens> = {
  // The search box is a field **inside** a panel rather than one on a page, so it takes
  // the recessed neutral rather than `fieldBackground` — on a white panel the latter is
  // the panel's own colour and the box would vanish into it. It is the same reasoning the
  // `Checkbox`'s `secondary` gives for the same swap.
  default: { bg: 'default', fg: 'fieldForeground' },
}

type SizeStep = { value: FontSizeKey }

const SIZES: Record<AutocompleteSize, SizeStep> = {
  sm: { value: 'md' },
  md: { value: 'md' },
  lg: { value: 'lg' },
}

/**
 * The search box's own measurements do not scale with `size`, for the reason the `Select`'s
 * list does not: `size` is the control's scale, and the panel is not the control. Only the
 * type follows, so what you type reads at the same size as what you will pick.
 */
const BOX = {
  height: 10,
  paddingHorizontal: 3,
  radius: 'field',
  marginBottom: 2,
} as const

function sizeAxis(step: SizeStep) {
  return (theme: XAUITheme): SlotStyles<AutocompleteSlot> => ({
    search: {
      fontSize: theme.fontSizes[step.value],
      lineHeight: theme.lineHeights[step.value],
    },
  })
}

export const autocompleteRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    search: {
      height: theme.spacing(BOX.height),
      paddingHorizontal: theme.spacing(BOX.paddingHorizontal),
      marginBottom: theme.spacing(BOX.marginBottom),
      borderRadius: theme.radius[BOX.radius],
      borderCurve: 'continuous',
      fontFamily: theme.fontFamilies.body,
    },
    empty: {
      fontFamily: theme.fontFamilies.body,
      fontSize: theme.fontSizes.sm,
      lineHeight: theme.lineHeights.sm,
      color: theme.colors.muted,
      textAlign: 'center',
      paddingVertical: theme.spacing(4),
    },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    search: { backgroundColor: colors.bg, color: colors.fg },
  }),

  variants: {
    size: { sm: sizeAxis(SIZES.sm), md: sizeAxis(SIZES.md), lg: sizeAxis(SIZES.lg) },
  },

  defaultVariants: { variant: 'default', size: 'md' },
})

export type { AutocompleteSlot }
