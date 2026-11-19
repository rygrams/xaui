/** One open at a time, or as many as the reader wants. */
export type ExpansionMode = 'single' | 'multiple'

/** A string in `single` mode, a list of them in `multiple`. `''` is nothing open. */
export type ExpansionValue = string | readonly string[]

/**
 * What is open after a press on `item` — pure, and the whole of the rule an accordion
 * follows. Returning `current` unchanged is how a press on the only open item is refused
 * when `isCollapsible` is off: the same reference, so a controllable state drops the set
 * and the caller's `onValueChange` never fires for a change that did not happen.
 */
export function nextExpansion(
  current: ExpansionValue,
  item: string,
  mode: ExpansionMode,
  isCollapsible: boolean
): ExpansionValue {
  if (mode === 'multiple') {
    const list = Array.isArray(current) ? current : current ? [current] : []
    if (!list.includes(item)) return [...list, item]
    if (!isCollapsible && list.length === 1) return current
    return list.filter(value => value !== item)
  }

  if (current !== item) return item
  return isCollapsible ? '' : current
}

/** Whether `item` is open in `current`, whichever shape the mode gave it. */
export function isExpandedIn(current: ExpansionValue, item: string): boolean {
  return Array.isArray(current) ? current.includes(item) : current === item
}
