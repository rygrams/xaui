import React from 'react'
import { Pressable, Text, View } from 'react-native'
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

  const chipContent = (
    <View
      style={[
        styles.chip,
        {
          height: sizeStyles.height,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          backgroundColor: variantStyles.backgroundColor,
          borderWidth: variantStyles.borderWidth,
          borderColor: variantStyles.borderColor,
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
        <Pressable
          onPress={isDisabled ? undefined : onClose}
          disabled={isDisabled}
          style={[
            styles.closeButton,
            { width: closeSize, height: closeSize },
            customAppearance?.closeButton,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Close"
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
        </Pressable>
      )}
    </View>
  )

  if (onPress) {
    return (
      <Pressable
        onPress={isDisabled ? undefined : onPress}
        disabled={isDisabled}
      >
        {chipContent}
      </Pressable>
    )
  }

  return chipContent
}
