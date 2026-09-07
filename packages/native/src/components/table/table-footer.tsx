import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { useTable } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The row under the body — a count, a pager, a total.
 *
 * **Outside the scroller**, which is why it is written after `Table.ScrollContainer` rather
 * than inside it: a pager that slid off the screen with a wide table would be a pager nobody
 * could reach.
 */
export const TableFooter = forwardRef<View, TableViewProps>(function TableFooter(
  { children, style, ...props },
  ref
) {
  const { footerStyle } = useTable()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View ref={ref} {...rest} style={[footerStyle, styleProps, style]}>
      {children}
    </View>
  )
})

TableFooter.displayName = 'XAUI.Table.Footer'
