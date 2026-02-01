import React, { useMemo } from 'react'
import { Text } from 'react-native'
import { styles } from './typography.style'
import { useTypographyColor, useTypographyVariantStyles } from './typography.hook'
import type { TypographyProps } from './typography.type'

export const Typography: React.FC<TypographyProps> = ({
  children,
  align,
  themeColor = 'default',
  variant = 'bodyMedium',
  maxLines,
  overflow = 'clip',
  style,
}: TypographyProps) => {
  const color = useTypographyColor(themeColor)
  const variantStyles = useTypographyVariantStyles(variant)
  const colorStyle = { color }
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
        align && { textAlign: align },
        colorStyle,
        style,
      ]}
    >
      {children}
    </Text>
  )
}
