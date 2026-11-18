import { TileCount } from './tile-count'
import { TileBack, TileFront } from './tile-face'
import { TileGrid } from './tile-grid'
import { TileIcon } from './tile-icon'
import { TileLabel } from './tile-label'
import { TileRoot } from './tile'

export const Tile = Object.assign(TileRoot, {
  Grid: TileGrid,
  Front: TileFront,
  Back: TileBack,
  Label: TileLabel,
  Count: TileCount,
  Icon: TileIcon,
})

export { useTile } from './tile.context'
export { useTileFace } from './tile.hook'
export { TILE_SPAN, placeTiles } from './tile.layout'
export type { TileLayout, TilePlacement, TileSpan } from './tile.layout'
export { tileRecipe } from './tile.recipe'
export type {
  TileContextValue,
  TileCountProps,
  TileFaceName,
  TileFaceProps,
  TileGridProps,
  TileIconProps,
  TileLabelProps,
  TileProps,
  TileSize,
  TileSlot,
  TileTransition,
  TileVariant,
} from './tile.type'
