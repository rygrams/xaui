import { useCallback, useMemo, useRef, useState } from 'react'
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
 * `multiple` — owned by the caller or by us.
 *
 * Which half is controlled is decided on the first render and then held: a component that
 * changes hands mid-life produces a bug nobody can read from the call site.
 */
export function useExpansion({
  value,
  defaultValue,
  onValueChange,
  selectionMode,
  isCollapsible,
}: Options) {
  const isControlled = useRef(value !== undefined).current
  const [uncontrolled, setUncontrolled] = useState<AccordionValue>(
    () => defaultValue ?? (selectionMode === 'multiple' ? [] : '')
  )

  const current = isControlled ? (value as AccordionValue) : uncontrolled

  const isExpanded = useCallback(
    (item: string) =>
      Array.isArray(current) ? current.includes(item) : current === item,
    [current]
  )

  const toggle = useCallback(
    (item: string) => {
      const next = nextValue(current, item, selectionMode, isCollapsible)
      if (next === current) return
      if (!isControlled) setUncontrolled(next)
      onValueChange?.(next)
    },
    [current, isControlled, isCollapsible, onValueChange, selectionMode]
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
