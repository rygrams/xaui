import { forwardRef } from 'react'
import { View } from 'react-native'
import {
  isEveryKeySelected,
  isSomeKeySelected,
  useStyleProps,
} from '@xaui/native/system'
import { Checkbox } from '../checkbox'
import { useTable, useTableRow } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * A disabled table is dimmed once, by its root. The box greys and stops its press, and
 * keeps its full opacity rather than being dimmed a second time inside the first.
 */
const DIMMED_BY_THE_TABLE = { opacity: 1 } as const

/**
 * The box in the header that chooses every row — the Tram `Checkbox`.
 *
 * **Three states**: nothing, some — the bar — and all. Pressing it fills, or clears once
 * every row is chosen. It counts only rows that *can* be chosen, so a table with a
 * disabled row still has a box that can be filled. The tick is felt by the box itself.
 *
 * It renders nothing outside `selectionMode="multiple"`.
 */
export const TableSelectAllCell = forwardRef<View, TableViewProps>(
  function TableSelectAllCell({ children, style, ...props }, ref) {
    const {
      cellStyle,
      selectionWidth,
      check,
      selectionMode,
      selectedKeys,
      disabledKeys,
      rowKeys,
      toggleAll,
      isDisabled,
    } = useTable()
    const [styleProps, rest] = useStyleProps(props)

    if (selectionMode !== 'multiple') return null

    const isAll = isEveryKeySelected(selectedKeys, rowKeys, disabledKeys)
    const isSome = isSomeKeySelected(selectedKeys, rowKeys, disabledKeys)

    return (
      <View
        ref={ref}
        {...rest}
        style={[cellStyle, { width: selectionWidth }, styleProps, style]}
      >
        {children ?? (
          <Checkbox
            {...check}
            isSelected={isAll}
            isIndeterminate={isSome}
            isDisabled={isDisabled}
            style={isDisabled ? DIMMED_BY_THE_TABLE : undefined}
            onSelectedChange={toggleAll}
          />
        )}
      </View>
    )
  }
)

TableSelectAllCell.displayName = 'XAUI.Tram.Table.SelectAllCell'

/**
 * The box in a row — the Tram `Checkbox`, its hit area made up to 48 by the box itself.
 *
 * It reads its row rather than its position, so it works wherever in the row it is
 * written. Pressing the row does the same thing: a box the size of a fingertip inside a
 * row the size of a hand should not be the only way to choose one.
 */
export const TableSelectionCell = forwardRef<View, TableViewProps>(
  function TableSelectionCell({ children, style, ...props }, ref) {
    const {
      cellStyle,
      selectionWidth,
      check,
      selectionMode,
      toggleRow,
      isDisabled: isTableDisabled,
    } = useTable()
    const { id, isSelected, isDisabled } = useTableRow()
    const [styleProps, rest] = useStyleProps(props)

    if (selectionMode === 'none' || id === undefined) return null

    return (
      <View
        ref={ref}
        {...rest}
        style={[cellStyle, { width: selectionWidth }, styleProps, style]}
      >
        {children ?? (
          <Checkbox
            {...check}
            isSelected={isSelected}
            isDisabled={isDisabled}
            style={isTableDisabled ? DIMMED_BY_THE_TABLE : undefined}
            onSelectedChange={() => toggleRow(id)}
          />
        )}
      </View>
    )
  }
)

TableSelectionCell.displayName = 'XAUI.Tram.Table.SelectionCell'
