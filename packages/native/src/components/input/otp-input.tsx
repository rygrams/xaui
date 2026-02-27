import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  Pressable,
  Text,
  TextInput as RNTextInput,
  View,
} from 'react-native'
import { withOpacity } from '@xaui/core'
import type { OTPInputProps } from './otp-input.type'
import { useOTPInputState, useOTPSegmentSizeStyles } from './otp-input.hook'
import { useTextInputRadiusStyles, useTextInputVariantStyles } from './input.hook'
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
  onPress,
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
  onPress: () => void
}) => {
  const borderAnimation = useRef(new Animated.Value(0)).current
  const isUnderlined = variantStyles.container.borderBottomWidth !== undefined

  useEffect(() => {
    Animated.timing(borderAnimation, {
      toValue: isActive ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }, [borderAnimation, isActive])

  const unfocusedLineColor = isUnderlined
    ? withOpacity(variantStyles.focusedBorderColor, 0.35)
    : variantStyles.unfocusedBorderColor

  const animatedBorderColor = borderAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [unfocusedLineColor, variantStyles.focusedBorderColor],
  })

  return (
    <Pressable
      onPress={() => {
        if (!isDisabled) {
          onPress()
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
            borderRadius: isUnderlined ? 0 : radiusStyles.borderRadius,
            borderWidth: isUnderlined ? 0 : (variantStyles.container.borderWidth ?? 0),
            borderColor: isUnderlined ? undefined : animatedBorderColor,
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
        {isUnderlined && (
          <Animated.View
            style={[
              otpStyles.underline,
              {
                height: variantStyles.container.borderBottomWidth ?? 1,
                backgroundColor: animatedBorderColor,
              },
            ]}
          />
        )}
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
  variant = 'colored',
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

  const focusSegment = useCallback(
    (index: number) => {
      if (isDisabled) return
      refs.current[index]?.focus()
    },
    [isDisabled, refs]
  )

  const handleContainerPress = useCallback(() => {
    const firstEmptyIndex = segments.findIndex(segment => !segment)
    const targetIndex = firstEmptyIndex === -1 ? length - 1 : firstEmptyIndex
    focusSegment(targetIndex)
  }, [focusSegment, length, segments])

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

      <Pressable
        onPress={handleContainerPress}
        disabled={isDisabled}
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
            onPress={() => focusSegment(index)}
          />
        ))}
      </Pressable>

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
