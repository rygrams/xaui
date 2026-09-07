import { forwardRef } from 'react'
import { View } from 'react-native'
import { Checkbox } from '../checkbox'
import { useStyleProps } from '../../system/style-props'
import { isEveryKeySelected, isSomeKeySelected } from '../../utils/selection'
import { useTable, useTableRow } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The box in the header that chooses every row.
 *
 * **Three states, and the third is the one that matters**: nothing, some, all. A box that
 * only knew the first two would tell a reader who has chosen four of twenty rows that they
 * have chosen none.
 *
 * Pressing it fills or clears — and nothing wins when anything is already chosen, which is
 * what every reader expects from a half-filled box. It counts only rows that *can* be chosen,
 * so a table with a disabled row still has a box that can be filled.
 *
 * It renders nothing outside `selectionMode="multiple"`: choosing every row of a
 * single-selection table is not a thing that exists.
 */
export const TableSelectAllCell = forwardRef<View, TableViewProps>(
  function TableSelectAllCell({ children, style, ...props }, ref) {
    const {
      cellStyle,
      selectionWidth,
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
            isSelected={isAll}
            isIndeterminate={isSome}
            isDisabled={isDisabled}
            onSelectedChange={toggleAll}
            accessibilityLabel={undefined}
          />
        )}
      </View>
    )
  }
)

TableSelectAllCell.displayName = 'XAUI.Table.SelectAllCell'

/**
 * The box in a row.
 *
 * It reads its row rather than its position, so it works wherever in the row it is written —
 * a table whose boxes are on the trailing edge is the same JSX with this slot written last.
 *
 * Pressing the row does the same thing, and that is deliberate: a box the size of a fingertip
 * inside a row the size of a hand should not be the only way to choose one.
 */
export const TableSelectionCell = forwardRef<View, TableViewProps>(
  function TableSelectionCell({ children, style, ...props }, ref) {
    const { cellStyle, selectionWidth, selectionMode, toggleRow } = useTable()
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
            isSelected={isSelected}
            isDisabled={isDisabled}
            onSelectedChange={() => toggleRow(id)}
            accessibilityLabel={undefined}
          />
        )}
      </View>
    )
  }
)

TableSelectionCell.displayName = 'XAUI.Table.SelectionCell'
