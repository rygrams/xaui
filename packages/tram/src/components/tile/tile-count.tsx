import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTile } from './tile.context'
import type { TileCountProps } from './tile.type'

/**
 * What a small tile has to say — unread mail, missed calls — in the title role, its
 * digits of one width so a count that changes does not shift the glyph beside it.
 */
export const TileCount = forwardRef<Text, TileCountProps>(function TileCount(
  { children, style, numberOfLines = 1, ...props },
  ref
) {
  const { countStyle } = useTile()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      style={[countStyle, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

TileCount.displayName = 'XAUI.Tram.Tile.Count'
