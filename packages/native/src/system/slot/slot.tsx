import { cloneElement, forwardRef, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { mergeProps } from './merge-props'
import { mergeRefs } from './merge-refs'
import type { MergeableProps, PossibleRef } from './slot.type'

export type SlotProps = MergeableProps & { children?: ReactNode }

/**
 * The render branch behind `asChild` (R12). A root picks it instead of its own element:
 *
 * ```tsx
 * const Root = asChild ? Slot : Pressable
 * return <Root ref={ref} {...rootProps}>{children}</Root>
 * ```
 *
 * One line per root, which is the point — forty-seven roots each hand-rolling a
 * `cloneElement` and a ref merge would drift, and R12 has to hold uniformly from the
 * first component or the ref signature of the whole core changes later.
 */
export const Slot = forwardRef<unknown, SlotProps>(function Slot(
  { children, ...ours },
  ref
) {
  if (!isValidElement(children)) {
    throw new Error(
      'XAUI: asChild expects exactly one React element as its child, and merges the ' +
        "component's props into it. Text, a fragment, several children or none give it " +
        'nothing to merge into — drop `asChild` to render the component itself.'
    )
  }

  const child: ReactElement = children
  const merged = mergeProps(ours, child.props as MergeableProps)
  merged.ref = mergeRefs(ref, refOf(child))

  return cloneElement(child, merged)
})

Slot.displayName = 'XAUI.Slot'

/** React 19 passes `ref` as an ordinary prop; React 18 keeps it on the element. */
function refOf(element: ReactElement): PossibleRef<unknown> {
  const fromProps = (element.props as MergeableProps).ref
  const fromElement = (element as { ref?: unknown }).ref
  return (fromProps ?? fromElement) as PossibleRef<unknown>
}
