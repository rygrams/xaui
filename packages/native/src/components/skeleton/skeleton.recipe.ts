import { createRecipe, radiusAxis } from '../../system/recipe'
import type { VariantTokens } from '../../system/recipe'
import type { SkeletonSlot } from './skeleton.type'

const SLOTS = ['root'] as const

/**
 * One line, because the component has no `variant` to choose between — `SkeletonProps`
 * says why. `default` is the neutral fill the rest of the library uses for a `secondary`
 * `Button`, which is the grey a placeholder wants: a block on the page rather than a hole
 * in it. HeroUI reaches the same value from `muted` at 30% opacity; naming the token is
 * what lets a theme move the skeleton by moving `default`.
 *
 * The role is declared rather than the colour written into `paint`, because `resolveTint`
 * maps the roles a variant names and that mapping is what makes a raw `color` land here.
 */
const VARIANT_TOKENS = { default: { bg: 'default' } } satisfies Record<
  string,
  VariantTokens
>

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
  /**
   * `variant` is named here and nowhere else: there is one, the caller cannot choose it,
   * and the recipe still needs it selected for `paint` and the tint to resolve.
   */
  defaultVariants: { variant: 'default', radius: 'md' },
})
