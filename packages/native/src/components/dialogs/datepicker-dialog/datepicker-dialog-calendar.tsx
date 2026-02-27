import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
import {
  PanGestureHandler,
  State,
  type PanGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler'
import { useXUITheme } from '../../../core'
import type { ThemeColor } from '../../../types'
import {
  getCalendarDays,
  getWeekdayNames,
  isSameDay,
} from '../../datepicker/datepicker.utils'
import { styles } from './datepicker-dialog.style'

type DatePickerDialogCalendarProps = {
  viewDate: Date
  selectedDate: Date | null
  locale: string
  firstDayOfWeek: 0 | 1
  themeColor: ThemeColor
  minDate?: Date
  maxDate?: Date
  onSelectDay: (date: Date) => void
  onPreviousMonth: () => void
  onNextMonth: () => void
}

type AnimatedDayCellProps = {
  isSelected: boolean
  isToday: boolean
  isCurrentMonth: boolean
  isDisabled: boolean
  day: number
  date: Date
  locale: string
  themeColor: ThemeColor
  onSelectDay: (date: Date) => void
}

const AnimatedDayCell: React.FC<AnimatedDayCellProps> = ({
  isSelected,
  isToday,
  isCurrentMonth,
  isDisabled,
  day,
  date,
  locale,
  themeColor,
  onSelectDay,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary
  const isDefault = themeColor === 'default'
  const accentColor = isDefault ? theme.colors.foreground : colorScheme.main
  const accentFg = isDefault ? theme.colors.background : colorScheme.onMain
  const scaleAnim = useRef(new Animated.Value(isSelected ? 1 : 0)).current

  useEffect(() => {
    if (isSelected) {
      scaleAnim.setValue(0.92)
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        damping: 20,
        stiffness: 300,
        mass: 0.6,
      }).start()
    } else {
      scaleAnim.setValue(0)
    }
  }, [isSelected, scaleAnim])

  const animatedStyle = isSelected
    ? { transform: [{ scale: scaleAnim }] }
    : undefined

  return (
    <Pressable
      style={[
        styles.dayCell,
        isToday &&
          !isSelected && {
            ...styles.todayCell,
            borderColor: accentColor,
          },
      ]}
      onPress={() => {
        if (!isDisabled) {
          onSelectDay(date)
        }
      }}
      disabled={isDisabled}
      accessibilityLabel={date.toLocaleDateString(locale)}
      accessibilityRole="button"
      accessibilityState={{
        selected: isSelected,
        disabled: isDisabled,
      }}
    >
      {isSelected ? (
        <Animated.View
          style={[
            styles.selectedCellInner,
            { backgroundColor: accentColor },
            animatedStyle,
          ]}
        >
          <Text style={[styles.dayText, { color: accentFg }]}>{day}</Text>
        </Animated.View>
      ) : (
        <Text
          style={[
            styles.dayText,
            { color: theme.colors.foreground },
            !isCurrentMonth && styles.otherMonthText,
            isDisabled && styles.disabledText,
            isToday && {
              color: accentColor,
              fontWeight: '600',
            },
          ]}
        >
          {day}
        </Text>
      )}
    </Pressable>
  )
}

export const DatePickerDialogCalendar: React.FC<DatePickerDialogCalendarProps> = ({
  viewDate,
  selectedDate,
  locale,
  firstDayOfWeek,
  themeColor,
  minDate,
  maxDate,
  onSelectDay,
  onPreviousMonth,
  onNextMonth,
}) => {
  const theme = useXUITheme()
  const swipeHandledRef = useRef(false)

  const weekdays = useMemo(
    () => getWeekdayNames(locale, firstDayOfWeek),
    [locale, firstDayOfWeek]
  )

  const days = useMemo(
    () =>
      getCalendarDays(
        viewDate.getFullYear(),
        viewDate.getMonth(),
        firstDayOfWeek,
        minDate,
        maxDate
      ),
    [viewDate, firstDayOfWeek, minDate, maxDate]
  )

  const weeks = useMemo(() => {
    const result = []
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7))
    }
    return result
  }, [days])

  const onSwipeEnd = (event: PanGestureHandlerStateChangeEvent) => {
    const { state, translationX, velocityX } = event.nativeEvent
    if (state !== State.END || swipeHandledRef.current) return

    const shouldSwipe = Math.abs(translationX) > 40 || Math.abs(velocityX) > 600

    if (!shouldSwipe) return

    swipeHandledRef.current = true
    if (translationX < 0) {
      onNextMonth()
    } else {
      onPreviousMonth()
    }
  }

  const onSwipeStateChange = (event: PanGestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.BEGAN) {
      swipeHandledRef.current = false
    }
    onSwipeEnd(event)
  }

  return (
    <PanGestureHandler
      activeOffsetX={[-12, 12]}
      failOffsetY={[-12, 12]}
      onHandlerStateChange={onSwipeStateChange}
    >
      <View style={styles.calendarGrid}>
        <View style={styles.weekdayRow}>
          {weekdays.map((day, index) => (
            <View key={index} style={styles.weekdayCell}>
              <Text
                style={[
                  styles.weekdayText,
                  { color: theme.colors.foreground, opacity: 0.6 },
                ]}
              >
                {day}
              </Text>
            </View>
          ))}
        </View>

        {weeks.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.dayRow}>
            {week.map((dayInfo, dayIndex) => (
              <AnimatedDayCell
                key={dayIndex}
                isSelected={
                  !!(selectedDate && isSameDay(dayInfo.date, selectedDate))
                }
                isToday={dayInfo.isToday}
                isCurrentMonth={dayInfo.isCurrentMonth}
                isDisabled={dayInfo.isDisabled}
                day={dayInfo.day}
                date={dayInfo.date}
                locale={locale}
                themeColor={themeColor}
                onSelectDay={onSelectDay}
              />
            ))}
          </View>
        ))}
      </View>
    </PanGestureHandler>
  )
}
