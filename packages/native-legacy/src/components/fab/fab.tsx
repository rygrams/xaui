import React from 'react'
import { Pressable, Text, View, Animated } from 'react-native'
import { ActivityIndicator } from '../indicator'
import { styles } from './fab.style'
import {
  useFabSizeStyles,
  useFabVariantStyles,
  useFabIconColor,
  useFabRadiusValue,
} from './fab.hook'
import { runFabPressInAnimation, runFabPressOutAnimation } from './fab.animation'
import type { FabProps } from './fab.type'

export const Fab: React.FC<FabProps> = ({
  icon,
  label,
  themeColor = 'primary',
  variant = 'solid',
  size = 'md',
  radius,
  isDisabled = false,
  isLoading = false,
  elevation = 0,
  customAppearance,
  onPress,
  onLongPress,
  onPressIn,
  onPressOut,
}: FabProps) => {
  const animatedScale = React.useRef(new Animated.Value(1)).current
  const animatedOpacity = React.useRef(new Animated.Value(1)).current

  const { sizeStyles, extendedSizeStyles } = useFabSizeStyles(size)
  const variantStyles = useFabVariantStyles(themeColor, variant, elevation)
  const { iconColor } = useFabIconColor(themeColor, variant)
  const isExtended = !!label
  const resolvedRadius = useFabRadiusValue(
    radius,
    isExtended ? extendedSizeStyles.borderRadius : sizeStyles.borderRadius
  )

  const handlePressIn = (
    event: Parameters<NonNullable<FabProps['onPressIn']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      runFabPressInAnimation(animatedScale, animatedOpacity)
    }
    onPressIn?.(event)
  }

  const handlePressOut = (
    event: Parameters<NonNullable<FabProps['onPressOut']>>[0]
  ) => {
    if (!isDisabled && !isLoading) {
      runFabPressOutAnimation(animatedScale, animatedOpacity)
    }
    onPressOut?.(event)
  }

  const fabDimensionStyles = isExtended
    ? {
        height: extendedSizeStyles.height,
        borderRadius: resolvedRadius,
        paddingHorizontal: extendedSizeStyles.paddingHorizontal,
      }
    : {
        width: sizeStyles.width,
        height: sizeStyles.height,
        borderRadius: resolvedRadius,
      }

  return (
    <View style={[styles.container, customAppearance?.container]}>
      <Pressable
        onPress={isDisabled || isLoading ? undefined : onPress}
        onLongPress={isDisabled || isLoading ? undefined : onLongPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={isDisabled || isLoading}
      >
        <Animated.View
          style={[
            styles.fab,
            fabDimensionStyles,
            variantStyles,
            isDisabled && styles.disabled,
            {
              transform: [{ scale: animatedScale }],
              opacity: animatedOpacity,
            },
            customAppearance?.fab,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator
              variant="circular"
              themeColor={variant === 'solid' ? undefined : themeColor}
              color={variant === 'solid' ? iconColor : undefined}
              size={isExtended ? extendedSizeStyles.iconSize : sizeStyles.iconSize}
            />
          ) : (
            <View style={styles.contentContainer}>
              {icon}
              {isExtended && (
                <Text
                  style={[
                    styles.label,
                    {
                      fontSize: isExtended
                        ? extendedSizeStyles.fontSize
                        : sizeStyles.fontSize,
                      color: iconColor,
                    },
                  ]}
                >
                  {label}
                </Text>
              )}
            </View>
          )}
        </Animated.View>
      </Pressable>
    </View>
  )
}
