import type { ReactNode } from 'react'

/** A place one slot leaves an element in, for a sibling to render. */
export type NodeSlot = {
  get: () => ReactNode
  set: (node: ReactNode) => void
  subscribe: (listener: () => void) => () => void
}

/**
 * Where a slot hands an element to a sibling. The two sit side by side in the caller's
 * JSX and one has to be drawn inside the other — an unfolded list inside its field's
 * line, a dialog's backdrop inside its banner's `Modal`: the first publishes its element
 * here and the second renders it, with `useSyncExternalStore`. A store of its own rather
 * than the root's state, so that publishing re-renders the reader and not the slot that
 * published.
 */
export function createNodeSlot(): NodeSlot {
  let node: ReactNode = null
  const listeners = new Set<() => void>()

  return {
    get: () => node,
    set(next) {
      node = next
      listeners.forEach(listener => listener())
    },
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
  }
}
