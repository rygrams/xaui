import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { childrenToString } from '@xaui/native/system'
import { FabLabel } from './fab-label'
import { FabSpinner } from './fab-spinner'
import type { FabLabelProps } from './fab.type'

export type FabParts = {
  /** What is drawn in the circle. */
  glyph: ReactNode[]
  /** What is laid under it. */
  label: ReactNode
  /** The caller's own busy ring, or `null` for the default one. */
  spinner: ReactNode
  /** The label's text when it is plain text: what names the button. */
  name: string | null
}

/**
 * Sorts the root's direct children by where the `Fab` draws them: a `Fab.Label` under the
 * circle, a `Fab.Spinner` in the glyph's place while busy, everything else in the circle.
 * A bare string — alone, or beside the glyph — is the label's text, and draws nothing in
 * the circle: text there would not be inside a `Text`.
 */
export function partsOf(children: ReactNode): FabParts {
  const text = childrenToString(children)
  if (text !== null) return { glyph: [], label: text, spinner: null, name: text }

  const parts: FabParts = { glyph: [], label: null, spinner: null, name: null }

  for (const child of Children.toArray(children)) {
    if (typeof child === 'string' || typeof child === 'number') {
      parts.label = String(child)
      parts.name = String(child)
    } else if (isSlot<FabLabelProps>(child, FabLabel)) {
      parts.label = child
      parts.name = childrenToString(child.props.children)
    } else if (isSlot(child, FabSpinner)) {
      parts.spinner = child
    } else {
      parts.glyph.push(child)
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
