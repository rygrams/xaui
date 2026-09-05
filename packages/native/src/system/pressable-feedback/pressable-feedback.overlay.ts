import { Children, Fragment, createElement, isValidElement } from 'react'
import type { ReactNode } from 'react'

/**
 * What marks a component as a press overlay.
 *
 * `Symbol.for` rather than a boolean field or an identity check against our own two
 * components: the registry is global, so two copies of `@xaui/native` in one tree still
 * agree on what an overlay is, and a third party writing their own overlay — anything that
 * reads `useFeedback()` and paints under the content — opts into the same treatment
 * instead of being a second-class citizen.
 */
export const FEEDBACK_OVERLAY = Symbol.for('xaui.PressableFeedback.overlay')

/** Tags a component so `PressableFeedback` paints it under its content. */
export function markOverlay<T extends object>(component: T): T {
  return Object.assign(component, { [FEEDBACK_OVERLAY]: true })
}

/**
 * A **bare** overlay: marked, and carrying no children of its own.
 *
 * The children matter. An overlay written as a wrapper already contains the content it
 * sits under, so it defines its own order and hoisting it would drag that content ahead of
 * the root's other children — `<Spinner /><Ripple><Label /></Ripple>` would render the
 * label before the spinner. Only the self-closing form needs rescuing from source order.
 */
function isBareOverlay(node: ReactNode): boolean {
  if (!isValidElement<{ children?: ReactNode }>(node)) return false

  // A host element is a string and `Fragment` is a symbol; neither can carry the mark.
  const type: unknown = node.type
  if (typeof type !== 'function' && typeof type !== 'object') return false
  if (type === null) return false
  if ((type as Record<symbol, unknown>)[FEEDBACK_OVERLAY] !== true) return false

  return node.props.children === undefined
}

/**
 * Splits the root's children into the bare overlays and everything else, so the root can
 * paint those overlays first **whatever order they were written in**.
 *
 * Without this, source order decides the stacking: a `Ripple` written after the label sits
 * on top of it rather than under it, and a 10% wash over the text is exactly subtle enough
 * to be shipped by accident. Composition should not carry an invisible ordering rule.
 *
 * A wrapping overlay — `<Ripple>{children}</Ripple>` — is left where it is, because it
 * already puts itself under the content it was given.
 *
 * Only direct children are inspected. An overlay wrapped in a `Fragment` keeps source
 * order: descending would mean re-keying a fragment's children into their parent's list,
 * where they can collide with a sibling fragment's, and no real call site needs it — an
 * overlay is written next to the content, and a conditional one (`{isX && <Ripple />}`) is
 * still a direct child.
 */
export function partitionOverlays(children: ReactNode): {
  overlays: ReactNode
  content: ReactNode
} {
  const all = Children.toArray(children)
  const overlays = all.filter(isBareOverlay)

  // The common case — a component that mounts none, or wraps instead. Returning `children`
  // untouched keeps the tree exactly as written, with the caller's own keys rather than
  // the positional ones `Children.toArray` assigns.
  if (overlays.length === 0) return { overlays: null, content: children }

  return { overlays, content: all.filter(node => !isBareOverlay(node)) }
}

/**
 * What the root actually renders, as **one** node.
 *
 * Written as a single value rather than as `{overlays}{content}` in the JSX, because those
 * are two expression children and React hands two children to the root as an *array*.
 * Under `asChild` the root is a `Slot`, which merges into one element and has nothing to
 * merge into an array — so every pressable's `asChild` threw, whether or not it composed
 * an overlay: with none, `partitionOverlays` still returns `overlays: null`, and
 * `[null, content]` is an array all the same.
 *
 * `asChild` also skips the partition entirely. The caller's element *is* the pressable, so
 * there is no sibling slot to hoist an overlay into — an overlay written inside that
 * element belongs to it, and pulling it out would make it a sibling of the very element it
 * was composed into. It reads the feedback context, which is published above the root and
 * descends into it regardless of where it sits.
 */
export function feedbackChildren(children: ReactNode, asChild: boolean): ReactNode {
  if (asChild) return children

  const { overlays, content } = partitionOverlays(children)
  if (overlays === null) return content

  // Positional children rather than an array literal: React keys an array's entries and
  // would warn about these two, where `createElement`'s trailing arguments need none.
  return createElement(Fragment, null, overlays, content)
}
