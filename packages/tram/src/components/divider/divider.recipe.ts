import { createRecipe } from '@xaui/native/system'
import type { SlotStyles, VariantTokens } from '@xaui/native/system'
import type { XAUITheme } from '@xaui/native/theme'
import type { TramSize } from '../../theme/tram-tokens'
import { LINE_WIDTH } from '../button/button.recipe'
import type { DividerSlot } from './divider.type'

const SLOTS = ['root'] as const

export const DEFAULT_SIZE: TramSize = 'sm'

/**
 * The rule is `muted`, the grey of a detail — not the theme's `separator`, which is
 * Native's zinc and not a Tram grey. `bg` and not `border`: a rule is a filled box one
 * point thick, and a raw `color` lands on it through the tint.
 */
const VARIANT_TOKENS = { default: { bg: 'muted' } } satisfies Record<
  string,
  VariantTokens
>

/**
 * How much of the grey is left on the page. Metro separated by space, not by lines: a
 * rule that shows is a rule that is too heavy. On white the same half of `muted` reads
 * paler than it does on black, so light keeps more of it. A raw `color` is the caller's
 * word and is drawn whole.
 */
const FADE = { dark: 0.5, light: 0.75 } as const

/** The three Tram lines: one point, the `Button`'s two, the theme's border. */
const THICKNESS: Record<TramSize, (theme: XAUITheme) => number> = {
  sm: () => 1,
  md: () => LINE_WIDTH,
  lg: theme => theme.borderWidth.default,
}

/** Both axes are written; `orientation`, applied second, releases the one it runs along. */
function thicknessAxis(of: (theme: XAUITheme) => number) {
  return (theme: XAUITheme): SlotStyles<DividerSlot> => {
    const value = of(theme)
    return { root: { height: value, width: value } }
  }
}

export const dividerRecipe = createRecipe({
  slots: SLOTS,

  // Stretched across the parent's cross axis: full width in a column, full height in a row.
  base: () => ({ root: { alignSelf: 'stretch' } }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({ root: { backgroundColor: colors.bg } }),

  variants: {
    size: {
      sm: thicknessAxis(THICKNESS.sm),
      md: thicknessAxis(THICKNESS.md),
      lg: thicknessAxis(THICKNESS.lg),
    },

    orientation: {
      horizontal: () => ({ root: { width: 'auto' } }),
      vertical: () => ({ root: { height: 'auto' } }),
    },

    /** The theme's grey, faded; never a caller's colour. */
    isFaded: { true: theme => ({ root: { opacity: FADE[theme.mode] } }) },
  },

  // `variant` has one value the caller cannot pick; the recipe still needs it selected.
  defaultVariants: {
    variant: 'default',
    size: DEFAULT_SIZE,
    orientation: 'horizontal',
  },
})
