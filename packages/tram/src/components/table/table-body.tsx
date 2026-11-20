import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import type { AsChildProps } from '@xaui/native/system'
import { useTable } from './table.context'
import type { TableViewProps } from './table.type'

/**
 * The rows. **There is no `virtualized` prop**: a table of ten thousand rows is a
 * `FlatList`, and this takes `asChild` so it *is* one.
 *
 * ```tsx
 * <Table.Body asChild>
 *   <FlatList
 *     data={devices}
 *     keyExtractor={device => device.id}
 *     renderItem={({ item }) => <Table.Row id={item.id}>…</Table.Row>}
 *   />
 * </Table.Body>
 * ```
 */
export const TableBody = forwardRef<View, TableViewProps & AsChildProps>(
  function TableBody({ children, asChild = false, style, ...props }, ref) {
    const { bodyStyle } = useTable()
    const [styleProps, rest] = useStyleProps(props)

    const bodyProps = { ...rest, style: [bodyStyle, styleProps, style] }

    return asChild ? (
      <Slot ref={ref} {...bodyProps}>
        {children}
      </Slot>
    ) : (
      <View ref={ref} {...bodyProps}>
        {children}
      </View>
    )
  }
)

TableBody.displayName = 'XAUI.Tram.Table.Body'
