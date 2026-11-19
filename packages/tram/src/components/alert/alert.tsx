import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, childrenToString, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { groundPaint } from '../../system/ground-paint'
import { namedSoftInk } from '../../system/report-tokens'
import { touchReach } from '../../system/touch-reach'
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
 * Something the page has to say: the discreet surface, flat, with a square at the start
 * in the colour of what it is about — a Metro list's thumbnail — then the title on the
 * Tram scale and the detail faded under it.
 *
 * ```tsx
 * <Alert variant="warning-soft">
 *   <Alert.Icon as={WarningIcon} />
 *   <Alert.Content>
 *     <Alert.Title>Espace presque plein</Alert.Title>
 *     <Alert.Description>Il reste 180 Mo sur ce compte.</Alert.Description>
 *   </Alert.Content>
 *   <Alert.Close accessibilityLabel="fermer" onPress={dismiss} />
 * </Alert>
 * ```
 *
 * It announces itself as an `alert`, politely, as in Native. No shadow, no line: depth
 * is not part of Tram.
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
  // Every alert is filled, so a named accent is its true colour.
  const paint = groundPaint({
    accent,
    color,
    isLine: false,
    page: theme.colors.background,
  })
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? alertRecipe.tint({ theme, color: paint, selection, states })
    : undefined

  const closeReach = touchReach(crossSide(theme, size))
  const ink = namedSoftInk(variant, accent, color, theme.colors.background)

  const context = useMemo(() => {
    const inked = ink ? { color: ink } : undefined
    const title = StyleSheet.flatten<TextStyle>([styles.title, tint?.title, inked])
    const text =
      typeof title.color === 'string' ? title.color : theme.colors.foreground
    const mark = alertMark(variant, paint, text, theme)
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
  }, [styles, tint, ink, paint, variant, theme, closeReach, isDisabled])

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
