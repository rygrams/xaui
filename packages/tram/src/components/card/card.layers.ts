import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'

/**
 * What marks a component as a card's background layer. The Native `Card`'s key, read
 * through the global registry: a background written for one card is a background for the
 * other, and a third party's own — a gradient, a video — opts in the same way.
 */
export const CARD_BACKGROUND = Symbol.for('xaui.Card.background')

/** Tags a component so the `Card` paints it under everything else. */
export function markBackground<T extends object>(component: T): T {
  return Object.assign(component, { [CARD_BACKGROUND]: true })
}

function isBackground(node: ReactNode): boolean {
  if (!isValidElement(node)) return false

  // A host element is a string and `Fragment` a symbol; neither can carry the mark.
  const type: unknown = node.type
  if (type === null || (typeof type !== 'function' && typeof type !== 'object')) {
    return false
  }

  return (type as Record<symbol, unknown>)[CARD_BACKGROUND] === true
}

/**
 * The card's children split into its background and the rest, so the background is
 * painted first **whatever order it was written in** — written after the header, it would
 * otherwise cover it. Only direct children are read, and only the first mark counts.
 */
export function partitionBackground(children: ReactNode): {
  background: ReactNode
  content: ReactNode
} {
  const all = Children.toArray(children)
  const index = all.findIndex(isBackground)

  // Untouched when there is none: the caller's keys, not the positional ones.
  if (index === -1) return { background: null, content: children }

  return {
    background: all[index],
    content: all.filter((_, at) => at !== index),
  }
}
