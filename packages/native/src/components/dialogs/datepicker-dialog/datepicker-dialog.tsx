import React, { useCallback, useRef } from 'react'
import {
  Animated,
  BackHandler,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { useEffect } from 'react'
import { Portal, useXUITheme } from '../../../core'
import { useDatePickerViewState } from '../../datepicker/datepicker.state.hook'
import { useDatePickerDialogAnimation } from './datepicker-dialog.animation'
import { DatePickerDialogCalendar } from './datepicker-dialog-calendar'
import { DatePickerDialogHeader } from './datepicker-dialog-header'
import { DatePickerDialogMonthPicker } from './datepicker-dialog-month-picker'
import { DatePickerDialogYearPicker } from './datepicker-dialog-year-picker'
import { styles } from './datepicker-dialog.style'
import type { DatePickerDialogProps } from './datepicker-dialog.type'

export const DatePickerDialog: React.FC<DatePickerDialogProps> = ({
  visible,
  selectedDate,
  locale,
  firstDayOfWeek,
  themeColor = 'primary',
  minDate,
  maxDate,
  style,
  todayLabel = 'Today',
  confirmLabel = 'OK',
  onDateSelect,
  onClose,
}) => {
  const theme = useXUITheme()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary

  const {
    viewDate,
    viewMode,
    goToPreviousMonth,
    goToNextMonth,
    goToYear,
    goToMonth,
    goToToday,
    toggleYearPicker,
    syncViewToDate,
  } = useDatePickerViewState(selectedDate)

  useDatePickerDialogAnimation({ visible, fadeAnim, slideAnim, scaleAnim })

  useEffect(() => {
    if (visible && selectedDate) {
      syncViewToDate(selectedDate)
    }
  }, [visible, selectedDate, syncViewToDate])

  useEffect(() => {
    if (!visible) return

    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose()
      return true
    })

    return () => sub.remove()
  }, [visible, onClose])

  const handleDaySelect = useCallback(
    (date: Date) => {
      onDateSelect(date)
    },
    [onDateSelect]
  )

  const handleTodayPress = useCallback(() => {
    goToToday()
    onDateSelect(new Date())
  }, [goToToday, onDateSelect])

  if (!visible) return null

  const overlayStyle = {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    width: screenWidth,
    height: screenHeight,
  }

  const containerAnimatedStyle = {
    opacity: fadeAnim,
    transform: [
      {
        scale: scaleAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
        }),
      },
    ],
  }

  const renderContent = () => {
    switch (viewMode) {
      case 'year':
        return (
          <DatePickerDialogYearPicker
            viewDate={viewDate}
            themeColor={themeColor}
            minDate={minDate}
            maxDate={maxDate}
            onSelectYear={goToYear}
          />
        )
      case 'month':
        return (
          <DatePickerDialogMonthPicker
            viewDate={viewDate}
            locale={locale}
            themeColor={themeColor}
            onSelectMonth={goToMonth}
          />
        )
      case 'calendar':
      default:
        return (
          <DatePickerDialogCalendar
            viewDate={viewDate}
            selectedDate={selectedDate}
            locale={locale}
            firstDayOfWeek={firstDayOfWeek}
            themeColor={themeColor}
            minDate={minDate}
            maxDate={maxDate}
            onSelectDay={handleDaySelect}
          />
        )
    }
  }

  return (
    <Portal>
      <View style={[overlayStyle, style]}>
        <Animated.View style={[styles.backdrop, { opacity: fadeAnim }]}>
          <Pressable
            style={{ flex: 1 }}
            onPress={onClose}
            accessibilityLabel="Close calendar"
            accessibilityRole="button"
          />
        </Animated.View>
        <Animated.View style={[styles.dialogContainer, containerAnimatedStyle]}>
          <View
            style={[
              styles.container,
              { backgroundColor: theme.colors.background },
            ]}
          >
            <DatePickerDialogHeader
              viewDate={viewDate}
              selectedDate={selectedDate}
              locale={locale}
              themeColor={themeColor}
              viewMode={viewMode}
              onClose={onClose}
              onPreviousMonth={goToPreviousMonth}
              onNextMonth={goToNextMonth}
              onToggleYearPicker={toggleYearPicker}
            />

            {renderContent()}

            <View style={styles.footer}>
              <Pressable
                style={styles.footerButton}
                onPress={handleTodayPress}
                accessibilityLabel={todayLabel}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: colorScheme.main },
                  ]}
                >
                  {todayLabel}
                </Text>
              </Pressable>
              <Pressable
                style={styles.footerButton}
                onPress={onClose}
                accessibilityLabel={confirmLabel}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: colorScheme.main },
                  ]}
                >
                  {confirmLabel}
                </Text>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      </View>
    </Portal>
  )
}
