import React from 'react'
import { Text } from 'react-native'
import { styles } from './typography.style'
import { useTypographyColor, useTypographyVariantStyles } from './typography.hook'
import type { TypographyProps } from './typography.type'

export const Typography: React.FC<TypographyProps> = ({
  children,
  align,
  themeColor = 'default',
  variant = 'body1',
  style,
}: TypographyProps) => {
  const color = useTypographyColor(themeColor)
  const variantStyles = useTypographyVariantStyles(variant)
  const colorStyle =
    variant === 'inherit' && themeColor === 'default' ? undefined : { color }

  return (
    <Text
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
