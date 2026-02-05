import React, { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
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
}

export const DatePickerDialogCalendar: React.FC<
  DatePickerDialogCalendarProps
> = ({
  viewDate,
  selectedDate,
  locale,
  firstDayOfWeek,
  themeColor,
  minDate,
  maxDate,
  onSelectDay,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary

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

  return (
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
          {week.map((dayInfo, dayIndex) => {
            const isSelected =
              selectedDate && isSameDay(dayInfo.date, selectedDate)
            const isTodayDate = dayInfo.isToday

            return (
              <Pressable
                key={dayIndex}
                style={[
                  styles.dayCell,
                  isTodayDate &&
                    !isSelected && {
                      ...styles.todayCell,
                      borderColor: colorScheme.main,
                    },
                  isSelected && {
                    ...styles.selectedCell,
                    backgroundColor: colorScheme.main,
                  },
                ]}
                onPress={() => {
                  if (!dayInfo.isDisabled) {
                    onSelectDay(dayInfo.date)
                  }
                }}
                disabled={dayInfo.isDisabled}
                accessibilityLabel={dayInfo.date.toLocaleDateString(locale)}
                accessibilityRole="button"
                accessibilityState={{
                  selected: !!isSelected,
                  disabled: dayInfo.isDisabled,
                }}
              >
                <Text
                  style={[
                    styles.dayText,
                    { color: theme.colors.foreground },
                    !dayInfo.isCurrentMonth && styles.otherMonthText,
                    dayInfo.isDisabled && styles.disabledText,
                    isSelected && { color: colorScheme.foreground },
                    isTodayDate &&
                      !isSelected && {
                        color: colorScheme.main,
                        fontWeight: '600',
                      },
                  ]}
                >
                  {dayInfo.day}
                </Text>
              </Pressable>
            )
          })}
        </View>
      ))}
    </View>
  )
}
