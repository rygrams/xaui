import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, childrenToString, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentPaintFor } from '../../system/accent-paint'
import { touchReach } from '../../system/touch-reach'
import { tramAccents } from '../../theme/tram-tokens'
import { AlertDescription } from './alert-description'
import { AlertProvider } from './alert.context'
import { alertMark } from './alert.mark'
import {
  DEFAULT_SIZE,
  DEFAULT_VARIANT,
  alertRecipe,
  crossSide,
} from './alert.recipe'
import type { AlertProps } from './alert.type'

/**
 * Something the page has to say, drawn as the `Button` is — the soft slice of the accent
 * by default — with a square at the start in the colour of what it is about, a Metro
 * list's thumbnail, then the title on the Tram scale and the detail faded under it.
 *
 * ```tsx
 * <Alert accent="amber">
 *   <Alert.Icon as={WarningIcon} />
 *   <Alert.Content>
 *     <Alert.Title>Espace presque plein</Alert.Title>
 *     <Alert.Description>Il reste 180 Mo sur ce compte.</Alert.Description>
 *   </Alert.Content>
 *   <Alert.Close accessibilityLabel="fermer" onPress={dismiss} />
 * </Alert>
 * ```
 *
 * It announces itself as an `alert`, politely, as in Native. No shadow: depth is not
 * part of Tram.
 */
export const AlertRoot = forwardRef<View, AlertProps>(function Alert(
  {
    children,
    variant = DEFAULT_VARIANT,
    size = DEFAULT_SIZE,
    radius,
    accent,
    color,
    isDisabled = false,
    asChild = false,
    accessibilityRole = 'alert',
    accessibilityLiveRegion = 'polite',
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const states = { disabled: isDisabled }

  const styles = alertRecipe.resolve({ theme, selection, states })
  // A named accent is painted as the `Button` paints it: the true colour as a fill, the
  // mode's ink as a line. A raw `color` is the caller's word, never corrected.
  const hue = accent ? tramAccents[accent] : undefined
  const named =
    hue && !color ? accentPaintFor(hue, variant, theme.colors.background) : undefined
  const paint = color ?? named?.tint
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? alertRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const closeReach = touchReach(crossSide(theme, size))
  const ink = named?.label
  // The square's true colour: the caller's, the named one, or the theme's own accent —
  // whose ink the theme already knows.
  const markHue = color ?? hue ?? theme.colors.accent
  const onMarkHue = color || hue ? undefined : theme.colors.accentForeground

  const context = useMemo(() => {
    const inked = ink ? { color: ink } : undefined
    const title = StyleSheet.flatten<TextStyle>([styles.title, tint?.title, inked])
    const text =
      typeof title.color === 'string' ? title.color : theme.colors.foreground
    const mark = alertMark(variant, markHue, onMarkHue, text)
    const glyph = StyleSheet.flatten<TextStyle>(styles.iconGlyph)

    return {
      iconStyle: [styles.icon, mark.box],
      contentStyle: styles.content,
      titleStyle: [styles.title, tint?.title, inked],
      descriptionStyle: [styles.description, tint?.description, inked],
      closeStyle: styles.close,
      closeGlyphStyle: [
        styles.closeGlyph,
        tint?.closeGlyph,
        ink ? { backgroundColor: ink } : undefined,
      ],
      closeReach,
      icon: { size: glyph.fontSize, color: mark.glyph },
      isDisabled,
    }
  }, [styles, tint, ink, markHue, onMarkHue, variant, theme, closeReach, isDisabled])

  // Most general to most specific: the cached recipe, the tint, the style props, `style`.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // A stringifiable tree is the alert's prose: one sentence is an ordinary alert.
  const text = childrenToString(children)
  const content =
    text !== null ? <AlertDescription>{text}</AlertDescription> : children

  const Root = asChild ? Slot : View

  return (
    <AlertProvider value={context}>
      <Root
        ref={ref}
        accessibilityRole={accessibilityRole}
        accessibilityLiveRegion={accessibilityLiveRegion}
        {...rest}
        style={rootStyle}
      >
        {asChild ? children : content}
      </Root>
    </AlertProvider>
  )
})

AlertRoot.displayName = 'XAUI.Tram.Alert.Root'
