import React from 'react'
import { Pressable, Text, View, Animated } from 'react-native'
import { ActivityIndicator } from '../indicator'
import { styles } from './button.style'
import { useSizesStyles, useTextStyles, useVariantSizesStyles } from './button.hook'
import type { ButtonProps } from './button.type'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { runPressInAnimation, runPressOutAnimation } from './button.animation'

export const Button: React.FC<ButtonProps> = ({
  children,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'md',
  startContent,
  endContent,
  spinnerPlacement = 'start',
  fullWidth = false,
  isDisabled = false,
  isLoading = false,
  elevation = 0,
  customAppearance,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}: ButtonProps) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current
  const animatedOpacity = React.useRef(new Animated.Value(1)).current

  const { sizeStyles, spinnerSize } = useSizesStyles(size)
  const radiusStyles = useBorderRadiusStyles(radius)
  const variantStyles = useVariantSizesStyles(themeColor, variant, elevation)
  const { textColor } = useTextStyles(themeColor, variant)

  const handlePressIn = (
    event: Parameters<NonNullable<ButtonProps['onPressIn']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      runPressInAnimation(animatedScale, animatedOpacity)
    }
    onPressIn?.(event)
  }

  const handlePressOut = (
    event: Parameters<NonNullable<ButtonProps['onPressOut']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      runPressOutAnimation(animatedScale, animatedOpacity)
    }
    onPressOut?.(event)
  }

  const spinner = (
    <ActivityIndicator
      variant="circular"
      themeColor={variant === 'solid' ? undefined : themeColor}
      color={variant === 'solid' ? textColor : undefined}
      size={spinnerSize}
    />
  )

  return (
    <View style={[fullWidth && styles.fullWidth, customAppearance?.container]}>
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
            customAppearance?.button,
          ]}
        >
          <View style={styles.contentContainer}>
            {startContent && (!isLoading || spinnerPlacement !== 'start') && (
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
                customAppearance?.text,
              ]}
            >
              {children}
            </Text>

            {isLoading && spinnerPlacement === 'end' && (
              <View style={styles.spinner}>{spinner}</View>
            )}

            {endContent && (!isLoading || spinnerPlacement !== 'end') && (
              <View style={styles.endContent}>{endContent}</View>
            )}
          </View>
        </Animated.View>
      </Pressable>
    </View>
  )
}
