import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTable } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The row under the body — a count, an action, a pager. **Outside the scroller**, which
 * is why it is written after `Table.ScrollContainer`: an action that slid off with a wide
 * table would be one nobody could reach. No line above it; the root's gap sets it off.
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

TableFooter.displayName = 'XAUI.Tram.Table.Footer'
