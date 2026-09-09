import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { FontSizeKey, Size, XAUITheme } from '../../theme/theme.type'
import type { RatingSlot, RatingVariant } from './rating.type'

const SLOTS = ['root', 'item', 'glyph', 'glyphFill'] as const

/**
 * Only `bgSelected` is named, because only a **filled** mark is a colour decision: the
 * unfilled ones keep the neutral fill `base` gives them, which is the ground the filled ones
 * are read against. It is also the one role a raw `color` re-tints, which is why the colour
 * that matters carries that name.
 */
const VARIANT_TOKENS: Record<RatingVariant, VariantTokens> = {
  primary: { bgSelected: 'accent' },
  secondary: { bgSelected: 'defaultForeground' },
  tertiary: { bgSelected: 'foreground' },
}

type SizeStep = {
  /** The mark's type size — a glyph is text, so its size is a font size. */
  glyph: FontSizeKey
  /** Between two marks, in spacing steps. */
  gap: number
}

const SIZES: Record<Size, SizeStep> = {
  xs: { glyph: 'sm', gap: 0.5 },
  sm: { glyph: 'md', gap: 0.5 },
  md: { glyph: 'xl', gap: 1 },
  lg: { glyph: '2xl', gap: 1 },
}

/**
 * `size` moves the mark and the gap between marks, and **nothing else**. There is no width
 * here: a mark is as wide as the glyph in it, which is what keeps a star and a heart the same
 * row without either being told how wide the other is.
 *
 * The two layers take the same size, because they are the same glyph — a fill layer one point
 * off would show a rim of the layer beneath it along every edge.
 */
function sizeAxis(step: SizeStep) {
  const { glyph, gap } = step

  return (theme: XAUITheme): SlotStyles<RatingSlot> => {
    const type = {
      fontSize: theme.fontSizes[glyph],
      lineHeight: theme.lineHeights[glyph],
    }

    return {
      root: { gap: theme.spacing(gap) },
      glyph: type,
      glyphFill: type,
    }
  }
}

export const ratingRecipe = createRecipe({
  slots: SLOTS,

  base: theme => ({
    root: { flexDirection: 'row', alignItems: 'center' },
    // A mark is as wide as its glyph, and the fill layer is positioned against its start
    // edge — `relative` is what that layer's `position: absolute` is measured from.
    item: { position: 'relative' },
    /**
     * The unfilled mark reads the **neutral fill** token rather than a faint version of the
     * filled colour: a pale tint of the accent under a row of stars looks like a control
     * that half failed to load, where a neutral one looks like a mark that is simply not
     * given yet. It is the same choice the `Carousel`'s inactive dots make.
     */
    glyph: {
      fontFamily: theme.fontFamilies.body,
      color: theme.colors.default,
    },
    glyphFill: { fontFamily: theme.fontFamilies.body },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({
    glyphFill: { color: colors.bgSelected },
  }),

  variants: {
    size: {
      xs: sizeAxis(SIZES.xs),
      sm: sizeAxis(SIZES.sm),
      md: sizeAxis(SIZES.md),
      lg: sizeAxis(SIZES.lg),
    },
  },

  states: {
    disabled: theme => ({ root: { opacity: theme.opacity.disabled } }),
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
