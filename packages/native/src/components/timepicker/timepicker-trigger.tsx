import React, { useMemo } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import { Pressable, Text, TouchableOpacity, View } from 'react-native'
import { CloseIcon, TimeIcon } from '@xaui/icons'
import { useXUITheme } from '../../core'
import { useTimePickerColors } from './timepicker.hook'
import { styles } from './timepicker.style'
import { formatTimeValue } from './timepicker.utils'
import type { TimePickerTriggerProps } from './timepicker.type'

export const TimePickerTrigger: React.FC<TimePickerTriggerProps> = ({
  value,
  placeholder = 'Select time',
  is24Hour = false,
  themeColor = 'primary',
  isDisabled = false,
  isReadOnly = false,
  isClearable = true,
  icon,
  style,
  textStyle,
  onPress,
  onClear,
}) => {
  const theme = useXUITheme()
  const colors = useTimePickerColors(themeColor)
  const hasValue = Boolean(value)

  const displayValue = useMemo(() => {
    if (!value) return placeholder
    return formatTimeValue(value, is24Hour)
  }, [value, placeholder, is24Hour])

  const triggerStyle: ViewStyle = {
    borderColor: colors.border,
    backgroundColor: colors.background,
  }

  const triggerTextStyle: TextStyle = {
    color: hasValue ? theme.colors.foreground : colors.textSecondary,
  }

  const isBlocked = isDisabled || isReadOnly

  return (
    <Pressable
      onPress={isBlocked ? undefined : onPress}
      disabled={isBlocked}
      style={[styles.trigger, triggerStyle, isBlocked && styles.disabled, style]}
      accessibilityRole="button"
      accessibilityState={{ disabled: isBlocked }}
    >
      <View style={styles.triggerContent}>
        <Text
          style={[styles.triggerText, triggerTextStyle, textStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {displayValue}
        </Text>
      </View>

      {isClearable && hasValue && !isBlocked ? (
        <TouchableOpacity
          onPress={onClear}
          style={styles.clearButton}
          hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
        >
          <CloseIcon color={theme.colors.foreground} size={20} />
        </TouchableOpacity>
      ) : (
        (icon ?? <TimeIcon color={theme.colors.foreground} size={20} />)
      )}
    </Pressable>
  )
}
