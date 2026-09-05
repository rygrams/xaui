import { useCallback, useMemo } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
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
    (item: string) =>
      Array.isArray(current) ? current.includes(item) : current === item,
    [current]
  )

  // `setCurrent` drops a set to the value it already holds, so a press refused under
  // `isCollapsible={false}` — which is `nextValue` returning what it was given — never
  // reaches the caller's `onValueChange`. That refusal is the reason it returns the same
  // reference rather than an equal copy.
  const toggle = useCallback(
    (item: string) => {
      setCurrent(value_ => nextValue(value_, item, selectionMode, isCollapsible))
    },
    [isCollapsible, selectionMode, setCurrent]
  )

  return useMemo(() => ({ isExpanded, toggle }), [isExpanded, toggle])
}

/**
 * Pure, and the whole of the selection rule. Returning the value unchanged is how a press
 * on the only open item is refused when `isCollapsible` is off — the caller's
 * `onValueChange` never fires for a change that did not happen.
 */
export function nextValue(
  current: AccordionValue,
  item: string,
  selectionMode: AccordionSelectionMode,
  isCollapsible: boolean
): AccordionValue {
  if (selectionMode === 'multiple') {
    const list = Array.isArray(current) ? current : current ? [current] : []
    if (!list.includes(item)) return [...list, item]
    if (!isCollapsible && list.length === 1) return current
    return list.filter(value => value !== item)
  }

  if (current !== item) return item
  return isCollapsible ? '' : current
}
