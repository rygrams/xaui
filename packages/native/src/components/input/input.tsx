import React, { forwardRef, useMemo, useState, useRef, useEffect } from 'react'
import {
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
  Animated,
} from 'react-native'
import { CloseIcon } from '@xaui/icons'
import type { TextInputProps } from './input.type'
import {
  useTextInputRadiusStyles,
  useTextInputSizeStyles,
  useTextInputVariantStyles,
} from './input.hook'
import { styles } from './input.style'

export const TextInput = forwardRef<
  React.ComponentRef<typeof RNTextInput>,
  TextInputProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      onChangeText,
      onFocus,
      onBlur,
      label,
      labelPlacement = 'outside',
      description,
      errorMessage,
      startContent,
      endContent,
      themeColor = 'primary',
      variant = 'flat',
      size = 'md',
      radius = 'md',
      isSecured = false,
      isClearable = false,
      isDisabled = false,
      isReadOnly = false,
      isInvalid = false,
      fullWidth = true,
      customAppearance,
      ...nativeProps
    },
    forwardedRef
  ) => {
    const isControlled = typeof value === 'string'
    const [internalValue, setInternalValue] = useState(defaultValue ?? '')
    const [isFocused, setIsFocused] = useState(false)
    const internalRef = useRef<RNTextInput>(null)
    const borderAnimation = useRef(new Animated.Value(0)).current

    const inputValue = isControlled ? (value ?? '') : internalValue
    const secureTextEntry = nativeProps.secureTextEntry ?? isSecured
    const sizeStyles = useTextInputSizeStyles(size)
    const radiusStyles = useTextInputRadiusStyles(radius)
    const variantStyles = useTextInputVariantStyles({
      themeColor,
      variant,
      isFocused,
      isInvalid,
      isDisabled,
    })

    useEffect(() => {
      Animated.timing(borderAnimation, {
        toValue: isFocused || isInvalid ? 1 : 0,
        duration: 200,
        useNativeDriver: false,
      }).start()
    }, [borderAnimation, isFocused, isInvalid])

    const showClearButton =
      isClearable &&
      !!inputValue &&
      !isDisabled &&
      !isReadOnly &&
      !secureTextEntry &&
      nativeProps.editable !== false

    const editable = nativeProps.editable ?? (!isDisabled && !isReadOnly)

    const helperText = useMemo(() => {
      if (isInvalid && errorMessage) {
        return errorMessage
      }

      return description
    }, [description, errorMessage, isInvalid])

    const handleChangeText = (text: string) => {
      if (!isControlled) {
        setInternalValue(text)
      }

      onValueChange?.(text)
      onChangeText?.(text)
    }

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue('')
      }

      onValueChange?.('')
      onChangeText?.('')
    }

    const handleWrapperPress = () => {
      if (isDisabled || isReadOnly || nativeProps.editable === false) return

      const inputRef = (forwardedRef as React.RefObject<RNTextInput>) || internalRef

      if (typeof forwardedRef === 'function') {
        internalRef.current?.focus()
      } else if (inputRef?.current) {
        inputRef.current.focus()
      }
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
          {label && labelPlacement === 'outside' && (
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
          )}

          <Pressable
            onPress={handleWrapperPress}
            disabled={isDisabled || isReadOnly}
          >
            <Animated.View
              style={[
                styles.inputWrapper,
                {
                  minHeight: sizeStyles.minHeight,
                  paddingVertical: sizeStyles.paddingVertical,
                  paddingHorizontal: sizeStyles.paddingHorizontal,
                  gap: sizeStyles.slotGap,
                  backgroundColor: variantStyles.container.backgroundColor,
                  borderWidth:
                    variant === 'underlined'
                      ? 0
                      : variantStyles.container.borderWidth,
                  ...(variant === 'underlined' && {
                    borderBottomWidth: variantStyles.container.borderBottomWidth,
                  }),
                  borderRadius:
                    variant === 'underlined' ? 0 : radiusStyles.borderRadius,
                  ...(variant === 'underlined'
                    ? {
                        borderBottomColor: borderAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            variantStyles.unfocusedBorderColor,
                            variantStyles.focusedBorderColor,
                          ],
                        }),
                      }
                    : {
                        borderColor: borderAnimation.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            variantStyles.unfocusedBorderColor,
                            variantStyles.focusedBorderColor,
                          ],
                        }),
                      }),
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
                {label && labelPlacement === 'inside' && (
                  <Text
                    style={[
                      styles.label,
                      {
                        color: variantStyles.labelColor,
                        fontSize: sizeStyles.helperSize,
                        paddingBottom: 2,
                      },
                      customAppearance?.label,
                    ]}
                  >
                    {label}
                  </Text>
                )}

                <RNTextInput
                  ref={
                    typeof forwardedRef === 'function'
                      ? internalRef
                      : forwardedRef || internalRef
                  }
                  value={inputValue}
                  onChangeText={handleChangeText}
                  onFocus={event => {
                    setIsFocused(true)
                    onFocus?.(event)
                  }}
                  onBlur={event => {
                    setIsFocused(false)
                    onBlur?.(event)
                  }}
                  editable={editable}
                  secureTextEntry={secureTextEntry}
                  placeholderTextColor={variantStyles.placeholderColor}
                  style={[
                    styles.input,
                    {
                      color: variantStyles.textColor,
                      fontSize: sizeStyles.fontSize,
                    },
                    customAppearance?.input,
                  ]}
                  {...nativeProps}
                />
              </View>

              {showClearButton ? (
                <Pressable
                  onPress={handleClear}
                  accessibilityLabel="Clear input"
                  accessibilityRole="button"
                  style={styles.clearButton}
                >
                  <CloseIcon size={16} color={variantStyles.placeholderColor} />
                </Pressable>
              ) : (
                endContent && <View style={styles.slot}>{endContent}</View>
              )}
            </Animated.View>
          </Pressable>
        </View>

        {helperText && (
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
        )}
      </View>
    )
  }
)

TextInput.displayName = 'TextInput'
