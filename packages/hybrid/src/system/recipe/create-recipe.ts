import type { XAUITheme } from '../../theme/theme.type'
import { resolveTint } from './resolve-tint'
import { cacheKey, createStyleCache } from './style-cache'
import {
  activeStateFns,
  collectStyleFns,
  resolveSelection,
  resolveVariantColors,
} from './variant-map'
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

export type ResolveArgs<Variant extends string, AxesType extends Axes<string>> = {
  theme: XAUITheme
  selection?: Selection<Variant, AxesType>
  states?: States
}

export type TintArgs<
  Variant extends string,
  AxesType extends Axes<string>,
> = ResolveArgs<Variant, AxesType> & { color: string }

export type Recipe<
  Slot extends string,
  Variant extends string,
  AxesType extends Axes<Slot>,
> = {
  readonly slots: readonly Slot[]
  resolve(args: ResolveArgs<Variant, AxesType>): ResolvedStyles<Slot>
  tint(args: TintArgs<Variant, AxesType>): SlotStyles<Slot>
}

export function createRecipe<
  Slot extends string,
  Variant extends string,
  const AxesType extends Axes<Slot>,
>(config: RecipeConfig<Slot, Variant, AxesType>): Recipe<Slot, Variant, AxesType> {
  const cache = createStyleCache(config.slots)
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
      const colors = resolveTint(tokens, color, theme)
      return apply(
        [config.paint, ...activeStateFns(config.states, states)],
        theme,
        colors
      )
    },
  }
}

function apply<Slot extends string>(
  functions: Array<StyleFn<Slot>>,
  theme: XAUITheme,
  colors: VariantColors
): SlotStyles<Slot> {
  const merged: SlotStyles<Slot> = {}
  for (const styleFunction of functions) {
    const produced = styleFunction(theme, colors)
    for (const slot of Object.keys(produced) as Slot[]) {
      const style = produced[slot]
      if (!style) continue
      const previous = merged[slot]
      merged[slot] = previous ? { ...previous, ...style } : style
    }
  }
  return merged
}
