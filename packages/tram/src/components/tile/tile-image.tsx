import { Children, Fragment, forwardRef, isValidElement, useMemo } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { Image, View } from 'react-native'
import { useStyleProps } from '@xaui/native/system'
import { TileProvider, useTile } from './tile.context'
import type { TileImageProps } from './tile.type'

/**
 * A picture in place of the fill — the cover of an album, a photo, a face. It takes the
 * whole square, or the whole face it is written in, and what the face holds is written
 * over it in white, on a band of black across its foot — the photo is the app's, and
 * nothing else reads on any photo.
 *
 * ```tsx
 * <Tile size="wide">
 *   <Tile.Image source={cover} />
 *   <Tile.Label>Musique</Tile.Label>
 * </Tile>
 * ```
 *
 * `hasBand={false}` leaves the band out, for a photo dark or empty where the text goes.
 *
 * The picture says nothing to a screen reader: the tile is the button, its label the name.
 */
export const TileImage = forwardRef<Image, TileImageProps>(function TileImage(
  // `hasBand` is read off the element by the face that holds it, not drawn here.
  { style, resizeMode = 'cover', hasBand: _hasBand, ...props },
  ref
) {
  const { imageStyle } = useTile()
  const [styleProps, rest] = useStyleProps(props)

  return (
    <Image
      ref={ref}
      resizeMode={resizeMode}
      accessible={false}
      accessibilityIgnoresInvertColors
      {...rest}
      style={[imageStyle, styleProps, style]}
    />
  )
})

TileImage.displayName = 'XAUI.Tram.Tile.Image'

/**
 * What a tile or a face holds, its pictures first — drawn under the rest wherever they
 * were written — and the rest on the band, in the ink that goes on a picture. Without
 * one, the children as they came.
 */
export function TilePictured({ children }: { children: ReactNode }) {
  const context = useTile()
  const all = Children.toArray(children)
  const isPicture = (child: ReactNode): child is ReactElement<TileImageProps> =>
    isValidElement(child) && child.type === TileImage
  const pictures = all.filter(isPicture)
  const hasBand = pictures.every(picture => picture.props.hasBand !== false)
  const written = all.filter(child => !isPicture(child))

  const onPicture = useMemo(() => ({ ...context, ...context.onPicture }), [context])

  if (pictures.length === 0) {
    return <Fragment>{children}</Fragment>
  }

  return (
    <Fragment>
      {pictures}
      <TileProvider value={onPicture}>
        {hasBand ? <View style={context.bandStyle}>{written}</View> : written}
      </TileProvider>
    </Fragment>
  )
}
