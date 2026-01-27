import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import type { SwitchProps } from './switch.type'
import { useSwitchStyles } from './switch.hook'
import { styles } from './switch.style'
import { useXUITheme } from '../../core'

export const Switch: React.FC<SwitchProps> = ({
  label,
  labelAlignment = 'right',
  themeColor = 'default',
  variant = 'inside',
  size = 'md',
  radius = 'full',
  fullWidth = false,
  isSelected: isSelectedProp,
  isDisabled = false,
  labelStyle,
  style,
  onValueChange,
}) => {
  const theme = useXUITheme()
  const isControlled = typeof isSelectedProp === 'boolean'
  const [internalSelected, setInternalSelected] = useState(isSelectedProp ?? false)
  const isSelected = isControlled ? isSelectedProp : internalSelected
  const scale = useRef(new Animated.Value(1)).current
  const thumbPosition = useRef(new Animated.Value(isSelected ? 1 : 0)).current
  const thumbScale = useRef(new Animated.Value(1)).current

  const { sizeStyles, trackStyles, thumbStyles, containerStyles } = useSwitchStyles(
    themeColor,
    variant,
    size,
    radius,
    labelAlignment,
    isSelected
  )

  const maxTranslateX = useMemo(() => {
    if (variant === 'overlap') {
      return sizeStyles.trackWidth - sizeStyles.thumbSize
    }

    return (
      sizeStyles.trackWidth - sizeStyles.thumbSize - sizeStyles.padding * 2
    )
  }, [sizeStyles, variant])

  const translateX = useMemo(
    () =>
      thumbPosition.interpolate({
        inputRange: [0, 1],
        outputRange: [0, maxTranslateX],
      }),
    [maxTranslateX, thumbPosition]
  )

  useEffect(() => {
    Animated.spring(thumbPosition, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start()
  }, [isSelected, thumbPosition])

  const handlePress = () => {
    if (isDisabled) return

    const nextValue = !isSelected
    onValueChange?.(nextValue)
    if (!isControlled) {
      setInternalSelected(nextValue)
    }
  }

  const handlePressIn = () => {
    if (isDisabled) return

    Animated.parallel([
      Animated.spring(scale, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(thumbScale, {
        toValue: variant === 'overlap' ? 1.1 : 1.2,
        useNativeDriver: true,
      }),
    ]).start()
  }

  const handlePressOut = () => {
    if (isDisabled) return

    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(thumbScale, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start()
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      accessible
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{
        disabled: isDisabled,
        checked: isSelected,
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
          styles.track,
          trackStyles,
          {
            transform: [{ scale }],
          },
        ]}
      >
        <View style={styles.thumbContainer}>
          <Animated.View
            style={[
              styles.thumb,
              thumbStyles,
              {
                transform: [{ translateX }, { scale: thumbScale }],
              },
            ]}
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
