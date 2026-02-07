import React from 'react'
import { Animated, Easing, Pressable, Text, View } from 'react-native'
import { styles } from './chip.style'
import type { ChipProps } from './chip.type'
import {
  useChipSizeStyles,
  useChipRadiusStyles,
  useChipVariantStyles,
  useChipDotSize,
  useChipCloseSize,
} from './chip.hook'

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = 'solid',
  themeColor = 'default',
  size = 'md',
  radius = 'full',
  avatar,
  startContent,
  endContent,
  isDisabled = false,
  customAppearance,
  onClose,
  onPress,
}: ChipProps) => {
  const sizeStyles = useChipSizeStyles(size)
  const radiusStyles = useChipRadiusStyles(radius, sizeStyles.height)
  const variantStyles = useChipVariantStyles(themeColor, variant)
  const dotSize = useChipDotSize(size)
  const closeSize = useChipCloseSize(size)

  const isDotVariant = variant === 'dot'
  const hasClose = onClose !== undefined
  const isInteractive = onPress !== undefined || hasClose
  const scale = React.useRef(new Animated.Value(1)).current
  const opacity = React.useRef(new Animated.Value(1)).current

  const handlePressIn = React.useCallback(() => {
    if (!isInteractive || isDisabled) return
    Animated.timing(scale, {
      toValue: 0.97,
      duration: 90,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [isInteractive, isDisabled, scale])

  const handlePressOut = React.useCallback(() => {
    if (!isInteractive || isDisabled) return
    Animated.timing(scale, {
      toValue: 1,
      duration: 120,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [isInteractive, isDisabled, scale])

  const handleChipPress = React.useCallback(() => {
    if (isDisabled) return

    if (hasClose && onClose) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.92,
          duration: 150,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          onClose()
          opacity.setValue(1)
          scale.setValue(1)
        }
      })
      return
    }

    onPress?.()
  }, [hasClose, isDisabled, onClose, onPress, opacity, scale])

  const chipContent = (
    <Animated.View
      style={[
        styles.chip,
        {
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: variantStyles.backgroundColor,
          borderWidth: variantStyles.borderWidth,
          borderColor: variantStyles.borderColor,
          transform: [{ scale }],
          opacity,
        },
        radiusStyles,
        variantStyles.shadow,
        isDisabled && styles.disabled,
        customAppearance?.container,
      ]}
      accessible
      accessibilityRole="text"
    >
      {isDotVariant && (
        <View
          style={[
            styles.dot,
            {
              width: dotSize,
              height: dotSize,
              backgroundColor: variantStyles.dotColor,
            },
            customAppearance?.dot,
          ]}
        />
      )}

      {avatar && <View style={styles.avatar}>{avatar}</View>}

      {startContent && !avatar && (
        <View style={styles.startContent}>{startContent}</View>
      )}

      <Text
        style={[
          styles.text,
          { fontSize: sizeStyles.fontSize, color: variantStyles.color },
          customAppearance?.text,
        ]}
      >
        {children}
      </Text>

      {endContent && !hasClose && (
        <View style={styles.endContent}>{endContent}</View>
      )}

      {hasClose && (
        <View
          style={[
            styles.closeButton,
            { width: closeSize, height: closeSize },
            customAppearance?.closeButton,
          ]}
        >
          <Text
            style={{
              fontSize: closeSize - 2,
              color: variantStyles.color,
              lineHeight: closeSize,
            }}
          >
            ✕
          </Text>
        </View>
      )}
    </Animated.View>
  )

  if (isInteractive) {
    return (
      <Pressable
        onPress={isDisabled ? undefined : handleChipPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled}
      >
        {chipContent}
      </Pressable>
    )
  }

  return chipContent
}
