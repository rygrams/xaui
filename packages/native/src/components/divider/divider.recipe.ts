import { StyleSheet } from 'react-native'
import { createRecipe } from '../../system/recipe'
import type { SlotStyles, VariantTokens } from '../../system/recipe'
import type { XAUITheme } from '../../theme/theme.type'
import type { DividerSlot, DividerVariant } from './divider.type'

const SLOTS = ['root'] as const

/**
 * Three lines of data, and the three separator tokens in the order they get more visible.
 * `bg` and not `border`: a rule is a filled box one point tall, not a box with an edge —
 * a border would give it a second colour on the three sides it does not have.
 *
 * A raw `color` reads the same role, so tinting any variant tints it the same way.
 */
const VARIANT_TOKENS: Record<DividerVariant, VariantTokens> = {
  default: { bg: 'separator' },
  secondary: { bg: 'separatorSecondary' },
  tertiary: { bg: 'separatorTertiary' },
}

/**
 * The thinnest line the screen can draw. It is a platform constant rather than a token
 * for the same reason `borderTopColor: 'transparent'` is one on the `Spinner`: it is
 * structural. A hairline is one device pixel — 0.33 at 3× — and no theme has an opinion
 * about what a device pixel is.
 */
const HAIRLINE = StyleSheet.hairlineWidth

/**
 * `size` is the thickness, on whichever axis the orientation leaves for it.
 *
 * Both keys are written here and the orientation axis below releases the wrong one — that
 * is what turns what would be eight `size × orientation` compounds into four lines and
 * two. Declaration order is application order, so `orientation` runs second and always
 * wins on the axis it frees.
 *
 * `xs` is HeroUI's `thin` and `lg` is their `thick`, six points, with the two steps our
 * ladder puts between them.
 */
function thickness(of: (theme: XAUITheme) => number) {
  return (theme: XAUITheme): SlotStyles<DividerSlot> => {
    const value = of(theme)
    return { root: { height: value, width: value } }
  }
}

export const dividerRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    // One line for both orientations. In a column the cross axis is horizontal, so a
    // stretched child is full width; in a row it is vertical, so the same word makes a
    // vertical rule full height. `stretch` is ignored on the axis the thickness fixes,
    // which is what lets one declaration serve both.
    root: { alignSelf: 'stretch' },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({ root: { backgroundColor: colors.bg } }),

  variants: {
    // Multiples of `borderWidth.default`, so a theme that thickens its edges thickens
    // these with it. Only the hairline stands outside the scale, being a device pixel.
    size: {
      xs: thickness(() => HAIRLINE),
      sm: thickness(theme => theme.borderWidth.default),
      md: thickness(theme => theme.borderWidth.default * 2),
      lg: thickness(theme => theme.borderWidth.default * 6),
    },

    /** Second, so it releases the axis `size` had to write blind. */
    orientation: {
      horizontal: () => ({ root: { width: 'auto' } }),
      vertical: () => ({ root: { height: 'auto' } }),
    },
  },

  /**
   * `xs` where every other component defaults to `md`, and it is the one place in the
   * library that departs from that: a rule you notice is a rule that is too thick, and
   * the hairline is what a separator is at rest.
   */
  defaultVariants: { variant: 'default', size: 'xs', orientation: 'horizontal' },
})
