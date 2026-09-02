import type { XAUIColors, XAUITheme } from '../../theme/theme.type'
import type {
  Axes,
  RecipeConfig,
  ResolvedSelection,
  Selection,
  StateName,
  States,
  StyleFn,
  VariantRole,
  VariantTokens,
} from './recipe.type'

/**
 * Fixed, because two states can be active at once and the later one wins: a control that
 * is both pressed and disabled reads disabled.
 */
export const STATE_ORDER: readonly StateName[] = ['focused', 'pressed', 'disabled']

/**
 * `defaultVariants` under the caller's choices, skipping the keys the caller left
 * `undefined` — a component that forwards an unset prop must keep its default rather
 * than erase it.
 */
export function resolveSelection<Variant extends string, A extends Axes<string>>(
  defaultVariants: Selection<Variant, A> | undefined,
  selection: Selection<Variant, A> | undefined
): ResolvedSelection {
  const resolved: Record<string, string | undefined> = { ...defaultVariants }
  for (const [axis, value] of Object.entries(selection ?? {})) {
    if (value !== undefined) resolved[axis] = value as string
  }
  return resolved
}

/** Looks each named token up in the theme. Fails loudly — a typo is not a fallback. */
export function resolveVariantColors(
  tokens: VariantTokens | undefined,
  theme: XAUITheme
): Record<string, string> {
  const colors: Record<string, string> = {}
  for (const [role, token] of entriesOf(tokens)) {
    const value = theme.colors[token]
    if (value === undefined) {
      throw new Error(
        `XAUI: the recipe names "${token}" for its "${role}" role, but the theme has no ` +
          'such colour token. Check the spelling against XAUIColors.'
      )
    }
    colors[role] = value
  }
  return colors
}

/** The state functions that apply, in `STATE_ORDER`. Shared by both resolution passes. */
export function activeStateFns<Slot extends string>(
  states: Partial<Record<StateName, StyleFn<Slot>>> | undefined,
  active: States
): Array<StyleFn<Slot>> {
  const fns: Array<StyleFn<Slot>> = []
  for (const state of STATE_ORDER) {
    const fn = active[state] ? states?.[state] : undefined
    if (fn) fns.push(fn)
  }
  return fns
}

/**
 * The frozen resolution order:
 *
 *     base → paint → variants → compoundVariants → states
 *
 * `paint` sits with the variant because it *is* the variant's contribution, which leaves
 * a compound variant and a state free to override a colour it set. The slot's own props
 * and `style` come after all of this, at the call site — they always win.
 *
 * Axes are applied in declaration order, not sorted: when two axes touch the same
 * property, the author's order in `variants` is the answer. (The cache key sorts them
 * instead — see `cacheKey`.)
 */
export function collectStyleFns<
  Slot extends string,
  Variant extends string,
  A extends Axes<Slot>,
>(
  config: RecipeConfig<Slot, Variant, A>,
  selection: ResolvedSelection,
  states: States
): Array<StyleFn<Slot>> {
  const fns: Array<StyleFn<Slot>> = []

  if (config.base) fns.push(config.base)
  if (config.paint) fns.push(config.paint)

  for (const [axis, values] of Object.entries(config.variants ?? {})) {
    const value = selection[axis]
    const fn = value === undefined ? undefined : values[value]
    if (fn) fns.push(fn as StyleFn<Slot>)
  }

  for (const compound of config.compoundVariants ?? []) {
    if (appliesTo(compound.when, selection)) fns.push(compound.style)
  }

  return [...fns, ...activeStateFns(config.states, states)]
}

function appliesTo(
  when: Record<string, unknown>,
  selection: ResolvedSelection
): boolean {
  return Object.entries(when).every(([axis, value]) => selection[axis] === value)
}

function entriesOf(
  tokens: VariantTokens | undefined
): Array<[VariantRole, keyof XAUIColors]> {
  return Object.entries(tokens ?? {}) as Array<[VariantRole, keyof XAUIColors]>
}
