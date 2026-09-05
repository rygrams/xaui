import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { childrenToString } from '../../system/slot'

/**
 * The `value` and label of every `Select.Item` in a tree, read from the **elements**
 * rather than from mounted components.
 *
 * The trigger has to name the chosen row before that row has ever rendered: the list
 * lives in a portal that only mounts when it opens, so a select with a `defaultValue`
 * would show its placeholder until the user opened it once and closed it again. React
 * hands `Select.Content` its children as elements whatever it does with them, and a
 * label is a prop or a string child — both readable without mounting anything.
 *
 * A row wrapped in a component of the caller's own is not reachable this way, and that
 * is what `children` on `Select.Value` is for.
 */
export function collectItemLabels(
  children: ReactNode,
  isItem: (type: unknown) => boolean
): ReadonlyArray<readonly [string, string]> {
  const found: Array<readonly [string, string]> = []

  const walk = (node: ReactNode) => {
    Children.forEach(node, child => {
      if (!isValidElement(child)) return

      const props = child.props as {
        value?: string
        label?: string
        children?: ReactNode
      }

      if (isItem(child.type) && typeof props.value === 'string') {
        const label = props.label ?? childrenToString(props.children)
        if (label !== null && label !== undefined) found.push([props.value, label])
        return
      }

      walk(props.children)
    })
  }

  walk(children)

  return found
}
