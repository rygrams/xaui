import { forwardRef } from 'react'
import { Text, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTable, useTableColumnIndex } from './table.context'
import { tableSheet } from './table.style'
import type { TableViewProps } from './table.type'

/**
 * One value. **Its width is its column's**, read by position: the two never name each
 * other, and a table stays aligned because both read the same registered number.
 *
 * A text child is set in `body` and cut to one line (R3). Anything else is rendered as it
 * is — a secondary line in grey, a `Chip`, a button — and is the caller's to set.
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
        width === undefined ? tableSheet.flexible : { width },
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

TableCell.displayName = 'XAUI.Tram.Table.Cell'
