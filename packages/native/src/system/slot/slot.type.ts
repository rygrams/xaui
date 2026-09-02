import type { Ref } from 'react'

/** Anything React accepts as a ref, plus the absence of one. */
export type PossibleRef<T> = Ref<T> | undefined

/**
 * The props `mergeProps` knows how to combine. Deliberately loose: it merges whatever a
 * root hands to whatever child it was given, and neither side is knowable from here.
 */
export type MergeableProps = Record<string, unknown>

export type AsChildProps = {
  /**
   * Merge this component's props into its single child instead of rendering an element
   * of its own — a navigation `Link` as a `Button`, a bespoke trigger as a `Select`.
   */
  asChild?: boolean
}
