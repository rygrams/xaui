import { Icon } from '@xaui/native/system'
import { useTile } from './tile.context'
import type { TileIconProps } from './tile.type'

/**
 * A glyph that takes the tile's size and the colour that reads on its fill without being
 * told either. An explicit `size` or `color` still wins.
 */
export function TileIcon({ size, color, ...rest }: TileIconProps) {
  const { icon } = useTile()

  return <Icon size={size ?? icon.size} color={color ?? icon.color} {...rest} />
}

TileIcon.displayName = 'XAUI.Tram.Tile.Icon'
