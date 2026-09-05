import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { AvatarFallback } from './avatar-fallback'
import { AvatarProvider } from './avatar.context'
import { avatarRecipe } from './avatar.recipe'
import type { AvatarProps } from './avatar.type'

/**
 * A person or a thing, in a circle.
 *
 * ```tsx
 * <Avatar>
 *   <Avatar.Image source={{ uri: user.photo }} />
 *   <Avatar.Fallback>AT</Avatar.Fallback>
 * </Avatar>
 *
 * <Avatar variant="secondary" size="lg">AT</Avatar>
 *
 * <Avatar variant="tertiary">
 *   <Avatar.Fallback>
 *     <Icon as={PersonIcon} />
 *   </Avatar.Fallback>
 * </Avatar>
 * ```
 *
 * **The fallback is not a state, it is the layer underneath.** `Avatar.Image` is absolutely
 * positioned over `Avatar.Fallback`, so the fallback is what shows before the image decodes
 * and what shows again if the URL is wrong — with no load-state machine, no `onError` to
 * remember, and nothing to get out of sync. HeroUI runs a status enum for this; a stacking
 * order says the same thing and cannot disagree with itself.
 *
 * R3 — a stringifiable tree becomes the initials, which is the majority case:
 * `<Avatar>AT</Avatar>` is the whole component most of the time.
 *
 * **`size` sets both sides.** An avatar is a square before it is a circle, so there is one
 * measurement rather than a width and a height that can drift apart.
 */
export const AvatarRoot = forwardRef<View, AvatarProps>(function Avatar(
  { children, variant, size, radius, color, asChild = false, style, ...props },
  ref
) {
  const theme = useXAUITheme()
  // R14, after the component's own vocabulary is destructured: that is what keeps `size`
  // the avatar's diameter and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const styles = avatarRecipe.resolve({ theme, selection })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours callers invent.
  const tint = color ? avatarRecipe.tint({ theme, color, selection }) : undefined

  const context = useMemo(() => {
    const icon = StyleSheet.flatten<TextStyle>([styles.icon, tint?.icon])

    return {
      fallbackStyle: styles.fallback,
      initialsStyle: tint ? [styles.initials, tint.initials] : styles.initials,
      icon: {
        size: icon.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
        // hand to a third-party component expecting a string.
        color: typeof icon.color === 'string' ? icon.color : undefined,
      },
    }
  }, [styles, tint])

  // The order of §2 ter, most general to most specific: the cached recipe, the uncached
  // tint, the style props, then `style` — the last word.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // R3 — a stringifiable tree becomes the initials, which is the majority case:
  // `<Avatar>AT</Avatar>` is the whole component most of the time. An element among the
  // children means the caller composed their own slots, and those are left alone.
  const text = childrenToString(children)
  const content = text !== null ? <AvatarFallback>{text}</AvatarFallback> : children

  // R12 — the caller's element becomes the frame, and it takes the children it was written
  // with, so the auto-wrap below does not apply to it.
  const Root = asChild ? Slot : View

  return (
    <AvatarProvider value={context}>
      <Root
        ref={ref}
        // No default role: a face is an image, and what a screen reader should read is the
        // name beside it or the `accessibilityLabel` the caller gives this one. Announcing
        // "image" on every row of a list is noise, and R9 keeps it overridable.
        {...rest}
        style={rootStyle}
      >
        {asChild ? children : content}
      </Root>
    </AvatarProvider>
  )
})

AvatarRoot.displayName = 'XAUI.Avatar.Root'
