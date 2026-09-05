/** The selection rule, and the whole of it. */

export type TagSelectionMode = 'none' | 'single' | 'multiple'

/**
 * What is selected after one tag is pressed.
 *
 * Returns the list **unchanged** when the press changes nothing, which is how a caller's
 * `onSelectionChange` never fires for a change that did not happen: `none` refuses every
 * press, and `single` on the already-selected tag deselects it unless that would leave the
 * group empty and the caller asked it not to.
 */
export function nextSelection(
  selected: readonly string[],
  id: string,
  mode: TagSelectionMode,
  isDeselectable: boolean
): readonly string[] {
  if (mode === 'none') return selected

  const has = selected.includes(id)

  if (mode === 'single') {
    if (!has) return [id]
    return isDeselectable ? [] : selected
  }

  if (!has) return [...selected, id]
  if (!isDeselectable && selected.length === 1) return selected
  return selected.filter(key => key !== id)
}
