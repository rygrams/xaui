import { Children, forwardRef, isValidElement, useMemo, useState } from 'react'
import type { ReactElement } from 'react'
import { StyleSheet, View } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { tramTileColumns } from '../../theme/tram-tokens'
import { TileGridProvider } from './tile.context'
import { cellSide, gridHeight, placeTiles, tileFrame } from './tile.layout'
import { DEFAULT_SIZE } from './tile.recipe'
import type { TileGridProps, TileSize } from './tile.type'

function sizeOf(tile: ReactElement): TileSize {
  return (tile.props as { size?: TileSize }).size ?? DEFAULT_SIZE
}

/**
 * The start screen: square cells, and each tile in the first hole it fits, so small tiles
 * stack beside a medium one.
 *
 * ```tsx
 * <Tile.Grid columns={tramTileColumns.phone}>
 *   <Tile size="medium">…</Tile>
 *   <Tile size="small">…</Tile>
 *   <Tile size="wide">…</Tile>
 * </Tile.Grid>
 * ```
 *
 * The grid is as wide as its parent and as tall as its rows. Nothing is drawn until it has
 * been measured, since a cell's side is a share of that width.
 */
export const TileGrid = forwardRef<View, TileGridProps>(function TileGrid(
  { children, columns = tramTileColumns.phone, gap, style, onLayout, ...props },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)
  const [width, setWidth] = useState(0)

  const space = gap ?? theme.spacing(2)
  const tiles = Children.toArray(children).filter(isValidElement)
  // A string, so the placement is recomputed when a size changes and not on every render.
  const sizes = tiles.map(sizeOf).join(',')
  const layout = useMemo(
    () => placeTiles(sizes ? (sizes.split(',') as TileSize[]) : [], columns),
    [sizes, columns]
  )
  const cell = cellSide(width, columns, space)

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width)
    onLayout?.(event)
  }

  return (
    <View
      ref={ref}
      onLayout={handleLayout}
      {...rest}
      style={[
        sheet.grid,
        { height: gridHeight(layout.rows, cell, space) },
        styleProps,
        style,
      ]}
    >
      <TileGridProvider value>
        {width > 0
          ? tiles.map((tile, index) => (
              <View
                key={tile.key ?? index}
                style={[
                  sheet.cell,
                  tileFrame(layout.placements[index], cell, space),
                ]}
              >
                {tile}
              </View>
            ))
          : null}
      </TileGridProvider>
    </View>
  )
})

const sheet = StyleSheet.create({
  grid: { alignSelf: 'stretch' },
  // `start`, never `left`: the first column is on the leading side.
  cell: { position: 'absolute' },
})

TileGrid.displayName = 'XAUI.Tram.Tile.Grid'
