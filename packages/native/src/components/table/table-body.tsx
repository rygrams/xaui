import { forwardRef } from 'react'
import { View } from 'react-native'
import { Slot } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useTable } from './table.context'
import type { AsChildProps } from '../../system/slot'
import type { TableViewProps } from './table.type'

/**
 * The rows.
 *
 * **There is no `virtualized` prop.** A table of ten thousand rows is a `FlatList`, and this
 * takes `asChild` so it *is* one:
 *
 * ```tsx
 * <Table.Body asChild>
 *   <FlatList
 *     data={people}
 *     keyExtractor={person => person.id}
 *     renderItem={({ item }) => (
 *       <Table.Row id={item.id}>…</Table.Row>
 *     )}
 *   />
 * </Table.Body>
 * ```
 *
 * A prop would have meant this component owning a `data` and a `renderItem` — the shape the
 * whole v1 API was written to get away from — and owning them badly, since a virtualized list
 * has a dozen props a table would then have to forward one by one.
 */
export const TableBody = forwardRef<View, TableViewProps & AsChildProps>(
  function TableBody({ children, asChild = false, style, ...props }, ref) {
    const { bodyStyle } = useTable()
    const [styleProps, rest] = useStyleProps(props)

    const bodyProps = {
      ...rest,
      style: [bodyStyle, styleProps, style],
    }

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

TableBody.displayName = 'XAUI.Table.Body'
