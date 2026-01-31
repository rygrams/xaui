import React from 'react'
import type { LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native'
import { Animated, Pressable, TextInput, View } from 'react-native'
import { styles } from './autocomplete.style'
import { ChevronDownIcon } from './chevron-down-icon'
import { ClearIcon } from './clear-icon'

type AutocompleteTriggerProps = {
  triggerRef: React.RefObject<View | null>
  _isOpen: boolean
  isDisabled: boolean
  _isFocused: boolean
  inputValue: string
  placeholder?: string
  variant: string
  sizeStyles: {
    minHeight: number
    paddingHorizontal: number
    paddingVertical: number
    fontSize: number
  }
  radiusStyles: ViewStyle
  variantStyles: ViewStyle
  inputColor: string
  placeholderColor: string
  selectorColor: string
  labelInside: boolean
  labelNode: React.ReactNode
  startContent?: React.ReactNode
  endContent?: React.ReactNode
  selectorIcon?: React.ReactNode
  clearIcon?: React.ReactNode
  showClear: boolean
  selectorRotation: Animated.Value
  style?: ViewStyle
  textStyle?: TextStyle
  onPress: () => void
  onInputChange: (text: string) => void
  onClear: () => void
  onLayout: (event: LayoutChangeEvent) => void
  onFocus: () => void
  onBlur: () => void
}

export const AutocompleteTrigger: React.FC<AutocompleteTriggerProps> = ({
  triggerRef,
  _isOpen,
  isDisabled,
  _isFocused,
  inputValue,
  placeholder,
  sizeStyles,
  radiusStyles,
  variantStyles,
  inputColor,
  placeholderColor,
  selectorColor,
  labelInside,
  labelNode,
  startContent,
  endContent,
  selectorIcon,
  clearIcon,
  showClear,
  selectorRotation,
  style,
  textStyle,
  onPress,
  onInputChange,
  onClear,
  onLayout,
  onFocus,
  onBlur,
}) => {
  const renderSelectorIcon = selectorIcon ?? <ChevronDownIcon color={selectorColor} />

  const renderClearIcon = clearIcon ?? <ClearIcon color={selectorColor} />

  const triggerContentStyle = labelInside
    ? [styles.triggerContent, styles.triggerContentColumn]
    : styles.triggerContent

  return (
    <View
      ref={triggerRef}
      onLayout={onLayout}
      style={[
        styles.trigger,
        {
          minHeight: sizeStyles.minHeight,
          paddingHorizontal: sizeStyles.paddingHorizontal,
          paddingVertical: sizeStyles.paddingVertical,
        },
        radiusStyles,
        variantStyles,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      <View style={triggerContentStyle}>
        {labelInside && labelNode}
        {startContent}
        <View style={styles.inputWrapper}>
          <TextInput
            value={inputValue}
            onChangeText={onInputChange}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor={placeholderColor}
            editable={!isDisabled}
            style={[
              styles.input,
              {
                fontSize: sizeStyles.fontSize,
                color: inputColor,
              },
              textStyle,
            ]}
          />
        </View>
      </View>
      <View style={styles.endSlot}>
        {endContent}
        {showClear ? (
          <Pressable onPress={onClear} style={styles.clearButton}>
            {renderClearIcon}
          </Pressable>
        ) : null}
        <Pressable onPress={onPress}>
          <Animated.View
            style={{
              transform: [
                {
                  rotate: selectorRotation.interpolate({
                    inputRange: [0, 180],
                    outputRange: ['0deg', '180deg'],
                  }),
                },
              ],
            }}
          >
            {renderSelectorIcon}
          </Animated.View>
        </Pressable>
      </View>
    </View>
  )
}
