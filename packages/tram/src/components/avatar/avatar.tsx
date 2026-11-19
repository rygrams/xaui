import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, childrenToString, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { tramAccents } from '../../theme/tram-tokens'
import { AvatarFallback } from './avatar-fallback'
import { AvatarProvider } from './avatar.context'
import { DEFAULT_VARIANT, avatarRecipe } from './avatar.recipe'
import type { AvatarProps } from './avatar.type'

/**
 * A person or a thing, in the Metro thumbnail: a square in the accent, sharp-cornered,
 * with the initials cut into it — or the photo laid over them.
 *
 * ```tsx
 * <Avatar>
 *   <Avatar.Image source={{ uri: user.photo }} />
 *   <Avatar.Fallback>am</Avatar.Fallback>
 * </Avatar>
 *
 * <Avatar variant="flat" size="lg" accent="magenta">kc</Avatar>
 * ```
 *
 * The fallback is the layer underneath, not a state: `Avatar.Image` covers it, so the
 * initials show while the photo loads and stay if it never does. The case of the initials
 * is the app's — Metro wrote its own in lower case; Tram rewrites nothing.
 */
export const AvatarRoot = forwardRef<View, AvatarProps>(function Avatar(
  {
    children,
    variant = DEFAULT_VARIANT,
    size,
    radius,
    accent,
    color,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const styles = avatarRecipe.resolve({ theme, selection })
  // A named accent is painted as the `Button` paints it: the true colour as a fill, the
  // mode's ink as a line. A raw `color` is the caller's word and is never corrected.
  const named =
    accent && !color
      ? accentPaintFor(tramAccents[accent], variant, theme.colors.background)
      : undefined
  const paint = color ?? named?.tint
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? avatarRecipe.tint({ theme, color: paint, selection })
    : undefined
  const ink = named?.label

  const context = useMemo(() => {
    const inked = ink ? { color: ink } : undefined
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon, inked])

    return {
      fallbackStyle: styles.fallback,
      initialsStyle: [styles.initials, tint?.initials, inked],
      icon: {
        size: icon.fontSize,
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
    }
  }, [styles, tint, ink])

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // A stringifiable tree is the initials: `<Avatar>am</Avatar>` is most avatars.
  const text = childrenToString(children)
  const content = text !== null ? <AvatarFallback>{text}</AvatarFallback> : children

  const Root = asChild ? Slot : View

  return (
    <AvatarProvider value={context}>
      {/* No default role: a face is read by the name beside it. */}
      <Root ref={ref} {...rest} style={rootStyle}>
        {asChild ? children : content}
      </Root>
    </AvatarProvider>
  )
})

AvatarRoot.displayName = 'XAUI.Tram.Avatar.Root'
