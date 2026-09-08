import type { XAUITheme } from '../../theme/theme.type'
import type {
  Axes,
  RecipeConfig,
  ResolvedStyles,
  Selection,
  SlotStyles,
  States,
  StyleFn,
  VariantColors,
} from './recipe.type'
import { warnDev } from '../../utils/warn-dev'
import { resolveTint } from './resolve-tint'
import { cacheKey, createStyleCache } from './style-cache'
import {
  activeStateFns,
  collectStyleFns,
  resolveSelection,
  resolveVariantColors,
} from './variant-map'

export type ResolveArgs<Variant extends string, A extends Axes<string>> = {
  theme: XAUITheme
  selection?: Selection<Variant, A>
  states?: States
}

export type TintArgs<Variant extends string, A extends Axes<string>> = ResolveArgs<
  Variant,
  A
> & { color: string }

export type Recipe<
  Slot extends string,
  Variant extends string,
  A extends Axes<Slot>,
> = {
  readonly slots: readonly Slot[]
  /** The cached pass: stable `StyleSheet` references, keyed by tokens alone. */
  resolve(args: ResolveArgs<Variant, A>): ResolvedStyles<Slot>
  /**
   * The tint pass: the same functions run again with `color`'s slices in place of the
   * theme's tokens. Uncached and allocating, and only ever called when `color` is set.
   */
  tint(args: TintArgs<Variant, A>): SlotStyles<Slot>
}

/**
 * A component's style, declared once. Resolution splits in two because the two halves
 * have different lifetimes: everything keyed by a finite token is cached forever, and
 * an arbitrary `color` is recomputed per render — which is what keeps the cache bounded
 * by the number of token combinations rather than by the palette users invent.
 *
 *     const styles = buttonRecipe.resolve({ theme, selection: { variant, size }, states })
 *     const tint = color ? buttonRecipe.tint({ theme, color, selection, states }) : undefined
 *     <View style={[styles.root, tint?.root, style]} />
 */
export function createRecipe<
  Slot extends string,
  Variant extends string,
  const A extends Axes<Slot>,
>(config: RecipeConfig<Slot, Variant, A>): Recipe<Slot, Variant, A> {
  const cache = createStyleCache(config.slots)

  /**
   * A recipe that paints has to say which variant it paints from.
   *
   * `resolveSelection` leaves `variant` `undefined` when neither the caller nor
   * `defaultVariants` names one, `variantTokens[undefined]` is nothing, and `paint` is then
   * handed an empty set of colours — so every colour it writes is `undefined`. Nothing
   * throws and nothing is logged: the control simply renders with no fill, which on a
   * white surface over a backdrop looks like a deliberate hole.
   *
   * It is checked here rather than per resolution because it is knowable at creation and
   * cannot change afterwards, so the warning fires once at import instead of once per
   * cache miss.
   */
  if (
    config.paint &&
    config.variantTokens &&
    config.defaultVariants?.variant === undefined
  ) {
    warnDev(
      `the recipe for slots [${config.slots.join(', ')}] declares \`paint\` and ` +
        '`variantTokens` but no `variant` in `defaultVariants`, so `paint` will be handed ' +
        'no colours unless a caller names a variant. Name the default one.'
    )
  }

  const tokensFor = (variant: string | undefined) =>
    variant === undefined ? undefined : config.variantTokens?.[variant as Variant]

  return {
    slots: config.slots,

    resolve({ theme, selection, states = {} }) {
      const resolved = resolveSelection(config.defaultVariants, selection)

      return cache.read(cacheKey(theme, resolved, states), () => {
        const colors = resolveVariantColors(tokensFor(resolved.variant), theme)
        return apply(collectStyleFns(config, resolved, states), theme, colors)
      })
    },

    tint({ theme, color, selection, states = {} }) {
      if (!config.paint) return {}

      const resolved = resolveSelection(config.defaultVariants, selection)
      const tokens = tokensFor(resolved.variant)
      if (!tokens) return {}

      // `paint` plus the active states, not the whole chain: those are the only steps
      // that read colours. The states run again so a pressed tinted control shifts the
      // same way a pressed token one does.
      const colors = resolveTint(tokens, color, theme)
      const fns = [config.paint, ...activeStateFns(config.states, states)]
      return apply(fns, theme, colors)
    },
  }
}

/**
 * Merged shallowly per slot: RN style values are flat, and the two that are not —
 * `shadowOffset` and `transform` — are whole values that a later step must replace
 * rather than blend into a half-set one.
 */
function apply<Slot extends string>(
  fns: Array<StyleFn<Slot>>,
  theme: XAUITheme,
  colors: VariantColors
): SlotStyles<Slot> {
  const merged: SlotStyles<Slot> = {}

  for (const fn of fns) {
    const produced = fn(theme, colors)
    for (const slot of Object.keys(produced) as Slot[]) {
      const style = produced[slot]
      if (!style) continue
      const previous = merged[slot]
      merged[slot] = previous ? { ...previous, ...style } : style
    }
  }

  return merged
}
