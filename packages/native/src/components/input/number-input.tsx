import React, { forwardRef } from 'react'
import { Pressable, TextInput as RNTextInput, View } from 'react-native'
import { AddIcon, RemoveIcon } from '@xaui/icons'
import { withOpacity } from '@xaui/core'
import { useXUITheme } from '../../core'
import { TextInput } from './input'
import type { NumberInputProps } from './number-input.type'
import { useNumberInputState } from './number-input.hook'
import { numberInputStyles } from './number-input.style'

export const NumberInput = forwardRef<
  React.ElementRef<typeof RNTextInput>,
  NumberInputProps
>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      minValue,
      maxValue,
      step = 1,
      hideStepper = false,
      formatOptions,
      locale = 'en-US',
      label,
      labelPlacement = 'outside',
      description,
      errorMessage,
      placeholder,
      themeColor = 'primary',
      variant = 'flat',
      size = 'md',
      radius = 'md',
      isDisabled = false,
      isReadOnly = false,
      isInvalid = false,
      isClearable = false,
      fullWidth = true,
      customAppearance,
    },
    ref
  ) => {
    const theme = useXUITheme()

    const {
      displayValue,
      handleTextChange,
      handleFocus,
      handleBlur,
      handleIncrement,
      handleDecrement,
      canIncrement,
      canDecrement,
    } = useNumberInputState({
      value,
      defaultValue,
      onValueChange,
      minValue,
      maxValue,
      step,
      formatOptions,
      locale,
    })

    const iconColor = withOpacity(theme.colors.foreground, 0.7)

    const stepperContent =
      hideStepper || isReadOnly ? undefined : (
        <View
          style={[
            numberInputStyles.stepperContainer,
            customAppearance?.stepperContainer,
          ]}
        >
          <Pressable
            onPress={handleDecrement}
            disabled={isDisabled || !canDecrement}
            accessibilityLabel="Decrease value"
            accessibilityRole="button"
            style={[
              numberInputStyles.stepperButton,
              (!canDecrement || isDisabled) && numberInputStyles.stepperDisabled,
              customAppearance?.stepperButton,
            ]}
          >
            <RemoveIcon size={16} color={iconColor} />
          </Pressable>
          <Pressable
            onPress={handleIncrement}
            disabled={isDisabled || !canIncrement}
            accessibilityLabel="Increase value"
            accessibilityRole="button"
            style={[
              numberInputStyles.stepperButton,
              (!canIncrement || isDisabled) && numberInputStyles.stepperDisabled,
              customAppearance?.stepperButton,
            ]}
          >
            <AddIcon size={16} color={iconColor} />
          </Pressable>
        </View>
      )

    return (
      <TextInput
        ref={ref}
        value={displayValue}
        onChangeText={handleTextChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        label={label}
        labelPlacement={labelPlacement}
        description={description}
        errorMessage={errorMessage}
        placeholder={placeholder}
        themeColor={themeColor}
        variant={variant}
        size={size}
        radius={radius}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        isInvalid={isInvalid}
        isClearable={isClearable}
        fullWidth={fullWidth}
        keyboardType="numeric"
        endContent={stepperContent}
        customAppearance={customAppearance}
      />
    )
  }
)

NumberInput.displayName = 'NumberInput'
