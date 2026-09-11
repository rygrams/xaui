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

export const STATE_ORDER: readonly StateName[] = ['focused', 'pressed', 'disabled']

export function resolveSelection<
  Variant extends string,
  AxesType extends Axes<string>,
>(
  defaults: Selection<Variant, AxesType> | undefined,
  selection: Selection<Variant, AxesType> | undefined
): ResolvedSelection {
  const resolved: Record<string, string | undefined> = { ...defaults }
  for (const [axis, value] of Object.entries(selection ?? {})) {
    if (value !== undefined) resolved[axis] = value as string
  }
  return resolved
}

export function resolveVariantColors(
  tokens: VariantTokens | undefined,
  theme: XAUITheme
): Record<string, string> {
  const colors: Record<string, string> = {}
  for (const [role, token] of entriesOf(tokens)) {
    const value = theme.colors[token]
    if (value === undefined) {
      throw new Error(
        `XAUI: the recipe names "${token}" for its "${role}" role, but the theme has ` +
          'no such colour token. Check the spelling against XAUIColors.'
      )
    }
    colors[role] = value
  }
  return colors
}

export function activeStateFns<Slot extends string>(
  states: Partial<Record<StateName, StyleFn<Slot>>> | undefined,
  active: States
): Array<StyleFn<Slot>> {
  const functions: Array<StyleFn<Slot>> = []
  for (const state of STATE_ORDER) {
    const style = active[state] ? states?.[state] : undefined
    if (style) functions.push(style)
  }
  return functions
}

export function collectStyleFns<
  Slot extends string,
  Variant extends string,
  AxesType extends Axes<Slot>,
>(
  config: RecipeConfig<Slot, Variant, AxesType>,
  selection: ResolvedSelection,
  states: States
): Array<StyleFn<Slot>> {
  const functions: Array<StyleFn<Slot>> = []
  if (config.base) functions.push(config.base)
  if (config.paint) functions.push(config.paint)

  for (const [axis, values] of Object.entries(config.variants ?? {})) {
    const value = selection[axis]
    const style = value === undefined ? undefined : values[value]
    if (style) functions.push(style as StyleFn<Slot>)
  }

  for (const compound of config.compoundVariants ?? []) {
    if (appliesTo(compound.when, selection)) functions.push(compound.style)
  }
  return [...functions, ...activeStateFns(config.states, states)]
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
