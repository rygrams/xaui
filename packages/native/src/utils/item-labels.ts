import { Children, isValidElement } from 'react'
import type { ReactNode } from 'react'
import { childrenToString } from '../system/slot'

/**
 * The `value` and label of every row in a tree, read from the **elements** rather than from
 * mounted components.
 *
 * A trigger has to name the chosen row before that row has ever rendered: the list lives in
 * a portal that only mounts when it opens, so a control with a `defaultValue` would show
 * its placeholder until the user opened it once and closed it again. React hands the
 * content its children as elements whatever it does with them, and a label is a prop or a
 * string child — both readable without mounting anything.
 *
 * A row wrapped in a component of the caller's own is not reachable this way, which is what
 * a `children` escape hatch on the value slot is for.
 *
 * Shared by the `Select` and the `Autocomplete`: the same trigger, the same portal, the
 * same problem. §2 bis — promotion at the second use.
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
        const label = readItemLabel(props)
        if (label !== undefined) found.push([props.value, label])
        return
      }

      walk(props.children)
    })
  }

  walk(children)

  return found
}

/** A row's label: the prop if it has one, else whatever its children stringify to. */
export function readItemLabel(props: {
  label?: string
  children?: ReactNode
}): string | undefined {
  return props.label ?? childrenToString(props.children) ?? undefined
}
