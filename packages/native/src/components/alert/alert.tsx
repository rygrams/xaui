import { forwardRef, useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import type { TextStyle } from 'react-native'
import { Slot, childrenToString } from '../../system/slot'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { AlertDescription } from './alert-description'
import { AlertProvider } from './alert.context'
import { alertRecipe } from './alert.recipe'
import type { AlertProps } from './alert.type'

/**
 * A message the interface has to make sure is read — an outcome, a warning, a failure.
 *
 * ```tsx
 * <Alert variant="success-soft">
 *   <Alert.Icon as={CheckIcon} />
 *   <Alert.Content>
 *     <Alert.Title>Facture payée</Alert.Title>
 *     <Alert.Description>Le reçu part par courriel dans un instant.</Alert.Description>
 *   </Alert.Content>
 *   <Alert.Close accessibilityLabel="Fermer" onPress={dismiss} />
 * </Alert>
 * ```
 *
 * The root is a row of three columns — the icon, the content that takes what is left, and
 * the close — spaced by its own `gap` (R4). It is **never a control**: an alert reports,
 * and the only thing you press inside one is its `Alert.Close`.
 */
export const AlertRoot = forwardRef<View, AlertProps>(function Alert(
  {
    children,
    variant,
    size,
    radius,
    color,
    isDisabled = false,
    asChild = false,
    accessibilityRole = 'alert',
    // Android reads a live region aloud when its content changes, which is what makes an
    // alert that *appears* announce itself instead of waiting to be found. `'polite'`
    // rather than `'assertive'`: it queues behind whatever is being read instead of
    // cutting it off. A static alert that is part of the page sets `'none'`.
    accessibilityLiveRegion = 'polite',
    style,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // R14 — what is left is `View`'s own props plus whatever style keys the caller wrote.
  // The alert's own vocabulary is already destructured above, which is what keeps `size`
  // the alert's scale and `color` R7's tint rather than style props of the same name.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant, size, radius }
  const states = { disabled: isDisabled }

  const styles = alertRecipe.resolve({ theme, selection, states })
  // Only when `color` is set, and never cached: a raw tint takes arbitrary values, so
  // letting one into the key would grow the table with the colours users invent.
  const tint = color
    ? alertRecipe.tint({ theme, color, selection, states })
    : undefined

  const context = useMemo(() => {
    const glyph = StyleSheet.flatten<TextStyle>([styles.iconGlyph, tint?.iconGlyph])

    return {
      iconStyle: styles.icon,
      contentStyle: styles.content,
      titleStyle: tint ? [styles.title, tint.title] : styles.title,
      descriptionStyle: tint
        ? [styles.description, tint.description]
        : styles.description,
      closeStyle: styles.close,
      closeGlyphStyle: tint
        ? [styles.closeGlyph, tint.closeGlyph]
        : styles.closeGlyph,
      icon: {
        size: glyph.fontSize,
        // `ColorValue` also covers the platform's opaque colours, which `Icon` cannot
        // hand to a third-party component expecting a string.
        color: typeof glyph.color === 'string' ? glyph.color : undefined,
      },
      isDisabled,
    }
  }, [styles, tint, isDisabled])

  // The resolution order of §2 ter, most general to most specific: the cached recipe, the
  // uncached tint, the style props, then `style` — the last word, and the escape hatch for
  // what has no readable prop.
  const rootStyle = [styles.root, tint?.root, styleProps, style]

  // R3 — a stringifiable tree becomes the alert's prose. `Description` and not `Title`:
  // `<Alert>Le fichier est trop lourd.</Alert>` is a sentence, not a heading, and an
  // alert with a description and no title is ordinary while the reverse is not.
  const text = childrenToString(children)
  const content =
    text !== null ? <AlertDescription>{text}</AlertDescription> : children

  const surface = asChild ? (
    // R12 — the caller's element *is* the alert, so it takes the children it was written
    // with and the auto-wrap does not apply.
    <Slot
      ref={ref}
      accessibilityRole={accessibilityRole}
      accessibilityLiveRegion={accessibilityLiveRegion}
      {...rest}
      style={rootStyle}
    >
      {children}
    </Slot>
  ) : (
    <View
      ref={ref}
      accessibilityRole={accessibilityRole}
      accessibilityLiveRegion={accessibilityLiveRegion}
      {...rest}
      style={rootStyle}
    >
      {content}
    </View>
  )

  return <AlertProvider value={context}>{surface}</AlertProvider>
})

AlertRoot.displayName = 'XAUI.Alert.Root'
