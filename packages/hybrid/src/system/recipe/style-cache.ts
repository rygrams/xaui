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
  read(key: string, build: () => SlotStyles<Slot>): ResolvedStyles<Slot>
  readonly size: number
  clear(): void
}

export function createStyleCache<Slot extends string>(
  slots: readonly Slot[]
): StyleCache<Slot> {
  const entries = new Map<string, ResolvedStyles<Slot>>()

  return {
    read(key, build) {
      const hit = entries.get(key)
      if (hit) return hit

      const built = build()
      const complete = {} as Record<Slot, SlotStyle>
      for (const slot of slots) complete[slot] = Object.freeze(built[slot] ?? {})
      const created = Object.freeze(complete) as ResolvedStyles<Slot>
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
