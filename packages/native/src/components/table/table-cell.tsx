import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTable, useTableColumnIndex } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * One value.
 *
 * **Its width is its column's**, read by position — the two never name each other, and a
 * table stays aligned because both run the same two lines against the same registered number.
 *
 * A text child is wrapped in the cell's own type and truncated to one line (R3): a row has a
 * fixed height, and a long value should be cut rather than deform the table. Anything else is
 * rendered as it is, which is how a cell carries a `Chip`, an `Avatar` or a button.
 */
export const TableCell = forwardRef<View, TableViewProps>(function TableCell(
  { children, style, ...props },
  ref
) {
  const { cellStyle, cellTextStyle, widths } = useTable()
  const index = useTableColumnIndex()
  const [styleProps, rest] = useStyleProps(props)

  const width = widths[index]

  return (
    <View
      ref={ref}
      {...rest}
      style={[
        cellStyle,
        width === undefined ? { flex: 1 } : { width },
        styleProps,
        style,
      ]}
    >
      {typeof children === 'string' || typeof children === 'number' ? (
        <Text style={cellTextStyle} numberOfLines={1}>
          {children}
        </Text>
      ) : (
        children
      )}
    </View>
  )
})

TableCell.displayName = 'XAUI.Table.Cell'
