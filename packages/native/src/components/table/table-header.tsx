import { Children, forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { TableColumnIndexProvider, useTable } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The row of column names.
 *
 * It counts its children so each column knows its position, which is how a width declared
 * here reaches the cell below it — a provider around each child rather than a clone of it,
 * for R1's reason.
 */
export const TableHeader = forwardRef<View, TableViewProps>(function TableHeader(
  { children, style, ...props },
  ref
) {
  const { headerStyle } = useTable()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View
      ref={ref}
      accessibilityRole="header"
      {...rest}
      style={[headerStyle, styleProps, style]}
    >
      {Children.map(children, (child, index) => (
        <TableColumnIndexProvider value={index}>{child}</TableColumnIndexProvider>
      ))}
    </View>
  )
})

TableHeader.displayName = 'XAUI.Table.Header'
