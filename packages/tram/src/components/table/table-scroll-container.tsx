import { forwardRef } from 'react'
import { ScrollView } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { tableSheet } from './table.style'
import type { TableScrollProps } from './table.type'

/**
 * The horizontal scroller between the root and the columns. The header scrolls with the
 * body, because they are one column inside it — a header that stayed put while its cells
 * moved would name the wrong values.
 *
 * A plain `ScrollView`, with no bar: nothing here is animated, and nothing else reads
 * where it is.
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
        contentContainerStyle={[tableSheet.scrollContent, contentContainerStyle]}
      >
        {children}
      </ScrollView>
    )
  }
)

TableScrollContainer.displayName = 'XAUI.Tram.Table.ScrollContainer'
