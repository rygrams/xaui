import React, { useCallback, useEffect, useRef } from 'react'
import {
  Animated,
  BackHandler,
  Pressable,
  Text,
  View,
  useWindowDimensions,
} from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Portal, useXUITheme } from '../../../core'
import { useDatePickerViewState } from '../../datepicker/datepicker.state.hook'
import { getDatePickerLabels } from '../../datepicker/datepicker.utils'
import {
  useDatePickerDialogAnimation,
  useMonthSlideAnimation,
  useViewTransitionAnimation,
} from './datepicker-dialog.animation'
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
  todayLabel,
  confirmLabel,
  onDateSelect,
  onClearValue,
  onClose,
}) => {
  const theme = useXUITheme()
  const { width: screenWidth, height: screenHeight } = useWindowDimensions()
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(0)).current
  const scaleAnim = useRef(new Animated.Value(0)).current
  const viewFadeAnim = useRef(new Animated.Value(1)).current
  const monthSlideXAnim = useRef(new Animated.Value(0)).current
  const monthFadeAnim = useRef(new Animated.Value(1)).current
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary
  const isDefault = themeColor === 'default'
  const accentColor = isDefault ? theme.colors.foreground : colorScheme.main
  const labels = getDatePickerLabels(locale)
  const resolvedTodayLabel = todayLabel ?? labels.today
  const resolvedConfirmLabel = confirmLabel ?? labels.confirm

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

  const onCloseComplete = useCallback(() => {
    fadeAnim.setValue(0)
    slideAnim.setValue(0)
    scaleAnim.setValue(0)
    viewFadeAnim.setValue(1)
    monthSlideXAnim.setValue(0)
    monthFadeAnim.setValue(1)
  }, [fadeAnim, slideAnim, scaleAnim, viewFadeAnim, monthSlideXAnim, monthFadeAnim])

  const { shouldRender } = useDatePickerDialogAnimation({
    visible,
    fadeAnim,
    slideAnim,
    scaleAnim,
    onCloseComplete,
  })

  const { animate: animateViewTransition } = useViewTransitionAnimation({
    fadeAnim: viewFadeAnim,
  })

  const { animate: animateMonthSlide } = useMonthSlideAnimation({
    slideAnim: monthSlideXAnim,
    fadeAnim: monthFadeAnim,
  })

  const prevViewModeRef = useRef(viewMode)

  useEffect(() => {
    if (prevViewModeRef.current !== viewMode) {
      prevViewModeRef.current = viewMode
      animateViewTransition()
    }
  }, [viewMode, animateViewTransition])

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

  const handlePreviousMonth = useCallback(() => {
    goToPreviousMonth()
    animateMonthSlide('left')
  }, [goToPreviousMonth, animateMonthSlide])

  const handleNextMonth = useCallback(() => {
    goToNextMonth()
    animateMonthSlide('right')
  }, [goToNextMonth, animateMonthSlide])

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

  if (!shouldRender) return null

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
          outputRange: [0.92, 1],
        }),
      },
      {
        translateY: slideAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [40, 0],
        }),
      },
    ],
  }

  const viewTransitionStyle = {
    opacity: viewFadeAnim,
    transform: [
      {
        translateY: viewFadeAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 0],
        }),
      },
    ],
  }

  const monthSlideStyle = {
    opacity: monthFadeAnim,
    transform: [{ translateX: monthSlideXAnim }],
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
          <Animated.View style={[viewTransitionStyle, monthSlideStyle]}>
            <DatePickerDialogCalendar
              viewDate={viewDate}
              selectedDate={selectedDate}
              locale={locale}
              firstDayOfWeek={firstDayOfWeek}
              themeColor={themeColor}
              minDate={minDate}
              maxDate={maxDate}
              onSelectDay={handleDaySelect}
              onPreviousMonth={handlePreviousMonth}
              onNextMonth={handleNextMonth}
            />
          </Animated.View>
        )
    }
  }

  return (
    <Portal>
      <GestureHandlerRootView style={[overlayStyle, style]}>
        <View style={overlayStyle}>
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
                selectDateLabel={labels.selectDate}
                onClearValue={onClearValue}
                onPreviousMonth={handlePreviousMonth}
                onNextMonth={handleNextMonth}
                onToggleYearPicker={toggleYearPicker}
              />

              {renderContent()}

              <View style={styles.footer}>
                <Pressable
                style={styles.footerButton}
                onPress={handleTodayPress}
                accessibilityLabel={resolvedTodayLabel}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: accentColor },
                  ]}
                >
                  {resolvedTodayLabel}
                </Text>
              </Pressable>
              <Pressable
                style={styles.footerButton}
                onPress={onClose}
                accessibilityLabel={resolvedConfirmLabel}
                accessibilityRole="button"
              >
                <Text
                  style={[
                    styles.footerButtonText,
                    { color: accentColor },
                  ]}
                >
                  {resolvedConfirmLabel}
                </Text>
              </Pressable>
              </View>
            </View>
          </Animated.View>
        </View>
      </GestureHandlerRootView>
    </Portal>
  )
}
