import { useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useXUIColors, useXUITheme } from '@xaui/native/core'
import { Button } from '@xaui/native/button'
import {
  TimePicker,
  TimePickerDialog,
  TimePickerTrigger,
  type TimeValue,
} from '@xaui/native/timepicker'

export default function TimePickerScreen() {
  const colors = useXUIColors()
  const theme = useXUITheme()

  const [time12Hour, setTime12Hour] = useState<TimeValue>({ hours: 7, minutes: 0 })
  const [time24Hour, setTime24Hour] = useState<TimeValue>({ hours: 14, minutes: 30 })

  const [dialogTime, setDialogTime] = useState<TimeValue>({ hours: 9, minutes: 15 })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [triggerTime, setTriggerTime] = useState<TimeValue | undefined>({
    hours: 10,
    minutes: 25,
  })
  const [isTriggerOpen, setIsTriggerOpen] = useState(false)
  const [triggerTheme, setTriggerTheme] = useState<
    'primary' | 'success' | 'warning'
  >('primary')
  const [triggerIs24Hour, setTriggerIs24Hour] = useState(false)

  const formatTime = (time: TimeValue, is24Hour: boolean) => {
    if (is24Hour) {
      return `${time.hours.toString().padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}`
    }

    const hours =
      time.hours === 0 ? 12 : time.hours > 12 ? time.hours - 12 : time.hours
    const period = time.hours >= 12 ? 'PM' : 'AM'
    return `${hours.toString().padStart(2, '0')}:${time.minutes
      .toString()
      .padStart(2, '0')} ${period}`
  }

  const openTriggerDialog = (
    themeColor: 'primary' | 'success' | 'warning',
    is24Hour: boolean
  ) => {
    setTriggerTheme(themeColor)
    setTriggerIs24Hour(is24Hour)
    setIsTriggerOpen(true)
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { gap: theme.spacing.xl }]}
    >
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Trigger (DatePicker style)
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Use a trigger to open the time picker dialog
        </Text>

        <View style={styles.triggerStack}>
          <TimePickerTrigger
            value={triggerTime}
            themeColor="primary"
            placeholder="Select time"
            onPress={() => openTriggerDialog('primary', false)}
            onClear={() => setTriggerTime(undefined)}
          />

          <TimePickerTrigger
            value={triggerTime}
            themeColor="success"
            is24Hour
            placeholder="Select 24h time"
            onPress={() => openTriggerDialog('success', true)}
            onClear={() => setTriggerTime(undefined)}
          />

          <TimePickerTrigger
            value={triggerTime}
            themeColor="warning"
            isDisabled
            placeholder="Disabled trigger"
            onPress={() => openTriggerDialog('warning', false)}
          />

          <TimePickerTrigger
            value={triggerTime}
            themeColor="warning"
            isReadOnly
            placeholder="Read only trigger"
            onPress={() => openTriggerDialog('warning', false)}
          />
        </View>

        <TimePickerDialog
          isOpen={isTriggerOpen}
          onClose={() => setIsTriggerOpen(false)}
          value={triggerTime}
          onChange={time => setTriggerTime(time)}
          is24Hour={triggerIs24Hour}
          themeColor={triggerTheme}
          title="Select time"
          confirmText="OK"
          cancelText="Cancel"
          onConfirm={time => {
            setTriggerTime(time)
            setIsTriggerOpen(false)
          }}
          onCancel={() => setIsTriggerOpen(false)}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          12-Hour Format
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Time picker with AM/PM selector
        </Text>
        <Text style={[styles.selectedTime, { color: colors.foreground }]}>
          Selected: {formatTime(time12Hour, false)}
        </Text>

        <View style={styles.pickerContainer}>
          <TimePicker
            value={time12Hour}
            onChange={setTime12Hour}
            is24Hour={false}
            themeColor="primary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          24-Hour Format
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Time picker without AM/PM selector
        </Text>
        <Text style={[styles.selectedTime, { color: colors.foreground }]}>
          Selected: {formatTime(time24Hour, true)}
        </Text>

        <View style={styles.pickerContainer}>
          <TimePicker
            value={time24Hour}
            onChange={setTime24Hour}
            is24Hour
            themeColor="secondary"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
          Dialog Action
        </Text>
        <Text
          style={[styles.description, { color: colors.foreground, opacity: 0.7 }]}
        >
          Open dialog from button
        </Text>
        <Text style={[styles.selectedTime, { color: colors.foreground }]}>
          Selected: {formatTime(dialogTime, false)}
        </Text>

        <Button
          variant="filled"
          themeColor="tertiary"
          onPress={() => setIsDialogOpen(true)}
        >
          Open Time Picker Dialog
        </Button>

        <TimePickerDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          value={dialogTime}
          onChange={setDialogTime}
          is24Hour={false}
          themeColor="tertiary"
          title="Select time"
          confirmText="OK"
          cancelText="Cancel"
          onConfirm={time => {
            setDialogTime(time)
            setIsDialogOpen(false)
          }}
          onCancel={() => setIsDialogOpen(false)}
        />
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    width: '100%',
    gap: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  selectedTime: {
    fontSize: 16,
    fontWeight: '600',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 16,
    overflow: 'hidden',
  },
  triggerStack: {
    gap: 12,
  },
})
