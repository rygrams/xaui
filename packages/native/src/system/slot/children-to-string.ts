import { isValidElement } from 'react'
import type { ReactNode } from 'react'

/**
 * R3: the string a root should wrap in its default text slot, or `null` when it should
 * render its children as they are.
 *
 * The whole tree is stringified recursively rather than the first child inspected. That
 * is what makes `<Button>{count} items</Button>` work — children there are the array
 * `[3, ' items']`, and an `isValidElement` check on the first entry would call it an
 * element-free tree only by accident, while a check for "is the first child a string"
 * would miss it outright.
 *
 * `null` for an empty result as much as for a tree containing an element: in both cases
 * there is nothing to wrap, and a root's fallback — render the children — is right for
 * both. It also keeps `<Button>{false}</Button>` from mounting an empty text node.
 */
export function childrenToString(children: ReactNode): string | null {
  const text = stringify(children)
  return text === null || text === '' ? null : text
}

function stringify(node: ReactNode): string | null {
  // What React itself renders as nothing.
  if (node === null || node === undefined || typeof node === 'boolean') return ''

  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)

  // Any element — a fragment included — means the tree is not text.
  if (isValidElement(node)) return null

  if (Array.isArray(node)) {
    let text = ''
    for (const child of node) {
      const part = stringify(child as ReactNode)
      if (part === null) return null
      text += part
    }
    return text
  }

  // An iterable, a portal, a promise: renderable, but not text this can flatten.
  return null
}
