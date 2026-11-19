import { forwardRef, useCallback } from 'react'
import { Image, StyleSheet } from 'react-native'
import type { ImageProps, ImageStyle, StyleProp } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'
import { useStyleProps } from '@xaui/native/system'
import { useTramEase } from '../../motion/use-tram-ease'
import type { AvatarImageProps } from './avatar.type'

/**
 * The photo, over the fallback. It is laid over the whole frame, above it whatever the
 * order they are written in, and an `Image` with
 * nothing decoded draws nothing — so the initials show while it loads and stay if the URL
 * is wrong, with no load state to keep.
 *
 * It arrives on the Metro curve once decoded, or in the short fade when motion is reduced.
 */
export const AvatarImage = forwardRef<Image, AvatarImageProps>(function AvatarImage(
  { animation = true, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const frameStyle = [sheet.image, styleProps, style]

  // Two components rather than a branch inside one: "no animation" is only true if the
  // Reanimated hooks are never reached.
  if (!animation) return <Image ref={ref} {...rest} style={frameStyle} />

  return <ArrivingImage ref={ref} {...rest} style={frameStyle} />
})

AvatarImage.displayName = 'XAUI.Tram.Avatar.Image'

/** The decode is the moment worth animating, not the mount: the node fetches from the first render. */
const ArrivingImage = forwardRef<
  Image,
  ImageProps & { style: StyleProp<ImageStyle> }
>(function ArrivingImage({ onLoad, style, ...props }, ref) {
  const ease = useTramEase()
  const opacity = useSharedValue(0)

  const handleLoad = useCallback<NonNullable<ImageProps['onLoad']>>(
    event => {
      opacity.value = ease(1)
      onLoad?.(event)
    },
    [ease, opacity, onLoad]
  )

  const arriving = useAnimatedStyle(() => {
    'worklet'
    return { opacity: opacity.value }
  }, [opacity])

  return (
    <Animated.Image
      // The animated wrapper types its ref as itself; at runtime it is the host image.
      ref={ref as never}
      {...props}
      onLoad={handleLoad}
      style={[style, arriving]}
    />
  )
})

const sheet = StyleSheet.create({
  // Over the fallback whatever order the two are written in: a later sibling is drawn
  // over an earlier one, so the stacking is said here rather than left to the JSX.
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
})
