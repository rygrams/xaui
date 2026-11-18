import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { childrenToString } from '@xaui/native/system'

/** What separates two values in a listing's `order`: nothing a value is made of. */
export const ORDER_SEPARATOR = '\u0000'

export type ReadItem = { value: string; label?: string }

type ItemProps = { value?: unknown; label?: string; children?: ReactNode }

/**
 * The items of a list, read off the elements rather than off mounted components: how
 * many there are decides how the list opens, and the field has to name the chosen one
 * before a page that is not open yet has rendered it.
 *
 * An item wrapped in a component of the caller's is not reached this way — which is what
 * `mode` on `Select.Content` and `children` on `Select.Value` are for.
 */
export function readItems(
  children: ReactNode,
  isItem: (type: unknown) => boolean
): ReadItem[] {
  const found: ReadItem[] = []

  const walk = (node: ReactNode) => {
    Children.forEach(node, child => {
      if (!isValidElement<ItemProps>(child)) return

      const { value, label, children: inside } = child.props

      if (isItem(child.type) && typeof value === 'string') {
        found.push({ value, label: label ?? labelIn(inside) })
        return
      }

      walk(inside)
    })
  }

  walk(children)

  return found
}

/** A function child draws its own row: there is no text to read off it. */
function labelIn(children: unknown): string | undefined {
  if (typeof children === 'function') return undefined

  return childrenToString(children as ReactNode) ?? undefined
}
