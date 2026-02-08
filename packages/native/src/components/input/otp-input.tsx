import React, { useEffect, useRef } from 'react'
import {
  Animated,
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native'
import type { OTPInputProps } from './otp-input.type'
import { useOTPInputState, useOTPSegmentSizeStyles } from './otp-input.hook'
import {
  useTextInputRadiusStyles,
  useTextInputVariantStyles,
} from './input.hook'
import { otpStyles } from './otp-input.style'

const OTPSegment = ({
  char,
  isActive,
  isSecured,
  isDisabled,
  variantStyles,
  sizeStyles,
  radiusStyles,
  customSegment,
  customSegmentText,
  inputRef,
  onChangeText,
  onKeyPress,
  onFocus,
  onBlur,
}: {
  char: string
  isActive: boolean
  isSecured: boolean
  isDisabled: boolean
  variantStyles: ReturnType<typeof useTextInputVariantStyles>
  sizeStyles: ReturnType<typeof useOTPSegmentSizeStyles>
  radiusStyles: { borderRadius: number }
  customSegment?: OTPInputProps['customAppearance']
  customSegmentText?: OTPInputProps['customAppearance']
  inputRef: (ref: RNTextInput | null) => void
  onChangeText: (text: string) => void
  onKeyPress: (key: string) => void
  onFocus: () => void
  onBlur: () => void
}) => {
  const borderAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [borderAnimation, isActive])

  return (
    <Pressable
      onPress={() => {
        if (!isDisabled) {
          const inputEl = inputRef as unknown as { current: RNTextInput | null }
          if (typeof inputEl !== 'function') return
        }
      }}
      disabled={isDisabled}
    >
      <Animated.View
        style={[
          otpStyles.segment,
          {
            width: sizeStyles.width,
            height: sizeStyles.height,
            backgroundColor: variantStyles.container.backgroundColor,
            borderWidth: variantStyles.container.borderWidth ?? 0,
            borderRadius: radiusStyles.borderRadius,
            borderColor: borderAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [
                variantStyles.unfocusedBorderColor,
                variantStyles.focusedBorderColor,
              ],
            }),
          },
          customSegment?.segment,
        ]}
      >
        {char && isSecured ? (
          <View
            style={[
              otpStyles.securedDot,
              { backgroundColor: variantStyles.textColor },
            ]}
          />
        ) : (
          <Text
            style={[
              otpStyles.segmentText,
              {
                color: variantStyles.textColor,
                fontSize: sizeStyles.fontSize,
              },
              customSegmentText?.segmentText,
            ]}
          >
            {char}
          </Text>
        )}
        <RNTextInput
          ref={inputRef}
          style={otpStyles.hiddenInput}
          value={char}
          onChangeText={onChangeText}
          onKeyPress={e => onKeyPress(e.nativeEvent.key)}
          onFocus={onFocus}
          onBlur={onBlur}
          maxLength={2}
          keyboardType="number-pad"
          editable={!isDisabled}
          caretHidden
        />
      </Animated.View>
    </Pressable>
  )
}

export const OTPInput = ({
  length = 4,
  value,
  defaultValue,
  onValueChange,
  onComplete,
  variant = 'flat',
  size = 'md',
  radius = 'md',
  themeColor = 'primary',
  isDisabled = false,
  isInvalid = false,
  isSecured = false,
  errorMessage,
  description,
  label,
  allowedKeys = /^[0-9]$/,
  customAppearance,
  fullWidth = false,
}: OTPInputProps) => {
  const sizeStyles = useOTPSegmentSizeStyles(size)
  const radiusStyles = useTextInputRadiusStyles(radius)
  const variantStyles = useTextInputVariantStyles({
    themeColor,
    variant,
    isFocused: false,
    isInvalid,
    isDisabled,
  })

  const {
    segments,
    activeIndex,
    refs,
    handleSegmentChange,
    handleSegmentKeyPress,
    handleSegmentFocus,
    handleSegmentBlur,
  } = useOTPInputState({
    length,
    value,
    defaultValue,
    onValueChange,
    onComplete,
    allowedKeys,
  })

  const helperText = isInvalid && errorMessage ? errorMessage : description
  const helperColor = isInvalid
    ? variantStyles.helperColor
    : variantStyles.helperColor

  const activeVariantStyles = useTextInputVariantStyles({
    themeColor,
    variant,
    isFocused: true,
    isInvalid,
    isDisabled,
  })

  return (
    <View
      style={[
        otpStyles.container,
        fullWidth && otpStyles.fullWidth,
        isDisabled && otpStyles.disabled,
        customAppearance?.container,
      ]}
    >
      {label && (
        <Text
          style={[
            otpStyles.label,
            {
              color: variantStyles.labelColor,
              fontSize: 14,
            },
            customAppearance?.label,
          ]}
        >
          {label}
        </Text>
      )}

      <View
        style={[otpStyles.segmentContainer, customAppearance?.segmentContainer]}
      >
        {segments.map((char, index) => (
          <OTPSegment
            key={index}
            char={char}
            isActive={activeIndex === index}
            isSecured={isSecured}
            isDisabled={isDisabled}
            variantStyles={
              activeIndex === index ? activeVariantStyles : variantStyles
            }
            sizeStyles={sizeStyles}
            radiusStyles={radiusStyles}
            customSegment={customAppearance}
            customSegmentText={customAppearance}
            inputRef={ref => {
              refs.current[index] = ref
            }}
            onChangeText={text => handleSegmentChange(index, text)}
            onKeyPress={key => handleSegmentKeyPress(index, key)}
            onFocus={() => handleSegmentFocus(index)}
            onBlur={handleSegmentBlur}
          />
        ))}
      </View>

      {helperText && (
        <Text
          style={[
            otpStyles.helperText,
            { color: helperColor, fontSize: 13 },
            customAppearance?.helperText,
          ]}
        >
          {helperText}
        </Text>
      )}
    </View>
  )
}

OTPInput.displayName = 'OTPInput'
