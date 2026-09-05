import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { styles } from './typography.style'
import { useTextSpanInheritedStyle } from './text-span.context'
import { useTypographyColor, useTypographyVariantStyles } from './typography.hook'
import type { TypographyProps } from './typography.type'

/**
 * @deprecated Use `Typography` from `@xaui/native/typography`. This tree is frozen and
 * receives fixes only.
 *
 * **`variant` now fixes size, line height, weight and family together** — ten roles, six
 * headings, three body steps and inline code. That is what removes `fontWeight`,
 * `lineHeight` and the separate size prop, and with them the illegal pairings they allowed:
 * a heading in a light weight, a caption at `lg`.
 *
 * Everything else moved to React Native's own names as style props (R14): `align` is
 * `textAlign`, `maxLines` is `numberOfLines`, and `letterSpacing`, `textTransform`,
 * `textDecorationLine`, `fontStyle`, `backgroundColor` and `overflow` keep their names and
 * take React Native's values. `themeColor` becomes a raw hex `color`. `spacing` is the
 * parent's `gap`.
 *
 * A one-off deviation is a style prop said plainly — `fontSize={17}` — rather than a
 * vocabulary word that promises a system.
 *
 * ```tsx
 * // legacy
 * <Typography variant="h3" fontWeight="600" align="center" maxLines={2}>Projets</Typography>
 *
 * // v1
 * <Typography variant="h3" textAlign="center" numberOfLines={2}>Projets</Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  children,
  align,
  themeColor = 'default',
  variant = 'bodyMedium',
  maxLines,
  overflow = 'clip',
  color,
  letterSpacing,
  lineHeight,
  fontWeight,
  fontStyle,
  textDecorationLine,
  textTransform,
  style,
}: TypographyProps) => {
  const inheritedStyle = useTextSpanInheritedStyle()
  const themeColorValue = useTypographyColor(themeColor)
  const variantStyles = useTypographyVariantStyles(variant)
  const resolvedAlign = align ?? inheritedStyle.align
  const textStyleOverrides = {
    color: color ?? inheritedStyle.color ?? themeColorValue,
    letterSpacing,
    lineHeight,
    fontWeight: fontWeight ?? inheritedStyle.fontWeight,
    fontStyle: fontStyle ?? inheritedStyle.fontStyle,
    textDecorationLine,
    textTransform: textTransform ?? inheritedStyle.textTransform,
  }
  const ellipsizeMode = useMemo(() => {
    if (!maxLines) return undefined
    if (overflow === 'clip') return 'clip'
    return 'tail'
  }, [maxLines, overflow])

  return (
    <Text
      numberOfLines={maxLines}
      ellipsizeMode={ellipsizeMode}
      style={[
        styles.text,
        variantStyles,
        resolvedAlign && { textAlign: resolvedAlign },
        textStyleOverrides,
        inheritedStyle.spacing != null
          ? { marginRight: inheritedStyle.spacing }
          : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  )
}
