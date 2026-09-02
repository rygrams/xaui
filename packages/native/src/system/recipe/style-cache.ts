import { StyleSheet } from 'react-native'
import type { XAUITheme } from '../../theme/theme.type'
import type {
  ResolvedSelection,
  ResolvedStyles,
  SlotStyle,
  SlotStyles,
  States,
} from './recipe.type'
import { STATE_ORDER } from './variant-map'

export type StyleCache<Slot extends string> = {
  /** Returns the cached entry, calling `build` only on a miss. */
  read(key: string, build: () => SlotStyles<Slot>): ResolvedStyles<Slot>
  /** Entry count — the cache's whole promise is that this stays bounded. */
  readonly size: number
  clear(): void
}

/**
 * One cache per recipe, held for the app's lifetime. `StyleSheet.create` therefore runs
 * once per token combination ever encountered, and slots read a stable reference after
 * that — which is what makes `React.memo` work and what keeps a press from allocating.
 *
 * Per recipe rather than one shared table, so two recipes cannot collide on a key that
 * describes only the theme, the variant and the axes.
 */
export function createStyleCache<Slot extends string>(
  slots: readonly Slot[]
): StyleCache<Slot> {
  const entries = new Map<string, ResolvedStyles<Slot>>()

  return {
    read(key, build) {
      const hit = entries.get(key)
      if (hit) return hit

      const built = build()
      // Every declared slot gets an entry, so `styles.spinner` is always a style object
      // and never `undefined` at a call site that renders the slot conditionally.
      const complete = {} as Record<Slot, SlotStyle>
      for (const slot of slots) complete[slot] = built[slot] ?? {}

      const created = StyleSheet.create(complete) as ResolvedStyles<Slot>
      entries.set(key, created)
      return created
    },
    get size() {
      return entries.size
    },
    clear() {
      entries.clear()
    },
  }
}

/**
 * `theme.mode` belongs in the key and is not a detail: `createTheme` hashes one config
 * into one `id` and returns both modes under it, so an id-only key would serve light
 * styles to a dark screen.
 *
 * `color` is deliberately absent — it takes arbitrary values (R7), and letting one into
 * the key would make the table grow with the colours users invent instead of with the
 * finite token combinations. It is applied in a second, uncached pass.
 *
 * Axis names are sorted here so the key does not depend on the order the caller happened
 * to pass its props in.
 */
export function cacheKey(
  theme: XAUITheme,
  selection: ResolvedSelection,
  states: States
): string {
  const axes = Object.keys(selection)
    .sort()
    .map(axis => `${axis}:${selection[axis] ?? '-'}`)
    .join('|')
  const active = STATE_ORDER.filter(state => states[state]).join(',')

  return `${theme.id}|${theme.mode}|${axes}|${active}`
}
