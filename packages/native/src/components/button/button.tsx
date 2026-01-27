import React from 'react'
import { Pressable, Text, View, Animated } from 'react-native'
import { ActivityIndicator } from '../indicator'
import { styles } from './button.style'
import { useButtonStyles } from './button.hook'
import type { ButtonProps } from './button.type'

export const Button: React.FC<ButtonProps> = ({
  children,
  themeColor = 'default',
  variant = 'solid',
  size = 'md',
  radius = 'md',
  startContent,
  endContent,
  spinnerPlacement = 'start',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  textStyle,
  style,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current
  const animatedOpacity = React.useRef(new Animated.Value(1)).current

  const { sizeStyles, radiusStyles, variantStyles, textColor, spinnerSize } =
    useButtonStyles(themeColor, variant, size, radius)

  const handlePressIn = (event: Parameters<NonNullable<ButtonProps['onPressIn']>>[0]) => {
    if (!isDisabled && !isLoading) {
      Animated.parallel([
        Animated.spring(animatedScale, {
          toValue: 0.975,
          useNativeDriver: true,
          speed: 50,
          bounciness: 0,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 0.9,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start()
    }
    onPressIn?.(event)
  }

  const handlePressOut = (
    event: Parameters<NonNullable<ButtonProps['onPressOut']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      Animated.parallel([
        Animated.spring(animatedScale, {
          toValue: 1,
          useNativeDriver: true,
          speed: 50,
          bounciness: 0,
        }),
        Animated.timing(animatedOpacity, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start()
    }
    onPressOut?.(event)
  }

  const spinner = (
    <ActivityIndicator
      variant="circular"
      themeColor={variant === 'solid' || variant === 'elevated' ? undefined : themeColor}
      color={variant === 'solid' || variant === 'elevated' ? textColor : undefined}
      size={spinnerSize}
    />
  )

  return (
    <View style={[fullWidth && styles.fullWidth]}>
      <Pressable
        onPress={isDisabled || isLoading ? undefined : onPress}
        onLongPress={isDisabled || isLoading ? undefined : onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled || isLoading}
      >
        <Animated.View
          style={[
            styles.button,
            sizeStyles,
            radiusStyles,
            variantStyles,
            fullWidth && styles.fullWidth,
            isDisabled && styles.disabled,
            {
              transform: [{ scale: animatedScale }],
              opacity: animatedOpacity,
            },
            style,
          ]}
        >
          <View style={styles.contentContainer}>
            {startContent && !isLoading && (
              <View style={styles.startContent}>{startContent}</View>
            )}

            {isLoading && spinnerPlacement === 'start' && (
              <View style={styles.spinner}>{spinner}</View>
            )}

            <Text
              style={[
                styles.text,
                { fontSize: sizeStyles.fontSize, color: textColor },
                isDisabled && styles.disabledText,
                textStyle,
              ]}
            >
              {children}
            </Text>

            {isLoading && spinnerPlacement === 'end' && (
              <View style={styles.spinner}>{spinner}</View>
            )}

            {endContent && !isLoading && (
              <View style={styles.endContent}>{endContent}</View>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </View>
  )
}
