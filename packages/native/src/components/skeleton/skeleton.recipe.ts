import { createRecipe, radiusAxis } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { SkeletonSlot, SkeletonVariant } from './skeleton.type'

const SLOTS = ['root'] as const

/**
 * Two lines of data — the two backgrounds a placeholder is ever drawn on.
 *
 * `default` is the neutral fill the rest of the library uses for a `secondary` `Button`,
 * which is exactly the grey a skeleton wants: it reads as a block on the page without
 * reading as a hole in it. `defaultSoft` is that same fill at half, for the placeholder
 * sitting on a surface that already carries a neutral.
 *
 * HeroUI reaches the same value from `muted` at 30% opacity. Naming the token instead is
 * what lets a theme move the skeleton by moving `default`, rather than by discovering
 * that a percentage of a text colour is where the placeholder grey came from.
 */
const VARIANT_TOKENS: Record<SkeletonVariant, VariantTokens> = {
  default: { bg: 'default' },
  secondary: { bg: 'defaultSoft' },
}

export const skeletonRecipe = createRecipe({
  slots: SLOTS,

  base: () => ({
    // Squircle corners, free on Android and what keeps a `full` radius from reading as a
    // stadium at small sizes. Nothing else: a skeleton has no size of its own — see the
    // component for why R14 is the whole sizing API here.
    root: { borderCurve: 'continuous' },
  }),

  variantTokens: VARIANT_TOKENS,

  paint: (_theme, colors) => ({ root: { backgroundColor: colors.bg } }),

  variants: { radius: radiusAxis<SkeletonSlot>('root') },

  /**
   * `md` is the block, and `full` is what an avatar placeholder passes. There is no `size`
   * default because there is no `size`: the caller gives the block its dimensions with
   * R14's `width` and `height`, because only they know the shape of the thing that is
   * missing.
   */
  defaultVariants: { variant: 'default', radius: 'md' },
})
