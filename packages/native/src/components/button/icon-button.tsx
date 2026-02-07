import React from 'react'
import { Pressable, View, Animated } from 'react-native'
import { ActivityIndicator } from '../indicator'
import { iconButtonStyles } from './icon-button.style'
import { useIconButtonSizeStyles } from './icon-button.hook'
import { useVariantSizesStyles, useTextStyles } from './button.hook'
import type { IconButtonProps } from './icon-button.type'
import { useBorderRadiusStyles } from '../../core/theme-hooks'
import { runPressInAnimation, runPressOutAnimation } from './button.animation'

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  radius = 'md',
  isDisabled = false,
  isLoading = false,
  elevation = 0,
  customAppearance,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}: IconButtonProps) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current
  const animatedOpacity = React.useRef(new Animated.Value(1)).current

  const sizeStyles = useIconButtonSizeStyles(size)
  const radiusStyles = useBorderRadiusStyles(radius)
  const variantStyles = useVariantSizesStyles(themeColor, variant, elevation)
  const { textColor } = useTextStyles(themeColor, variant)

  const handlePressIn = (
    event: Parameters<NonNullable<IconButtonProps['onPressIn']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      runPressInAnimation(animatedScale, animatedOpacity)
    }
    onPressIn?.(event)
  }

  const handlePressOut = (
    event: Parameters<NonNullable<IconButtonProps['onPressOut']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      runPressOutAnimation(animatedScale, animatedOpacity)
    }
    onPressOut?.(event)
  }

  const spinnerSize = {
    xs: 14,
    sm: 16,
    md: 18,
    lg: 20,
  }[size]

  return (
    <View style={[iconButtonStyles.container, customAppearance?.container]}>
      <Pressable
        onPress={isDisabled || isLoading ? undefined : onPress}
        onLongPress={isDisabled || isLoading ? undefined : onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled || isLoading}
      >
        <Animated.View
          style={[
            iconButtonStyles.button,
            sizeStyles,
            radiusStyles,
            variantStyles,
            isDisabled && iconButtonStyles.disabled,
            {
              transform: [{ scale: animatedScale }],
              opacity: animatedOpacity,
            },
            customAppearance?.button,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator
              variant="circular"
              themeColor={variant === 'solid' ? undefined : themeColor}
              color={variant === 'solid' ? textColor : undefined}
              size={spinnerSize}
            />
          ) : (
            icon
          )}
        </Animated.View>
      </Pressable>
    </View>
  )
}
