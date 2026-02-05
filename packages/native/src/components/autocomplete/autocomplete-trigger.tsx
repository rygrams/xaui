import React from 'react'
import type { LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { styles } from './autocomplete.style'
import { CloseIcon } from '../icon'

type AutocompleteTriggerProps = {
  triggerRef: React.RefObject<View | null>
  isDisabled: boolean
  currentSelectedKey?: string | number | null
  currentInputValue?: string
  displayValue: string
  sizeStyles: {
    minHeight: number
    paddingHorizontal: number
    paddingVertical: number
    fontSize: number
  }
  radiusStyles: ViewStyle
  variantStyles: ViewStyle
  theme: {
    colors: {
      foreground: string
    }
  }
  isClearable: boolean
  label?: React.ReactNode
  labelText?: string
  isLabelInside?: boolean
  clearIcon?: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  onPress: () => void
  onClear: () => void
  onLayout: (event: LayoutChangeEvent) => void
}

export const AutocompleteTrigger: React.FC<AutocompleteTriggerProps> = ({
  triggerRef,
  isDisabled,
  currentSelectedKey,
  currentInputValue,
  displayValue,
  sizeStyles,
  radiusStyles,
  variantStyles,
  theme,
  isClearable,
  label,
  labelText,
  isLabelInside,
  clearIcon,
  style,
  textStyle,
  onPress: handleTriggerPress,
  onClear: handleClear,
  onLayout: handleTriggerLayout,
}) => {
  const renderLabel = isLabelInside && label

  return (
    <Pressable
      ref={triggerRef}
      onPress={handleTriggerPress}
      onLayout={handleTriggerLayout}
      disabled={isDisabled}
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
      accessibilityLabel={
        labelText ?? (typeof label === 'string' ? label : undefined)
      }
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
    >
      <View style={styles.triggerContent}>
        {isLabelInside && renderLabel}
        <Text
          style={[
            styles.triggerText,
            { fontSize: sizeStyles.fontSize, color: theme.colors.foreground },
            !currentSelectedKey && !currentInputValue && { opacity: 0.5 },
            textStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayValue}
        </Text>
      </View>
      {isClearable && (currentSelectedKey || currentInputValue) ? (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          {clearIcon ?? <CloseIcon color={theme.colors.foreground} size={20} />}
        </TouchableOpacity>
      ) : null}
    </Pressable>
  )
}
