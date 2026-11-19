import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { PivotHeader } from './pivot-header'
import { PivotSection } from './pivot-section'
import { PivotTitle } from './pivot-title'
import type { PivotSectionProps } from './pivot.type'

export type PivotParts = {
  /** Drawn above the row. */
  title: ReactNode
  /** Laid in the row, each where the loop puts it. */
  headers: ReactNode[]
  /** Laid in the body, one over the other. */
  sections: ReactNode[]
  /** The sections' values, in the order they are written: the loop's order. */
  values: string[]
}

/**
 * Sorts the root's direct children by where the `Pivot` draws them: a `Pivot.Title` on
 * top, the `Pivot.Header`s in the row under it, and everything else in the body — a
 * `Pivot.Section` named by its `value`. The order of the sections is the loop's; the
 * titles find their place in it by their `value`, whatever order they are written in.
 */
export function partsOf(children: ReactNode): PivotParts {
  const parts: PivotParts = { title: null, headers: [], sections: [], values: [] }

  for (const child of Children.toArray(children)) {
    if (isSlot(child, PivotTitle)) {
      parts.title = child
    } else if (isSlot(child, PivotHeader)) {
      parts.headers.push(child)
    } else {
      if (isSlot<PivotSectionProps>(child, PivotSection)) {
        parts.values.push(child.props.value)
      }
      parts.sections.push(child)
    }
  }

  return parts
}

function isSlot<Props>(
  child: ReactNode,
  slot: unknown
): child is ReactElement<Props> {
  return isValidElement(child) && child.type === slot
}
