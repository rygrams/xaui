import { useCallback, useRef, useState } from 'react'
import { useControllableState } from '../../hooks/use-controllable-state'
import { nextSort, toggleEveryKey, toggleKey } from './selection'
import type { SelectionMode, SortDescriptor } from './selection'

const NO_KEYS: readonly string[] = []

export type TableStateOptions = {
  /** @default 'none' */
  selectionMode?: SelectionMode
  /** The chosen rows. Present means controlled. */
  selectedKeys?: readonly string[]
  defaultSelectedKeys?: readonly string[]
  onSelectionChange?: (keys: readonly string[]) => void
  /** Rows that cannot be chosen, and which `toggleAll` does not count. */
  disabledKeys?: readonly string[]
  /** The current sort, which the table only reports — it never reorders anything. */
  sortDescriptor?: SortDescriptor
  onSortChange?: (descriptor: SortDescriptor | undefined) => void
  /** Stops every toggle and every sort. */
  isDisabled?: boolean
}

export type TableState = {
  /** How wide each column is, by its position. `undefined` is an equal share. */
  widths: ReadonlyArray<number | undefined>
  /** How a column reports its width, from the header. */
  setWidth: (index: number, width: number | undefined) => void
  /** The chosen keys, controlled or not. */
  selectedKeys: readonly string[]
  /** Every row that registered an id, in mount order — what the header's box counts. */
  rowKeys: readonly string[]
  /** Called by a row with an id when it mounts; the returned function unregisters it. */
  registerRow: (id: string) => () => void
  /** One row pressed: `toggleKey` under the selection mode. */
  toggleRow: (id: string) => void
  /** The header's box pressed: `toggleEveryKey` over the registered rows. */
  toggleAll: () => void
  /** A column header pressed: reports `nextSort` through `onSortChange`. */
  sortBy: (column: string) => void
}

/**
 * The state behind a table, apart from how it is drawn: the column widths registered by
 * position, the rows registered by id, the selection and the sort. Native's `Table` runs
 * on it, and so does any table drawn elsewhere — which then chooses, counts and sorts
 * exactly as Native's does.
 *
 * React only, nothing rendered. Every function it returns is stable while its inputs are,
 * so a root can put them in a memoized context.
 *
 * ```tsx
 * const table = useTableState({ selectionMode, selectedKeys, onSelectionChange })
 * // header: table.setWidth(index, width) · row: table.registerRow(id), table.toggleRow(id)
 * ```
 */
export function useTableState({
  selectionMode = 'none',
  selectedKeys: controlledKeys,
  defaultSelectedKeys = NO_KEYS,
  onSelectionChange,
  disabledKeys = NO_KEYS,
  sortDescriptor,
  onSortChange,
  isDisabled = false,
}: TableStateOptions): TableState {
  const [selectedKeys, setSelectedKeys] = useControllableState<readonly string[]>({
    value: controlledKeys,
    defaultValue: defaultSelectedKeys,
    onChange: onSelectionChange,
  })

  const [widths, setWidths] = useState<ReadonlyArray<number | undefined>>([])

  const setWidth = useCallback((index: number, width: number | undefined) => {
    setWidths(current => {
      if (current[index] === width && index < current.length) return current

      const next = [...current]
      next[index] = width
      return next
    })
  }, [])

  // The rows in the order they mounted, which is the order they are on screen. A ref rather
  // than state: it changes while the body renders, and a `setState` there is a loop.
  const rows = useRef<string[]>([])
  const [rowKeys, setRowKeys] = useState<readonly string[]>(NO_KEYS)

  const registerRow = useCallback((id: string) => {
    rows.current = [...rows.current, id]
    // One render after the body has mounted, which is what the header's box needs and
    // nothing else does — so it is deferred rather than done during the row's own render.
    setRowKeys(rows.current)

    return () => {
      rows.current = rows.current.filter(existing => existing !== id)
      setRowKeys(rows.current)
    }
  }, [])

  const toggleRow = useCallback(
    (id: string) => {
      if (isDisabled || disabledKeys.includes(id)) return
      setSelectedKeys(current => toggleKey(current, id, selectionMode))
    },
    [disabledKeys, isDisabled, selectionMode, setSelectedKeys]
  )

  const toggleAll = useCallback(() => {
    if (isDisabled) return
    setSelectedKeys(current => toggleEveryKey(current, rowKeys, disabledKeys))
  }, [disabledKeys, isDisabled, rowKeys, setSelectedKeys])

  const sortBy = useCallback(
    (column: string) => {
      if (isDisabled) return
      onSortChange?.(nextSort(sortDescriptor, column))
    },
    [isDisabled, onSortChange, sortDescriptor]
  )

  return {
    widths,
    setWidth,
    selectedKeys,
    rowKeys,
    registerRow,
    toggleRow,
    toggleAll,
    sortBy,
  }
}
