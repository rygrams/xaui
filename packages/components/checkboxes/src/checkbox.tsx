import React, { useMemo, useEffect, useRef } from 'react'
import { Pressable, Text, View, StyleSheet, Animated } from 'react-native'
import { useXUITheme } from '@xaui/core'
import type { CheckboxProps } from './checkbox-types'
import { CheckboxIcon } from './checkbox-icon'

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelAlignment = 'right',
  themeColor = 'default',
  variant = 'filled',
  size = 'md',
  radius = 'sm',
  fullWidth = false,
  isChecked = false,
  isDisabled = false,
  labelStyle,
  style,
  onValueChange,
}) => {
  const theme = useXUITheme()
  const scale = useRef(new Animated.Value(1)).current
  const backgroundScale = useRef(new Animated.Value(0.5)).current
  const backgroundOpacity = useRef(new Animated.Value(0)).current

  const colorScheme = theme.colors[themeColor]

  const sizeStyles = useMemo(() => {
    const sizes = {
      sm: {
        checkboxSize: 18,
        fontSize: theme.fontSizes.sm,
        iconSize: variant === 'light' ? 14 : 12,
      },
      md: {
        checkboxSize: 22,
        fontSize: theme.fontSizes.md,
        iconSize: variant === 'light' ? 18 : 14,
      },
      lg: {
        checkboxSize: 26,
        fontSize: theme.fontSizes.lg,
        iconSize: variant === 'light' ? 22 : 16,
      },
    }
    return sizes[size]
  }, [size, theme, variant])

  const radiusStyles = useMemo(() => {
    const radii = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return { borderRadius: radii[radius] }
  }, [radius, theme])

  const checkboxStyles = useMemo(() => {
    const baseStyle = {
      width: sizeStyles.checkboxSize,
      height: sizeStyles.checkboxSize,
      ...radiusStyles,
    }

    if (variant === 'filled') {
      return {
        ...baseStyle,
        backgroundColor: 'transparent',
        borderWidth: isChecked ? 0 : theme.borderWidth.md,
        borderColor: isChecked ? 'transparent' : colorScheme.main,
      }
    }

    return {
      ...baseStyle,
      backgroundColor: 'transparent',
      borderWidth: 0,
      borderColor: 'transparent',
    }
  }, [variant, isChecked, colorScheme, sizeStyles, radiusStyles, theme])

  const checkmarkColor = useMemo(() => {
    if (variant === 'filled') {
      return colorScheme.foreground
    }
    return colorScheme.main
  }, [variant, colorScheme])

  const containerStyles = useMemo(() => {
    const isJustified = labelAlignment === 'justify-left' || labelAlignment === 'justify-right'

    return {
      flexDirection:
        labelAlignment === 'left' || labelAlignment === 'justify-left'
          ? ('row-reverse' as const)
          : ('row' as const),
      justifyContent: isJustified ? ('space-between' as const) : ('flex-start' as const),
      width: fullWidth ? ('100%' as const) : undefined,
    }
  }, [labelAlignment, fullWidth])

  useEffect(() => {
    if (isChecked) {
      Animated.parallel([
        Animated.timing(backgroundScale, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(backgroundScale, {
          toValue: 0.5,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(backgroundOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [isChecked, backgroundScale, backgroundOpacity])

  const handlePress = () => {
    if (!isDisabled) {
      onValueChange?.(!isChecked)
    }
  }

  const handlePressIn = () => {
    if (!isDisabled) {
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start()
    }
  }

  const handlePressOut = () => {
    if (!isDisabled) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={[styles.container, containerStyles, isDisabled && styles.disabled, style]}
    >
      <Animated.View
        style={[
          styles.checkbox,
          checkboxStyles,
          {
            transform: [{ scale }],
          },
        ]}
      >
        {variant === 'filled' && (
          <Animated.View
            style={[
              styles.background,
              radiusStyles,
              {
                backgroundColor: colorScheme.main,
                transform: [{ scale: backgroundScale }],
                opacity: backgroundOpacity,
              },
            ]}
          />
        )}
        <View style={styles.checkmarkContainer}>
          <CheckboxIcon isChecked={isChecked} color={checkmarkColor} size={sizeStyles.iconSize} />
        </View>
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            { fontSize: sizeStyles.fontSize },
            isDisabled && styles.disabledText,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  checkbox: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  checkmarkContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  label: {
    fontWeight: '400',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
})
