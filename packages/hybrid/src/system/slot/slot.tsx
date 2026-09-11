import { cloneElement, forwardRef, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { mergeProps } from './merge-props'
import { mergeRefs } from './merge-refs'
import type { MergeableProps, PossibleRef } from './slot.type'

export type SlotProps = MergeableProps & { children?: ReactNode }

export const Slot = forwardRef<HTMLElement, SlotProps>(function Slot(
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

function refOf(element: ReactElement): PossibleRef<HTMLElement> {
  const fromProps = (element.props as MergeableProps).ref
  const fromElement = (element as { ref?: unknown }).ref
  return (fromProps ?? fromElement) as PossibleRef<HTMLElement>
}
