import React, { useContext, useEffect, useRef, useState } from 'react'
import { Animated, Pressable, Text } from 'react-native'
import { getSafeThemeColor } from '@xaui/core'
import { useXUITheme } from '../../core'
import type { RadioProps } from './radio.type'
import { RadioGroupContext } from './radio-context'
import {
  useSizeStyles,
  useRadiusStyles,
  useDotColors,
  useVariantStyles,
  useContainerStyles,
} from './radio.hook'
import { styles } from './radio.style'
import {
  runBackgroundInAnimation,
  runBackgroundOutAnimation,
  runDotInAnimation,
  runDotOutAnimation,
  runPressInAnimation,
  runPressOutAnimation,
} from './radio.animation'

export const Radio: React.FC<RadioProps> = ({
  label,
  value,
  labelAlignment,
  themeColor,
  variant,
  size,
  radius,
  fullWidth,
  isChecked: isCheckedProp,
  defaultChecked = false,
  isDisabled,
  labelStyle,
  style,
  onValueChange,
}: RadioProps) => {
  const group = useContext(RadioGroupContext)
  const theme = useXUITheme()

  const resolvedLabelAlignment = labelAlignment ?? group?.labelAlignment ?? 'right'
  const resolvedThemeColor = themeColor ?? group?.themeColor ?? 'primary'
  const resolvedVariant = variant ?? group?.variant ?? 'filled'
  const resolvedSize = size ?? group?.size ?? 'md'
  const resolvedRadius = radius ?? group?.radius ?? 'full'
  const resolvedFullWidth = fullWidth ?? group?.fullWidth ?? false
  const resolvedDisabled = !!(isDisabled || group?.isDisabled)

  const isInGroup = !!group && typeof value === 'string'
  const isControlledStandalone = typeof isCheckedProp === 'boolean'
  const [internalChecked, setInternalChecked] = useState(defaultChecked)

  const groupChecked = isInGroup ? group.selectedValue === value : false
  const isChecked = isInGroup
    ? groupChecked
    : isControlledStandalone
      ? isCheckedProp
      : internalChecked

  const colorScheme = theme.colors[getSafeThemeColor(resolvedThemeColor)]
  const scale = useRef(new Animated.Value(1)).current
  const backgroundScale = useRef(new Animated.Value(0.5)).current
  const backgroundOpacity = useRef(new Animated.Value(0)).current
  const dotScale = useRef(new Animated.Value(isChecked ? 1 : 0)).current
  const dotOpacity = useRef(new Animated.Value(isChecked ? 1 : 0)).current

  const sizeStyles = useSizeStyles(resolvedSize, resolvedVariant)
  const radiusStyles = useRadiusStyles(resolvedRadius)
  const dotColors = useDotColors(resolvedThemeColor, resolvedVariant, isChecked)
  const variantStyles = useVariantStyles(
    resolvedThemeColor,
    resolvedVariant,
    isChecked
  )
  const containerStyles = useContainerStyles(resolvedLabelAlignment)

  useEffect(() => {
    if (resolvedVariant !== 'filled') return

    if (isChecked) {
      runBackgroundInAnimation(backgroundScale, backgroundOpacity)
    } else {
      runBackgroundOutAnimation(backgroundScale, backgroundOpacity)
    }
  }, [backgroundOpacity, backgroundScale, isChecked, resolvedVariant])

  useEffect(() => {
    if (isChecked) {
      runDotInAnimation(dotScale, dotOpacity)
    } else {
      runDotOutAnimation(dotScale, dotOpacity)
    }
  }, [dotOpacity, dotScale, isChecked])

  const handlePress = () => {
    if (resolvedDisabled || isChecked) return

    if (isInGroup && value) {
      group.onValueChange?.(value)
      onValueChange?.(true)
      return
    }

    if (!isControlledStandalone) {
      setInternalChecked(true)
    }

    onValueChange?.(true)
  }

  const handlePressIn = () => {
    if (resolvedDisabled) return
    runPressInAnimation(scale)
  }

  const handlePressOut = () => {
    if (resolvedDisabled) return
    runPressOutAnimation(scale)
  }

  return (
    <Pressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={resolvedDisabled}
      accessible
      accessibilityRole="radio"
      accessibilityLabel={label}
      accessibilityState={{
        disabled: resolvedDisabled,
        checked: !!isChecked,
      }}
      style={[
        styles.container,
        containerStyles,
        resolvedFullWidth && styles.fullWidth,
        resolvedDisabled && styles.disabled,
        style,
      ]}
    >
      <Animated.View
        style={[
          styles.radio,
          {
            width: sizeStyles.radioSize,
            height: sizeStyles.radioSize,
            ...radiusStyles,
            ...variantStyles,
          },
          {
            transform: [{ scale }],
          },
        ]}
      >
        {resolvedVariant === 'filled' && (
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

        <Animated.View
          style={[
            styles.dot,
            {
              width: sizeStyles.dotSize,
              height: sizeStyles.dotSize,
              borderRadius: sizeStyles.dotSize / 2,
              backgroundColor: dotColors.checked,
              opacity: dotOpacity,
              transform: [{ scale: dotScale }],
            },
          ]}
        />
      </Animated.View>

      {label && (
        <Text
          style={[
            styles.label,
            { fontSize: sizeStyles.fontSize, color: theme.colors.foreground },
            resolvedDisabled && styles.disabledText,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  )
}
