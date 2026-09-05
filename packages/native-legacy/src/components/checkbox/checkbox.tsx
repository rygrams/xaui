import React, { useEffect, useRef, useState } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import type { CheckboxProps } from './checkbox.type'
import { CheckboxIcon } from './checkbox-icon'
import {
  useSizeStyles,
  useRadiusStyles,
  useCheckmarkColors,
  useVariantStyles,
  useContainerStyles,
} from './checkbox.hook'
import { styles } from './checkbox.style'
import {
  runBackgroundInAnimation,
  runBackgroundOutAnimation,
  runPressInAnimation,
  runPressOutAnimation,
} from './checkbox.animation'
import { useXUITheme } from '../../core'
import { getSafeThemeColor } from '../../core-shim'

/**
 * @deprecated Use `Checkbox` from `@xaui/native/checkbox`. This tree is frozen and
 * receives fixes only.
 *
 * **The root is the row there, not the box**, which is why `label` and `labelStyle`
 * disappear: the label is `Checkbox.Label`, a slot on a pressable root, so tapping the
 * words ticks the box. Text children become that label on their own.
 *
 * `isChecked` / `onValueChange` become `isSelected` / `onSelectedChange`, and the
 * component works uncontrolled with `defaultSelected`. `isIndeterminate` survives, and a
 * press resolves it to selected rather than toggling back into it.
 *
 * `themeColor` and `variant` fold into one `variant` on the `field*` tokens — three levels,
 * not four: a box with no border and no fill is nothing at all. `size` loses `xs` for the
 * same reason a tick drawn in sixteen points stops reading as a tick. `labelAlignment`
 * becomes `flexDirection` on the root, and `fullWidth` is gone.
 *
 * ```tsx
 * // legacy
 * <Checkbox isChecked={on} onValueChange={setOn} label="J'accepte" themeColor="primary" />
 *
 * // v1
 * <Checkbox isSelected={on} onSelectedChange={setOn}>J'accepte</Checkbox>
 * ```
 */
export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  labelAlignment = 'right',
  themeColor = 'primary',
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
}: CheckboxProps) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[getSafeThemeColor(themeColor)]
  const isControlled = typeof isCheckedProp === 'boolean'
  const [internalChecked, setInternalChecked] = useState(isCheckedProp ?? false)
  const isChecked = isControlled ? isCheckedProp : internalChecked
  const scale = useRef(new Animated.Value(1)).current
  const backgroundScale = useRef(new Animated.Value(0.5)).current
  const backgroundOpacity = useRef(new Animated.Value(0)).current
  const isActive = isChecked || isIndeterminate

  const sizeStyles = useSizeStyles(size, variant)
  const radiusStyles = useRadiusStyles(radius)
  const checkmarkColors = useCheckmarkColors(themeColor, variant, isActive)
  const variantStyles = useVariantStyles(themeColor, variant, isActive)
  const containerStyles = useContainerStyles(labelAlignment)

  useEffect(() => {
    if (variant !== 'filled') return

    if (isActive) {
      runBackgroundInAnimation(backgroundScale, backgroundOpacity)
    } else {
      runBackgroundOutAnimation(backgroundScale, backgroundOpacity)
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
      runPressInAnimation(scale)
    }
  }

  const handlePressOut = () => {
    if (!isDisabled) {
      runPressOutAnimation(scale)
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
          {
            width: sizeStyles.checkboxSize,
            height: sizeStyles.checkboxSize,
            ...radiusStyles,
            ...variantStyles,
          },
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
            color={checkmarkColors.checked}
            size={sizeStyles.iconSize}
            placeholderColor={checkmarkColors.unchecked}
            variant={variant}
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
