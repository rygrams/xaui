import { forwardRef } from 'react'
import { Text } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { useTile } from './tile.context'
import type { TileLabelProps } from './tile.type'

/**
 * The tile's name, in the caption role: one line, truncated rather than wrapped, since
 * the square does not grow. The case is the app's.
 */
export const TileLabel = forwardRef<Text, TileLabelProps>(function TileLabel(
  { children, style, numberOfLines = 1, ...props },
  ref
) {
  const { labelStyle } = useTile()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Text
      ref={ref}
      numberOfLines={numberOfLines}
      style={[labelStyle, styleProps, style]}
      {...rest}
    >
      {children}
    </Text>
  )
})

TileLabel.displayName = 'XAUI.Tram.Tile.Label'
