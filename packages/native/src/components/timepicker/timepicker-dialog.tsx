import React, { useState } from 'react'
import { View, Text, Pressable } from 'react-native'
import { BottomSheet } from '../bottom-sheet'
import { TimePicker } from './timepicker'
import { useTimePickerColors } from './timepicker.hook'
import { styles } from './timepicker.style'
import type { TimePickerDialogProps, TimeValue } from './timepicker.type'

export const TimePickerDialog: React.FC<TimePickerDialogProps> = ({
  isOpen,
  onClose,
  value,
  onChange,
  is24Hour = false,
  themeColor = 'primary',
  confirmText = 'OK',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}) => {
  const [tempValue, setTempValue] = useState<TimeValue | undefined>(value)
  const colors = useTimePickerColors(themeColor)

  const handleChange = (time: TimeValue) => {
    setTempValue(time)
    onChange?.(time)
  }

  const handleConfirm = () => {
    if (tempValue) {
      onConfirm?.(tempValue)
    }
    onClose()
  }

  const handleCancel = () => {
    onCancel?.()
    onClose()
  }

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} snapPoints={[0.7]}>
      <View>
        <TimePicker
          value={tempValue}
          onChange={handleChange}
          is24Hour={is24Hour}
          themeColor={themeColor}
        />

        <View style={styles.actions}>
          <Pressable
            onPress={handleCancel}
            style={[styles.actionButton, { backgroundColor: 'transparent' }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>
              {cancelText}
            </Text>
          </Pressable>

          <Pressable
            onPress={handleConfirm}
            style={[styles.actionButton, { backgroundColor: 'transparent' }]}
          >
            <Text style={[styles.actionButtonText, { color: colors.primary }]}>
              {confirmText}
            </Text>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  )
}
