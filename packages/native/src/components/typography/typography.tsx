import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { styles } from './typography.style'
import { useTextSpanInheritedStyle } from './text-span.context'
import { useTypographyColor, useTypographyVariantStyles } from './typography.hook'
import type { TypographyProps } from './typography.type'

export const Typography: React.FC<TypographyProps> = ({
  children,
  align,
  themeColor = 'default',
  variant = 'bodyMedium',
  maxLines,
  overflow = 'clip',
  color,
  letterSpacing,
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
        inheritedStyle.spacing != null ? { marginRight: inheritedStyle.spacing } : undefined,
        style,
      ]}
    >
      {children}
    </Text>
  )
}
