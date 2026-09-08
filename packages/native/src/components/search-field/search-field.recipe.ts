// Deep import — the `system/close-button` barrel pulls the base component in, and a
// recipe only wants the geometry.
import { closeButtonGeometry } from '../../system/close-button/close-button.recipe'
import { createRecipe } from '../../system/recipe'
import { FIELD_GLYPH_SIZES } from '../text-field'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { Size, XAUITheme } from '../../theme/theme.type'
import type { SearchFieldSlot, SearchFieldVariant } from './search-field.type'

const SLOTS = ['field', 'clear', 'clearGlyph'] as const

/**
 * The fill, and nothing else.
 *
 * Everything else the box wears — the border, the radius, the type, the focus, the error
 * and the disabled wash — is the `TextField`'s recipe, resolved once on the root below,
 * which is handed `variant="tertiary"`: the edge and the focus colour with no fill and no
 * shadow. What is genuinely this component's is which fill goes over it, and there are two
 * of them.
 *
 * Because `bg` is a declared role, a raw `color` lands on the fill here the same way it
 * lands on a `Button`'s — and `defaultSoft` carries its own suffix, so a tinted
 * `secondary` washes rather than fills, with no per-variant instruction saying so.
 */
const VARIANT_TOKENS: Record<SearchFieldVariant, VariantTokens> = {
  primary: { bg: 'fieldBackground' },
  secondary: { bg: 'defaultSoft' },
}

/**
 * The cross is drawn inside the mark's box, and a bar rotated a quarter turn spans
 * `length / √2` on each axis — so the bar is longer than the cross it draws. It is the
 * `CloseButton`'s own ratio, kept as a ratio for the same reason: one cross at four sizes
 * rather than four drawings.
 */
const BAR_RATIO = 16 / 32

function sizeAxis(size: Size) {
  return (theme: XAUITheme): SlotStyles<SearchFieldSlot> => {
    // The magnifier's own height, not a ladder of this recipe's: `FieldGroup.Icon` takes
    // the field's `glyph` step, and a cross a size away from the mark on the other edge
    // reads as two icon sets in one box.
    const side = theme.fontSizes[FIELD_GLYPH_SIZES[size]]

    return {
      clear: { width: side, height: side },
      clearGlyph: { width: Math.round(side * BAR_RATIO) },
    }
  }
}

export const searchFieldRecipe = createRecipe({
  slots: SLOTS,

  base: theme => {
    // The bar's thickness and the box's centring belong to the shared close button, not
    // to this recipe; the two slots are renamed because this cross clears a query rather
    // than dismissing the field.
    const shared = closeButtonGeometry(theme)

    return {
      clear: shared.close,
      // The cross sits with the magnifier rather than with the query: both are decoration
      // for the text, not text. It is the colour `FieldGroup.Icon` gives the mark on the
      // other edge, and the two read as one icon set.
      clearGlyph: {
        ...shared.closeGlyph,
        backgroundColor: theme.colors.fieldPlaceholder,
      },
    }
  },

  variantTokens: VARIANT_TOKENS,

  /**
   * No border and no foreground: the edge is the `TextField`'s `tertiary`, so restating a
   * colour here would write over the one focus and `isInvalid` had just set — the fill is
   * layered *after* the box's own style, and last writer wins.
   */
  paint: (_theme, colors) => ({ field: { backgroundColor: colors.bg } }),

  variants: {
    size: {
      xs: sizeAxis('xs'),
      sm: sizeAxis('sm'),
      md: sizeAxis('md'),
      lg: sizeAxis('lg'),
    },
  },

  defaultVariants: { variant: 'primary', size: 'md' },
})
