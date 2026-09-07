import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTable } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The column of rows inside the scroller — the header and the body, one above the other.
 *
 * It is the node that is allowed to be **wider than the shell**, which is what the whole
 * three-node arrangement exists for. Give it a `minWidth` for a table whose columns should
 * not squeeze below a legible width on a narrow phone:
 *
 * ```tsx
 * <Table.Content minWidth={640}>
 * ```
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

TableContent.displayName = 'XAUI.Table.Content'
