import { forwardRef } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { spanWidth, useGrid } from './grid.context'
import type { GridItemProps } from './view.type'

/**
 * A cell covering more than one column.
 *
 * ```tsx
 * <Grid columns={3} gap={8}>
 *   <Card />
 *   <Grid.Item span={2}><Card /></Grid.Item>
 * </Grid>
 * ```
 *
 * Only needed for a span: `Grid` already wraps every other child in a one-column cell, so
 * a caller drops components straight into the grid and reaches for this when one of them
 * has to be wider.
 *
 * No `asChild`. The cell **is** the layout — its width is what the grid computed — and
 * merging it into a caller's element would hand them a width they did not ask for and
 * could silently override. `span` is the lever here.
 */
export const GridItem = forwardRef<View, GridItemProps>(function GridItem(
  { children, span = 1, style, ...props },
  ref
) {
  const grid = useGrid()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <View
      ref={ref}
      style={[{ width: spanWidth(grid, span) }, styleProps, style]}
      {...rest}
    >
      {children}
    </View>
  )
})

GridItem.displayName = 'XAUI.Grid.Item'
