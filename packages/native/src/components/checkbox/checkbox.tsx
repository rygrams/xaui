import React, { useEffect, useRef, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import type { CheckboxProps } from './checkbox.type'
import { CheckboxIcon } from './checkbox-icon'
import { useCheckboxStyles } from './checkbox.hook'
import { styles } from './checkbox.style'
import { useXUITheme } from '../../core'

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelAlignment = 'right',
  themeColor = 'default',
  variant = 'filled',
  size = 'md',
  radius = 'sm',
  fullWidth = false,
  isChecked: isCheckedProp,
  isIndeterminate = false,
  isDisabled = false,
  labelStyle,
  style,
  onValueChange,
}) => {
  const theme = useXUITheme()
  const isControlled = typeof isCheckedProp === 'boolean'
  const [internalChecked, setInternalChecked] = useState(isCheckedProp ?? false)
  const isChecked = isControlled ? isCheckedProp : internalChecked
  const scale = useRef(new Animated.Value(1)).current
  const backgroundScale = useRef(new Animated.Value(0.5)).current
  const backgroundOpacity = useRef(new Animated.Value(0)).current
  const isActive = isChecked || isIndeterminate

  const {
    colorScheme,
    sizeStyles,
    radiusStyles,
    checkboxStyles,
    checkmarkColor,
    containerStyles,
  } = useCheckboxStyles(
    themeColor,
    variant,
    size,
    radius,
    labelAlignment,
    isActive
  )

  useEffect(() => {
    if (variant !== 'filled') return

    if (isActive) {
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
  }, [isActive, variant, backgroundScale, backgroundOpacity])

  const handlePress = () => {
    if (!isDisabled) {
      const nextValue = isIndeterminate ? true : !isChecked
      onValueChange?.(nextValue)
      if (!isControlled) {
        setInternalChecked(nextValue)
      }
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

  const accessibilityChecked = isIndeterminate ? 'mixed' : isChecked

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      accessible
      accessibilityRole="checkbox"
      accessibilityLabel={label}
      accessibilityState={{
        disabled: isDisabled,
        checked: accessibilityChecked,
      }}
      style={[
        styles.container,
        containerStyles,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
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
          <CheckboxIcon
            isChecked={isActive}
            isIndeterminate={isIndeterminate}
            color={checkmarkColor}
            size={sizeStyles.iconSize}
          />
        </View>
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            { fontSize: sizeStyles.fontSize, color: theme.colors.foreground },
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
