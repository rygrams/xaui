import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTable } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The column of rows inside the scroller — the header and the body, one above the other.
 * It is the node allowed to be **wider than the root**: give it a `minWidth` for columns
 * that should not squeeze below a legible width on a narrow phone.
 */
export const TableContent = forwardRef<View, TableViewProps>(function TableContent(
  { children, style, ...props },
  ref
) {
  const { contentStyle } = useTable()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[contentStyle, styleProps, style]}>
      {children}
    </View>
  )
})

TableContent.displayName = 'XAUI.Tram.Table.Content'
