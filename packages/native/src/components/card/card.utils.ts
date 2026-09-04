import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'

/**
 * What marks a component as the card's background layer.
 *
 * `Symbol.for` rather than an identity check against `CardBackground`: the registry is
 * global, so two copies of `@xaui/native` in one tree still agree on what a background is,
 * and a third party writing their own — a gradient, a video, a blur — opts into the same
 * treatment instead of being a second-class citizen. It is the bargain
 * `system/pressable-feedback/` already struck for its overlays.
 */
export const CARD_BACKGROUND = Symbol.for('xaui.Card.background')

/** Tags a component so `Card` paints it under everything else. */
export function markBackground<T extends object>(component: T): T {
  return Object.assign(component, { [CARD_BACKGROUND]: true })
}

function isBackground(node: ReactNode): boolean {
  if (!isValidElement(node)) return false

  // A host element is a string and `Fragment` is a symbol; neither can carry the mark.
  const type: unknown = node.type
  if (typeof type !== 'function' && typeof type !== 'object') return false
  if (type === null) return false

  return (type as Record<symbol, unknown>)[CARD_BACKGROUND] === true
}

/**
 * Splits the root's children into the background layer and everything else, so the card
 * paints it first **whatever order it was written in**.
 *
 * Without this, source order would decide the stacking: a `Card.Background` written after
 * the header would sit over it and hide the card's own content, which is exactly the
 * invisible ordering rule composition should not carry. HeroUI avoids the same trap by
 * making the background a **prop** rather than a child; hoisting keeps it a child, which
 * is what R1 asks for.
 *
 * Only direct children are inspected, and only the first mark wins — two backgrounds is a
 * caller error, and painting both would stack them silently.
 */
export function partitionBackground(children: ReactNode): {
  background: ReactNode
  content: ReactNode
} {
  const all = Children.toArray(children)
  const index = all.findIndex(isBackground)

  // The common case — no background at all. Returning `children` untouched keeps the tree
  // exactly as written, with the caller's own keys rather than the positional ones
  // `Children.toArray` assigns.
  if (index === -1) return { background: null, content: children }

  return {
    background: all[index],
    content: all.filter((_, at) => at !== index),
  }
}
