import { forwardRef, useCallback } from 'react'
import { Image } from 'react-native'
import type { ImageProps, ImageStyle, StyleProp } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useStyleProps } from '../../system/style-props'
import { avatarSheet } from './avatar.style'
import type { AvatarImageProps } from './avatar.type'

/** Long enough to read as an arrival, short enough not to delay a face. HeroUI's 200ms. */
const FADE_DURATION = 200

/**
 * The photo, over whatever the fallback is showing.
 *
 * ```tsx
 * <Avatar>
 *   <Avatar.Image source={{ uri: user.photo }} />
 *   <Avatar.Fallback>AT</Avatar.Fallback>
 * </Avatar>
 * ```
 *
 * **It is absolutely positioned**, and that is the whole fallback mechanism: this slot
 * covers the one underneath, and an `Image` with nothing decoded yet draws nothing — so
 * the initials show while the photo loads and stay if the URL is wrong, with no load-state
 * machine and no `onError` anyone can forget to handle. JSX order between the two is
 * therefore free; write the image first, as the anatomy reads.
 *
 * It is the one slot that reads nothing from the root. Its position depends on no token
 * and no variant, so it comes from a static sheet rather than through the context — the
 * frame's clip is what shapes the photo, and that is the root's own style.
 */
export const AvatarImage = forwardRef<Image, AvatarImageProps>(function AvatarImage(
  { animation = true, style, ...props },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)
  const frameStyle = [avatarSheet.image, styleProps, style]

  // Two components rather than a branch inside one: hooks cannot be conditional, and
  // `animation={false}` is only true if the Reanimated hooks are never reached. Without
  // the fade there is no state at all — an undecoded `Image` is already transparent.
  if (!animation) return <Image ref={ref} {...rest} style={frameStyle} />

  return <FadingImage ref={ref} {...rest} style={frameStyle} />
})

AvatarImage.displayName = 'XAUI.Avatar.Image'

/**
 * The fade runs off `onLoad` and a shared value rather than off `FadeIn` on mount: the
 * node has to be mounted from the first render or it never fetches, so the moment worth
 * animating is the decode and not the mount.
 */
const FadingImage = forwardRef<Image, ImageProps & { style: StyleProp<ImageStyle> }>(
  function FadingImage({ onLoad, style, ...props }, ref) {
    const opacity = useSharedValue(0)

    const handleLoad = useCallback<NonNullable<ImageProps['onLoad']>>(
      event => {
        opacity.value = withTiming(1, { duration: FADE_DURATION })
        onLoad?.(event)
      },
      [opacity, onLoad]
    )

    const animatedStyle = useAnimatedStyle(() => {
      'worklet'
      return { opacity: opacity.value }
    }, [opacity])

    return (
      <Animated.Image
        ref={ref}
        {...props}
        onLoad={handleLoad}
        style={[style, animatedStyle]}
      />
    )
  }
)
