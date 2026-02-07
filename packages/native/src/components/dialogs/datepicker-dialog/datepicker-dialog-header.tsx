import React, { useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useXUITheme } from '../../../core'
import type { ThemeColor } from '../../../types'
import { formatDate, getMonthName } from '../../datepicker/datepicker.utils'
import { ChevronDownIcon } from '@xaui/icons/chevron-down'
import { ChevronLeftIcon } from '@xaui/icons/chevron-left'
import { ChevronRightIcon } from '@xaui/icons/chevron-right'
import { CloseIcon } from '@xaui/icons/close'
import { styles } from './datepicker-dialog.style'

type DatePickerDialogHeaderProps = {
  viewDate: Date
  selectedDate: Date | null
  locale: string
  themeColor: ThemeColor
  selectDateLabel: string
  onClearValue: () => void
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToggleYearPicker: () => void
}

export const DatePickerDialogHeader: React.FC<DatePickerDialogHeaderProps> = ({
  viewDate,
  selectedDate,
  locale,
  themeColor,
  selectDateLabel,
  onClearValue,
  onPreviousMonth,
  onNextMonth,
  onToggleYearPicker,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary

  const dateText = useMemo(() => {
    if (!selectedDate) return '---'
    return formatDate(selectedDate, locale)
  }, [selectedDate, locale])

  const monthYearLabel = useMemo(() => {
    const month = getMonthName(viewDate.getMonth(), locale)
    return `${month} ${viewDate.getFullYear()}`
  }, [viewDate, locale])

  return (
    <>
      <View style={[styles.header, { backgroundColor: colorScheme.main }]}>
        <Text style={[styles.headerLabel, { color: colorScheme.foreground }]}>
          {selectDateLabel}
        </Text>
        <View style={styles.headerDateRow}>
          <Text style={[styles.headerDate, { color: colorScheme.foreground }]}>
            {dateText}
          </Text>
          {selectedDate ? (
            <Pressable
              onPress={onClearValue}
              hitSlop={{ top: 8, right: 8, bottom: 8, left: 8 }}
              accessibilityLabel="Clear date"
              accessibilityRole="button"
            >
              <CloseIcon size={20} color={colorScheme.foreground} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <View style={styles.navigationRow}>
        <Pressable
          style={styles.monthYearButton}
          onPress={onToggleYearPicker}
          accessibilityLabel={`${monthYearLabel}, tap to change`}
          accessibilityRole="button"
        >
          <Text style={[styles.monthYearText, { color: theme.colors.foreground }]}>
            {monthYearLabel}
          </Text>
          <ChevronDownIcon size={18} color={theme.colors.foreground} />
        </Pressable>

        <View style={styles.navButtons}>
          <Pressable
            style={styles.navButton}
            onPress={onPreviousMonth}
            accessibilityLabel="Previous month"
            accessibilityRole="button"
          >
            <ChevronLeftIcon size={20} color={theme.colors.foreground} />
          </Pressable>
          <Pressable
            style={styles.navButton}
            onPress={onNextMonth}
            accessibilityLabel="Next month"
            accessibilityRole="button"
          >
            <ChevronRightIcon size={20} color={theme.colors.foreground} />
          </Pressable>
        </View>
      </View>
    </>
  )
}
