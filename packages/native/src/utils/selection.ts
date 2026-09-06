/** How many rows may be chosen at once. */
export type SelectionMode = 'none' | 'single' | 'multiple'

/** Which column a table is sorted on, and which way. */
export type SortDescriptor = {
  column: string
  direction: 'ascending' | 'descending'
}

/**
 * The keys after pressing one row.
 *
 * `single` replaces rather than adds, and **pressing the chosen row again clears it** — a
 * single-selection list with no way back to none is a list a reader can only get wrong once.
 * `multiple` toggles. `none` is unreachable from a press and returns what it was given, so a
 * caller need not branch before calling.
 *
 * A new array every time it changes and the **same array when it does not**, which is what
 * lets a memoized row skip a render on a press that did not touch it.
 */
export function toggleKey(
  keys: readonly string[],
  key: string,
  mode: SelectionMode
): readonly string[] {
  if (mode === 'none') return keys

  const isChosen = keys.includes(key)

  if (mode === 'single') return isChosen ? EMPTY : [key]

  return isChosen ? keys.filter(existing => existing !== key) : [...keys, key]
}

/** Nothing chosen, as one shared array — a new `[]` per call would re-render every row. */
const EMPTY: readonly string[] = []

/**
 * Whether every row that *can* be chosen already is.
 *
 * Disabled rows are not counted, which is the only reading that makes the header's box
 * usable: a table with one disabled row would otherwise show a box that can never be filled.
 *
 * A table with nothing selectable in it is **not** "all selected" — an empty tick is a lie
 * about a table with no rows.
 */
export function isEveryKeySelected(
  keys: readonly string[],
  rowKeys: readonly string[],
  disabledKeys: readonly string[] = []
): boolean {
  const selectable = rowKeys.filter(key => !disabledKeys.includes(key))

  return selectable.length > 0 && selectable.every(key => keys.includes(key))
}

/** Whether some but not all are — the third state a header's box has to show. */
export function isSomeKeySelected(
  keys: readonly string[],
  rowKeys: readonly string[],
  disabledKeys: readonly string[] = []
): boolean {
  const selectable = rowKeys.filter(key => !disabledKeys.includes(key))

  return (
    selectable.some(key => keys.includes(key)) &&
    !isEveryKeySelected(keys, rowKeys, disabledKeys)
  )
}

/**
 * The keys after pressing the header's box.
 *
 * All or nothing, and **nothing wins when anything is already chosen** — a half-filled box
 * that fills the rest on a press is the behaviour every reader expects from it, and clearing
 * from full is the way back.
 *
 * Keys already chosen that are *not* in the table are kept: a table showing one page of a
 * filtered list must not clear a choice made on another page.
 */
export function toggleEveryKey(
  keys: readonly string[],
  rowKeys: readonly string[],
  disabledKeys: readonly string[] = []
): readonly string[] {
  const selectable = rowKeys.filter(key => !disabledKeys.includes(key))
  const elsewhere = keys.filter(key => !rowKeys.includes(key))

  if (isEveryKeySelected(keys, rowKeys, disabledKeys)) return elsewhere

  return [...elsewhere, ...selectable.filter(key => !elsewhere.includes(key))]
}

/**
 * The sort after pressing a column's header.
 *
 * A new column starts ascending, the same column turns round, and **a descending column
 * pressed a third time clears the sort** — every table that cannot get back to its own order
 * makes a reader reload the screen to do it.
 */
export function nextSort(
  current: SortDescriptor | undefined,
  column: string
): SortDescriptor | undefined {
  if (current?.column !== column) return { column, direction: 'ascending' }
  if (current.direction === 'ascending') return { column, direction: 'descending' }

  return undefined
}
