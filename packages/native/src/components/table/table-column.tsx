import { forwardRef, useEffect } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTable, useTableColumnIndex } from './table.context'
import type { TableColumnProps } from './table.type'

/**
 * One column's name, and the press that sorts on it.
 *
 * **It declares the width and the cells below read it.** The registration is by *position*,
 * so a table stays aligned without a cell knowing anything about the column above it — and
 * without either of them naming the other.
 *
 * A text child is wrapped in the column's own label style (R3); anything else is rendered as
 * it is, for a header that carries a filter or a count.
 *
 * `allowsSorting` needs an `id`: the descriptor names a column, and a column with no name
 * cannot be in one.
 */
export const TableColumn = forwardRef<View, TableColumnProps>(function TableColumn(
  { children, id, width, allowsSorting = false, style, ...props },
  ref
) {
  const {
    columnStyle,
    columnLabelStyle,
    sortIndicatorStyle,
    setWidth,
    sortDescriptor,
    sortBy,
    isDisabled,
  } = useTable()
  const index = useTableColumnIndex()
  const [styleProps, rest] = useStyleProps(props)

  useEffect(() => {
    setWidth(index, width)
  }, [index, setWidth, width])

  const isSorted = allowsSorting && id !== undefined && sortDescriptor?.column === id
  const canSort = allowsSorting && id !== undefined && !isDisabled

  const box = [
    columnStyle,
    // A width, or an equal share of what is left. The same two lines a cell runs, and the
    // reason they agree is that both read the same registered number.
    width === undefined ? { flex: 1 } : { width },
    styleProps,
    style,
  ]

  const label =
    typeof children === 'string' || typeof children === 'number' ? (
      <Text style={columnLabelStyle} numberOfLines={1}>
        {children}
      </Text>
    ) : (
      children
    )

  const mark = isSorted ? (
    <View
      style={[
        sortIndicatorStyle,
        // The same triangle, turned over. A second glyph for "descending" would be a second
        // thing to keep in step with the first.
        sortDescriptor?.direction === 'descending'
          ? { transform: [{ rotate: '180deg' }] }
          : null,
      ]}
    />
  ) : null

  if (!canSort) {
    return (
      <View ref={ref} {...rest} style={box}>
        {label}
        {mark}
      </View>
    )
  }

  return (
    <Pressable
      ref={ref}
      accessibilityRole="button"
      accessibilityState={{
        // What a screen reader says a sortable header is: not chosen, ascending, descending.
        selected: isSorted,
        disabled: isDisabled,
      }}
      {...rest}
      style={box}
      onPress={() => sortBy(id)}
    >
      {label}
      {mark}
    </Pressable>
  )
})

TableColumn.displayName = 'XAUI.Table.Column'
