import React, { useContext, useMemo } from 'react'
import { Pressable, Text, View, StyleSheet } from 'react-native'
import { useXUITheme } from '@xaui/core'
import { colors } from '@xaui/colors'
import { SelectContext } from './select-context'
import type { SelectItemProps } from './select-types'
import { CheckmarkIcon } from './checkmark-icon'

const defaultSize = 'md' as const

export const SelectItem: React.FC<SelectItemProps> = ({
  title,
  description,
  startContent,
  endContent,
  selectedIcon,
  isDisabled = false,
  isSelected = false,
  isReadOnly = false,
  mainStyle,
  textStyle,
  onSelected,
}) => {
  const theme = useXUITheme()
  const context = useContext(SelectContext)
  const size = context?.size ?? defaultSize
  const themeColor = context?.themeColor ?? 'default'
  const isItemDisabled = context?.isDisabled ? true : isDisabled

  const colorScheme = theme.colors[themeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
      sm: {
        paddingVertical: theme.spacing.sm,
        paddingHorizontal: theme.spacing.md,
        titleSize: theme.fontSizes.sm,
        descriptionSize: theme.fontSizes.xs,
      },
      md: {
        paddingVertical: theme.spacing.md,
        paddingHorizontal: theme.spacing.md,
        titleSize: theme.fontSizes.md,
        descriptionSize: theme.fontSizes.sm,
      },
      lg: {
        paddingVertical: theme.spacing.lg,
        paddingHorizontal: theme.spacing.lg,
        titleSize: theme.fontSizes.lg,
        descriptionSize: theme.fontSizes.md,
      },
    }

    return sizes[size]
  }, [size, theme])

  const backgroundColor = useMemo(() => {
    if (isSelected) {
      return colorScheme.background
    }

    return colors.transparent
  }, [isSelected, colorScheme])

  const textColor = useMemo(() => {
    return theme.colors.foreground
  }, [theme])

  const checkmarkColor = useMemo(() => {
    if (themeColor === 'default') {
      return theme.colors.primary.main
    }
    return colorScheme.main
  }, [themeColor, colorScheme, theme])

  const handlePress = () => {
    if (isItemDisabled || isReadOnly) {
      return
    }

    onSelected?.()
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={isItemDisabled}
      style={[
        styles.item,
        {
          paddingVertical: sizeStyles.paddingVertical,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor,
        },
        isItemDisabled && styles.disabled,
        mainStyle,
      ]}
    >
      {startContent}
      <View style={styles.content}>
        <Text style={[styles.title, { fontSize: sizeStyles.titleSize, color: textColor }, textStyle]}>
          {title}
        </Text>
        {description && (
          <Text
            style={[
              styles.description,
              { fontSize: sizeStyles.descriptionSize, color: theme.colors.foreground },
            ]}
          >
            {description}
          </Text>
        )}
      </View>
      {isSelected && (selectedIcon || <CheckmarkIcon color={checkmarkColor} size={16} />)}
      {endContent}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontWeight: '500',
  },
  description: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.5,
  },
})
