import { forwardRef } from 'react'
import { Text } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useXAUITheme } from '@xaui/native/theme'
import { accentInk } from '../../theme/accent-ink'
import { tramAccents, tramType } from '../../theme/tram-tokens'
import { DEFAULT_ROLE, typographyRecipe } from './typography.recipe'
import type { TypographyProps } from './typography.type'

/**
 * Text, by the role it plays on a Metro page — the Native `Typography`'s API on the Tram
 * scale.
 *
 * ```tsx
 * <Typography variant="page">réglages</Typography>
 * <Typography variant="title">thème</Typography>
 * <Typography>Sombre, avec l'accent cyan.</Typography>
 * <Typography variant="caption" accent="magenta">modifié</Typography>
 * ```
 *
 * One node and no slots: a paragraph is a `Text`, and a fragment of it is a `TextSpan`.
 * The case is the app's — Metro wrote its titles in lower case, Tram draws what it is
 * given.
 */
export const Typography = forwardRef<Text, TypographyProps>(function Typography(
  {
    children,
    variant = DEFAULT_ROLE,
    accent,
    color,
    asChild = false,
    style,
    maxFontSizeMultiplier,
    ...props
  },
  ref
) {
  const theme = useXAUITheme()
  // After the component's own vocabulary is destructured, so `color` stays the tint.
  const [styleProps, rest] = useStyleProps(props)

  const selection = { variant }
  const styles = typographyRecipe.resolve({ theme, selection })
  // Text is read, never filled: a named accent comes as the mode's ink. A raw `color` is
  // the caller's word, as given.
  const paint =
    color ??
    (accent ? accentInk(tramAccents[accent], theme.colors.background) : undefined)
  // Uncached: a raw tint takes arbitrary values and must stay out of the cache key.
  const tint = paint
    ? typographyRecipe.tint({ theme, color: paint, selection })
    : undefined

  const Root = asChild ? Slot : Text

  return (
    <Root
      ref={ref}
      // Sizes follow the system's text size; a role that is already giant grows less.
      maxFontSizeMultiplier={maxFontSizeMultiplier ?? tramType[variant].maxFontScale}
      // Most general to most specific: the cached role, the tint, the style props, `style`.
      style={[styles.root, tint?.root, styleProps, style]}
      {...rest}
    >
      {children}
    </Root>
  )
})

Typography.displayName = 'XAUI.Tram.Typography'
