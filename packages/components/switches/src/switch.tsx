import React, { useMemo, useEffect, useRef } from 'react'
import { Pressable, Text, View, StyleSheet, Animated } from 'react-native'
import { useXUITheme } from '@xaui/core'
import { colors } from '@xaui/colors'
import type { SwitchProps } from './switch-types'

export const Switch: React.FC<SwitchProps> = ({
  label,
  labelAlignment = 'right',
  themeColor = 'primary',
  variant = 'inside',
  size = 'md',
  radius = 'full',
  fullWidth = false,
  isSelected = false,
  isDisabled = false,
  labelStyle,
  style,
  onValueChange,
}) => {
  const theme = useXUITheme()
  const scale = useRef(new Animated.Value(1)).current
  const thumbPosition = useRef(new Animated.Value(isSelected ? 1 : 0)).current
  const thumbScale = useRef(new Animated.Value(1)).current

  const colorScheme = theme.colors[themeColor]

  const sizeStyles = useMemo(() => {
    if (variant === 'overlap') {
      const sizes = {
        sm: {
          trackWidth: 40,
          trackHeight: 16,
          thumbSize: 22,
          fontSize: theme.fontSizes.sm,
          padding: 0,
        },
        md: {
          trackWidth: 48,
          trackHeight: 18,
          thumbSize: 26,
          fontSize: theme.fontSizes.md,
          padding: 0,
        },
        lg: {
          trackWidth: 56,
          trackHeight: 20,
          thumbSize: 30,
          fontSize: theme.fontSizes.lg,
          padding: 0,
        },
      }
      return sizes[size]
    }

    const sizes = {
      sm: {
        trackWidth: 40,
        trackHeight: 24,
        thumbSize: 18,
        fontSize: theme.fontSizes.sm,
        padding: 3,
      },
      md: {
        trackWidth: 48,
        trackHeight: 28,
        thumbSize: 22,
        fontSize: theme.fontSizes.md,
        padding: 3,
      },
      lg: {
        trackWidth: 56,
        trackHeight: 32,
        thumbSize: 26,
        fontSize: theme.fontSizes.lg,
        padding: 3,
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

  const thumbRadius = useMemo(() => {
    const radiusLookup = {
      none: theme.borderRadius.none,
      sm: theme.borderRadius.sm,
      md: theme.borderRadius.md,
      lg: theme.borderRadius.lg,
      full: theme.borderRadius.full,
    }
    return radiusLookup[radius]
  }, [radius, theme])

  const trackStyles = useMemo(() => {
    const baseTrackColor = isSelected
      ? variant === 'overlap'
        ? colorScheme.background
        : colorScheme.main
      : colors.gray[300]

    return {
      width: sizeStyles.trackWidth,
      height: sizeStyles.trackHeight,
      backgroundColor: baseTrackColor,
      ...radiusStyles,
      paddingHorizontal: sizeStyles.padding,
    }
  }, [sizeStyles, radiusStyles, isSelected, colorScheme])

  const thumbStyles = useMemo(() => {
    const maxTranslateX =
      variant === 'overlap'
        ? sizeStyles.trackWidth - sizeStyles.thumbSize
        : sizeStyles.trackWidth - sizeStyles.thumbSize - sizeStyles.padding * 2

    const translateX = thumbPosition.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxTranslateX],
    })

    return {
      width: sizeStyles.thumbSize,
      height: sizeStyles.thumbSize,
      borderRadius: thumbRadius,
      backgroundColor:
        variant === 'overlap' && isSelected ? colorScheme.main : colors.white,
      transform: [{ translateX }, { scale: thumbScale }],
      ...(variant === 'overlap' && {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }),
    }
  }, [
    sizeStyles,
    thumbPosition,
    thumbScale,
    thumbRadius,
    variant,
    isSelected,
    colorScheme,
  ])

  const containerStyles = useMemo(() => {
    const isJustified =
      labelAlignment === 'justify-left' || labelAlignment === 'justify-right'

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
    Animated.spring(thumbPosition, {
      toValue: isSelected ? 1 : 0,
      useNativeDriver: true,
      damping: 15,
      stiffness: 150,
    }).start()
  }, [isSelected, thumbPosition])

  const handlePress = () => {
    if (isDisabled) return
    onValueChange?.(!isSelected)
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
      style={[styles.container, containerStyles, isDisabled && styles.disabled, style]}
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
          <Animated.View style={[styles.thumb, thumbStyles]} />
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
  track: {
    justifyContent: 'center',
    position: 'relative',
  },
  thumbContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumb: {
    position: 'absolute',
    left: 0,
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
