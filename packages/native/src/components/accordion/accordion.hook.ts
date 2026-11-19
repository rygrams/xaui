import { useCallback, useMemo } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { isExpandedIn, nextExpansion } from '../../system/expansion'
import type { AccordionSelectionMode, AccordionValue } from './accordion.type'

type Options = {
  value: AccordionValue | undefined
  defaultValue: AccordionValue | undefined
  onValueChange: ((value: AccordionValue) => void) | undefined
  selectionMode: AccordionSelectionMode
  isCollapsible: boolean
}

/**
 * What is open, in whichever shape the mode calls for — a string in `single`, a list in
 * `multiple`. The controlled/uncontrolled half is `useControllableState`'s, shared with
 * every other component that has one; only the rule below is this component's own.
 */
export function useExpansion({
  value,
  defaultValue,
  onValueChange,
  selectionMode,
  isCollapsible,
}: Options) {
  const [current, setCurrent] = useControllableState<AccordionValue>({
    value,
    defaultValue: defaultValue ?? (selectionMode === 'multiple' ? [] : ''),
    onChange: onValueChange,
  })

  const isExpanded = useCallback(
    (item: string) => isExpandedIn(current, item),
    [current]
  )

  // `setCurrent` drops a set to the value it already holds, so a press refused under
  // `isCollapsible={false}` — which is `nextExpansion` returning what it was given — never
  // reaches the caller's `onValueChange`. That refusal is the reason it returns the same
  // reference rather than an equal copy.
  const toggle = useCallback(
    (item: string) => {
      setCurrent(value_ => nextExpansion(value_, item, selectionMode, isCollapsible))
    },
    [isCollapsible, selectionMode, setCurrent]
  )

  return useMemo(() => ({ isExpanded, toggle }), [isExpanded, toggle])
}
