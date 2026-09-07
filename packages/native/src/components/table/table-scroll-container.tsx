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
  function TableScrollContainer(
    { children, contentContainerStyle, style, ...props },
    ref
  ) {
    const [styleProps, rest] = useStyleProps(props)

    return (
      <ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        {...rest}
        style={[styleProps, style]}
        // A horizontal scroller sizes its content to what is in it, and a table narrower
        // than its shell would then stop short of the border with a band of empty ground
        // beside every row. `flexGrow` gives the content the shell's width as a *floor* —
        // a wider table still runs past it and scrolls, which is what this node is for.
        contentContainerStyle={[{ flexGrow: 1 }, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    )
  }
)

TableScrollContainer.displayName = 'XAUI.Table.ScrollContainer'
