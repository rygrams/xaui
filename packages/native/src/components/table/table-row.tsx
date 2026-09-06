import { Children, forwardRef, useEffect, useMemo } from 'react'
import { Pressable, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import {
  TableColumnIndexProvider,
  TableRowProvider,
  useTable,
} from './table.context'
import type { TableRowProps } from './table.type'

/**
 * One row.
 *
 * It counts its children so each cell knows its position, which is how it takes the width the
 * column above it declared.
 *
 * **It registers its id with the table**, which is the only way the header's box can know how
 * many rows there are — a header that counted its own children would count columns.
 *
 * With a `selectionMode` and an `id` it is pressable, and pressing it chooses it. Without
 * either it is a plain row and announces itself as nothing at all, which is what a row of
 * text should do.
 */
export const TableRow = forwardRef<View, TableRowProps>(function TableRow(
  { children, id, style, ...props },
  ref
) {
  const {
    rowStyle,
    rowSelectedStyle,
    selectionMode,
    selectedKeys,
    disabledKeys,
    registerRow,
    toggleRow,
    isDisabled,
  } = useTable()
  const [styleProps, rest] = useStyleProps(props)

  useEffect(() => {
    if (id === undefined) return

    return registerRow(id)
  }, [id, registerRow])

  const isSelected = id !== undefined && selectedKeys.includes(id)
  const isRowDisabled = isDisabled || (id !== undefined && disabledKeys.includes(id))
  const canPress = selectionMode !== 'none' && id !== undefined && !isRowDisabled

  const context = useMemo(
    () => ({ id, isSelected, isDisabled: isRowDisabled }),
    [id, isSelected, isRowDisabled]
  )

  const box = [isSelected ? rowSelectedStyle : rowStyle, styleProps, style]

  const cells = Children.map(children, (child, index) => (
    <TableColumnIndexProvider value={index}>{child}</TableColumnIndexProvider>
  ))

  return (
    <TableRowProvider value={context}>
      {canPress ? (
        <Pressable
          ref={ref}
          accessibilityRole="button"
          accessibilityState={{ selected: isSelected, disabled: isRowDisabled }}
          disabled={isRowDisabled}
          {...rest}
          style={box}
          onPress={() => toggleRow(id)}
        >
          {cells}
        </Pressable>
      ) : (
        <View ref={ref} {...rest} style={box}>
          {cells}
        </View>
      )}
    </TableRowProvider>
  )
})

TableRow.displayName = 'XAUI.Table.Row'
