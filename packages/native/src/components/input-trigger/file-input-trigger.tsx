import React from 'react'
import { getSafeThemeColor, withOpacity } from '@xaui/core'
import { Pressable, Text, View } from 'react-native'
import { useXUITheme } from '../../core'
import type { FileInputTriggerProps } from './input-trigger.type'
import {
  useInputTriggerRadiusStyles,
  useInputTriggerSizeStyles,
  useInputTriggerVariantStyles,
} from './input-trigger.hook'
import { FileInputPlusIcon } from './file-input-plus-icon'
import { styles } from './input-trigger.style'

const iconContainerSizeMap = {
  sm: 28,
  md: 32,
  lg: 36,
} as const

const dropzoneMinHeightMap = {
  sm: 88,
  md: 104,
  lg: 120,
} as const

export const FileInputTrigger: React.FC<FileInputTriggerProps> = ({
  value,
  placeholder = 'Select files',
  label,
  labelPlacement = 'outside',
  description,
  errorMessage,
  themeColor = 'primary',
  variant = 'colored',
  size = 'md',
  radius = 'md',
  isDisabled = false,
  isInvalid = false,
  fullWidth = false,
  centerContent,
  selectedContent,
  customAppearance,
  onPress,
}) => {
  const theme = useXUITheme()
  const sizeStyles = useInputTriggerSizeStyles(size)
  const radiusStyles = useInputTriggerRadiusStyles(radius)
  const variantStyles = useInputTriggerVariantStyles({
    themeColor,
    variant,
    isInvalid,
    isDisabled,
  })
  const safeThemeColor = getSafeThemeColor(themeColor)
  const colorScheme = theme.colors[safeThemeColor]

  const hasValue = value !== undefined && value !== null && value !== ''
  const hasSelectedContent =
    selectedContent !== undefined && selectedContent !== null
  const helperText = isInvalid && errorMessage ? errorMessage : description
  const iconContainerSize = iconContainerSizeMap[size]
  const dropzoneMinHeight = dropzoneMinHeightMap[size]
  const borderColor =
    variantStyles.container.borderColor ?? withOpacity(theme.colors.foreground, 0.24)
  const borderWidth =
    variantStyles.container.borderWidth ??
    variantStyles.container.borderBottomWidth ??
    theme.borderWidth.md

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

  const resolvedContent = centerContent
    ? centerContent
    : hasValue
      ? value
      : placeholder

  const shapeStyles = {
    minHeight: dropzoneMinHeight,
    borderRadius: variant === 'underlined' ? 0 : radiusStyles.borderRadius,
  }

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
              styles.fileTrigger,
              {
                paddingHorizontal: sizeStyles.paddingHorizontal,
                paddingVertical: sizeStyles.paddingVertical,
                gap: sizeStyles.slotGap,
                backgroundColor: variantStyles.container.backgroundColor,
                borderStyle: 'dashed',
                borderColor,
                borderWidth,
              },
              shapeStyles,
              variant === 'underlined' && styles.underlinedWrapper,
              customAppearance?.inputWrapper,
            ]}
          >
            {label && labelPlacement === 'inside' && renderLabel}

            {hasSelectedContent ? (
              <View style={styles.fileSelectedContent}>{selectedContent}</View>
            ) : (
              <>
                <View
                  style={[
                    styles.filePlusButton,
                    {
                      width: iconContainerSize,
                      height: iconContainerSize,
                      borderRadius: iconContainerSize / 2,
                      backgroundColor: withOpacity(colorScheme.main, 0.14),
                    },
                    customAppearance?.plusButton,
                  ]}
                >
                  <FileInputPlusIcon
                    size={Math.round(iconContainerSize * 0.5)}
                    color={colorScheme.main}
                  />
                </View>

                {typeof resolvedContent === 'string' ||
                typeof resolvedContent === 'number' ? (
                  <Text
                    numberOfLines={2}
                    style={[
                      styles.fileContent,
                      {
                        color: hasValue
                          ? variantStyles.textColor
                          : variantStyles.placeholderColor,
                        fontSize: sizeStyles.fontSize,
                      },
                      customAppearance?.content,
                    ]}
                  >
                    {resolvedContent}
                  </Text>
                ) : (
                  <View style={styles.fileCustomContent}>{resolvedContent}</View>
                )}
              </>
            )}
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
