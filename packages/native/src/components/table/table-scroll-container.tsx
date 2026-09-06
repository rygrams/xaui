import { forwardRef } from 'react'
import { ScrollView } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import type { TableScrollProps } from './table.type'

/**
 * The horizontal scroller between the shell and the columns.
 *
 * A wide table has to move sideways **inside** its shell: the border, the corner and the
 * shadow belong to something that stays put, and the rows are what travel. Folding the two
 * together makes a wide table either clip its own rows or drag its border across the screen.
 *
 * The header scrolls with the body, because they are one column inside this — a header that
 * stayed put while its cells moved would be a header naming the wrong values.
 *
 * It is a plain `ScrollView`: nothing here is animated, and a table's horizontal scroll has
 * no state anything else reads.
 */
export const TableScrollContainer = forwardRef<ScrollView, TableScrollProps>(
  function TableScrollContainer({ children, style, ...props }, ref) {
    const [styleProps, rest] = useStyleProps(props)

    return (
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...rest}
        style={[styleProps, style]}
      >
        {children}
      </ScrollView>
    )
  }
)

TableScrollContainer.displayName = 'XAUI.Table.ScrollContainer'
