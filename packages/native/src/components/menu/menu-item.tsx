import React from 'react'
import { Pressable, Text, View } from 'react-native'
import { useXUITheme } from '../../core'
import type { MenuItemProps } from './menu-item.type'
import { styles } from './menu-item.style'

export const MenuItem: React.FC<MenuItemProps> = ({
  title,
  startContent,
  endContent,
  isDisabled = false,
  dense = false,
  onPress,
  customAppearance,
  accessibilityLabel,
}) => {
  const theme = useXUITheme()

  const titleColor = isDisabled
    ? theme.colors.foreground + '50'
    : theme.colors.foreground

  const renderTitle = () => {
    if (typeof title === 'string' || typeof title === 'number') {
      return (
        <Text
          style={[
            styles.titleText,
            { color: titleColor },
            customAppearance?.title,
          ]}
          numberOfLines={1}
        >
          {title}
        </Text>
      )
    }
    return title
  }

  return (
    <Pressable
      onPress={isDisabled ? undefined : onPress}
      disabled={isDisabled}
      accessibilityRole="menuitem"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ disabled: isDisabled }}
      style={({ pressed }) => [
        styles.container,
        dense && styles.denseContainer,
        isDisabled && styles.disabled,
        pressed && !isDisabled && {
          backgroundColor: theme.colors.foreground + '10',
        },
        customAppearance?.container,
      ]}
    >
      <View style={[styles.row, customAppearance?.content]}>
        {startContent && (
          <View style={styles.startContent}>{startContent}</View>
        )}
        <View style={styles.content}>{renderTitle()}</View>
        {endContent && (
          <View style={styles.endContent}>{endContent}</View>
        )}
      </View>
    </Pressable>
  )
}
