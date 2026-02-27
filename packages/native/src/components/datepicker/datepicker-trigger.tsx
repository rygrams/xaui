import React from 'react'
import type { LayoutChangeEvent, TextStyle, ViewStyle } from 'react-native'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { CalendarIcon } from '@xaui/icons/calendar'
import { CloseIcon } from '@xaui/icons/close'
import type { DatePickerVariant } from './datepicker.type'

import { styles } from './datepicker.style'

type DatePickerTriggerProps = {
  triggerRef: React.RefObject<View | null>
  isDisabled: boolean
  hasValue: boolean
  displayValue: string
  sizeStyles: {
    minHeight: number
    paddingHorizontal: number
    paddingVertical: number
    fontSize: number
  }
  variant: DatePickerVariant
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
  calendarIcon?: React.ReactNode
  style?: ViewStyle
  textStyle?: TextStyle
  onPress: () => void
  onClear: () => void
  onLayout: (event: LayoutChangeEvent) => void
}

export const DatePickerTrigger: React.FC<DatePickerTriggerProps> = ({
  triggerRef,
  isDisabled,
  hasValue,
  displayValue,
  sizeStyles,
  variant,
  radiusStyles,
  variantStyles,
  theme,
  isClearable,
  label,
  labelText,
  isLabelInside,
  calendarIcon,
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
        variant === 'underlined' ? { borderRadius: 0 } : radiusStyles,
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
            !hasValue && { opacity: 0.5 },
            textStyle,
          ]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayValue}
        </Text>
      </View>
      {isClearable && hasValue ? (
        <TouchableOpacity
          onPress={handleClear}
          style={styles.clearButton}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <CloseIcon color={theme.colors.foreground} size={20} />
        </TouchableOpacity>
      ) : (
        (calendarIcon ?? <CalendarIcon color={theme.colors.foreground} size={20} />)
      )}
    </Pressable>
  )
}
