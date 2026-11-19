import { Children, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

/**
 * The first child of `type` among `children` — a slot written once to draw every header
 * or every key — or `fallback`, the slot as it is, when none was written.
 */
export function childOfType(
  children: ReactNode,
  type: unknown,
  fallback: ReactElement
): ReactElement {
  const found = Children.toArray(children).find(
    child => isValidElement(child) && child.type === type
  )

  return isValidElement(found) ? found : fallback
}
