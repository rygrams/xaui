import React from 'react'
import { Pressable, Text, View } from 'react-native'
import type { InputTriggerProps } from './input-trigger.type'
import {
  useInputTriggerRadiusStyles,
  useInputTriggerSizeStyles,
  useInputTriggerVariantStyles,
} from './input-trigger.hook'
import { styles } from './input-trigger.style'

export const InputTrigger: React.FC<InputTriggerProps> = ({
  value,
  placeholder = 'Select...',
  label,
  labelPlacement = 'outside',
  description,
  errorMessage,
  startContent,
  endContent,
  themeColor = 'primary',
  variant = 'colored',
  size = 'md',
  radius = 'md',
  isDisabled = false,
  isInvalid = false,
  fullWidth = true,
  customAppearance,
  onPress,
}) => {
  const sizeStyles = useInputTriggerSizeStyles(size)
  const radiusStyles = useInputTriggerRadiusStyles(radius)
  const variantStyles = useInputTriggerVariantStyles({
    themeColor,
    variant,
    isInvalid,
    isDisabled,
  })

  const hasValue = value !== undefined && value !== null && value !== ''
  const helperText = isInvalid && errorMessage ? errorMessage : description

  const renderLabel = label ? (
    typeof label === 'string' || typeof label === 'number' ? (
      <Text
        style={[
          styles.label,
          {
            color: variantStyles.labelColor,
            fontSize: sizeStyles.labelSize,
          },
          customAppearance?.label,
        ]}
      >
        {label}
      </Text>
    ) : (
      <View>{label}</View>
    )
  ) : null

  return (
    <View
      style={[
        styles.container,
        !fullWidth && styles.noFullWidth,
        isDisabled && styles.disabled,
        customAppearance?.container,
      ]}
    >
      <View style={[styles.inputContainer, customAppearance?.inputContainer]}>
        {label && labelPlacement === 'outside' && renderLabel}

        <Pressable
          onPress={isDisabled ? undefined : onPress}
          disabled={isDisabled}
          accessibilityRole="button"
        >
          <View
            style={[
              styles.inputWrapper,
              {
                minHeight: sizeStyles.minHeight,
                paddingVertical: sizeStyles.paddingVertical,
                paddingHorizontal:
                  variant === 'underlined' ? 0 : sizeStyles.paddingHorizontal,
                gap: sizeStyles.slotGap,
                backgroundColor: variantStyles.container.backgroundColor,
                borderWidth:
                  variant === 'underlined'
                    ? 0
                    : variantStyles.container.borderWidth,
                ...(variant === 'underlined' && {
                  borderBottomWidth: variantStyles.container.borderBottomWidth,
                }),
                borderRadius: variant === 'underlined' ? 0 : radiusStyles.borderRadius,
                borderColor:
                  variant === 'underlined'
                    ? variantStyles.container.borderColor
                    : variantStyles.container.borderColor,
              },
              variant === 'underlined' && styles.underlinedWrapper,
              customAppearance?.inputWrapper,
            ]}
          >
            {startContent && <View style={styles.slot}>{startContent}</View>}

            <View
              style={{
                flex: 1,
                gap: labelPlacement === 'inside' && label ? 2 : 0,
              }}
            >
              {label && labelPlacement === 'inside' && renderLabel}

              {typeof value === 'string' || typeof value === 'number' ? (
                <Text
                  numberOfLines={1}
                  style={[
                    styles.content,
                    {
                      color: hasValue
                        ? variantStyles.textColor
                        : variantStyles.placeholderColor,
                      fontSize: sizeStyles.fontSize,
                    },
                    customAppearance?.content,
                  ]}
                >
                  {hasValue ? value : placeholder}
                </Text>
              ) : hasValue ? (
                <View style={{ flex: 1 }}>{value}</View>
              ) : (
                <Text
                  style={[
                    styles.content,
                    {
                      color: variantStyles.placeholderColor,
                      fontSize: sizeStyles.fontSize,
                    },
                    customAppearance?.content,
                  ]}
                >
                  {placeholder}
                </Text>
              )}
            </View>

            {endContent && <View style={styles.slot}>{endContent}</View>}
          </View>
        </Pressable>
      </View>

      {helperText ? (
        typeof helperText === 'string' || typeof helperText === 'number' ? (
          <Text
            style={[
              styles.helperText,
              {
                color: variantStyles.helperColor,
                fontSize: sizeStyles.helperSize,
              },
              customAppearance?.helperText,
            ]}
          >
            {helperText}
          </Text>
        ) : (
          <View>{helperText}</View>
        )
      ) : null}
    </View>
  )
}
