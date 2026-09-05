import { Children, forwardRef, useMemo, useState } from 'react'
import { View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { GridProvider, spanWidth } from './grid.context'
import type { GridProps } from './view.type'

/**
 * A fixed number of columns, wrapping.
 *
 * ```tsx
 * <Grid columns={3} gap={8}>
 *   <Card /> <Card /> <Card />
 *   <Grid.Item span={2}><Card /></Grid.Item>
 * </Grid>
 * ```
 *
 * **The width is measured, not expressed as a percentage.** `width: '33.33%'` resolves
 * against the content box and knows nothing about the gaps between cells, so three of them
 * plus two gaps overflow their row and the third wraps — the classic gutter bug. The root
 * reads its own width once and publishes the exact column width instead.
 *
 * For the very first frame, before `onLayout` has fired, a cell falls back to the naive
 * percentage. It is one frame, and the alternative — rendering nothing until measured —
 * flashes an empty grid.
 *
 * `gap` is the component's own prop rather than one of R14's, because the root has to
 * **read** it to size the columns. It carries React Native's meaning and value all the
 * same: `gap={8}` is 8 points, and it is the same gap `Row` takes as a style prop.
 */
export const GridRoot = forwardRef<View, GridProps>(function Grid(
  { children, columns = 2, gap = 0, style, onLayout, ...props },
  ref
) {
  const [width, setWidth] = useState<number>()
  const [styleProps, rest] = useStyleProps(props)

  const safeColumns = Math.max(Math.floor(columns), 1)
  const cellWidth =
    width === undefined ? undefined : (width - gap * (safeColumns - 1)) / safeColumns

  const context = useMemo(
    () => ({ cellWidth, columns: safeColumns, gap }),
    [cellWidth, safeColumns, gap]
  )

  const handleLayout = (event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.width
    // Guarded rather than set unconditionally: `onLayout` fires on every re-layout, and
    // an unconditional `setState` here would re-render the whole grid on each one.
    if (next > 0 && next !== width) setWidth(next)
    onLayout?.(event)
  }

  return (
    <GridProvider value={context}>
      <View
        ref={ref}
        onLayout={handleLayout}
        style={[
          { flexDirection: 'row', flexWrap: 'wrap', rowGap: gap, columnGap: gap },
          styleProps,
          style,
        ]}
        {...rest}
      >
        {/* Every child is a cell, so a caller drops components in without wrapping each
            one. `Grid.Item` opts out — it renders its own, wider cell. */}
        {Children.map(children, child =>
          isGridItem(child) ? (
            child
          ) : (
            <View style={{ width: spanWidth(context, 1) }}>{child}</View>
          )
        )}
      </View>
    </GridProvider>
  )
})

GridRoot.displayName = 'XAUI.Grid'

/**
 * Matched by `displayName` rather than by identity, so a `Grid.Item` still counts as one
 * across two copies of the package in a tree — the same reason `PressableFeedback` marks
 * its overlays with a global symbol instead of comparing components.
 */
function isGridItem(child: unknown): boolean {
  if (child === null || typeof child !== 'object') return false

  const type = (child as { type?: { displayName?: string } }).type
  return type?.displayName === 'XAUI.Grid.Item'
}
