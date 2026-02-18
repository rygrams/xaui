import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import { styles } from './scaffold.style'
import type { ScaffoldFabButtonProps } from './scaffold.type'

export const ScaffoldFabButton: React.FC<ScaffoldFabButtonProps> = ({
  icon,
  label,
  size = 'regular',
  themeColor = 'primary',
  style,
  onPress,
}) => {
  const theme = useXUITheme()
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const isExtended = !!label
  const isSmall = size === 'small'

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.fab,
        isSmall ? styles.fabSmall : styles.fabRegular,
        isExtended && styles.fabExtended,
        { backgroundColor: colorScheme.main },
        pressed && { backgroundColor: withOpacity(colorScheme.main, 0.85) },
        style,
      ]}
    >
      <View style={styles.fabIconWrapper}>
        {React.isValidElement(icon)
          ? React.cloneElement(icon as React.ReactElement<{ color?: string; size?: number }>, {
              color: colorScheme.foreground,
              size: isSmall ? 18 : 24,
            })
          : icon}
      </View>
      {isExtended && (
        <Text style={[styles.fabLabel, { color: colorScheme.foreground }]}>{label}</Text>
      )}
    </Pressable>
  )
}
