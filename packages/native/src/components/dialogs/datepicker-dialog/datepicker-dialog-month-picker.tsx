import React, { useCallback, useMemo } from 'react'
import { Pressable, Text, View } from 'react-native'
import { useXUITheme } from '../../../core'
import type { ThemeColor } from '../../../types'
import { getMonthNames } from '../../datepicker/datepicker.utils'
import { styles } from './datepicker-dialog.style'

type DatePickerDialogMonthPickerProps = {
  viewDate: Date
  locale: string
  themeColor: ThemeColor
  onSelectMonth: (month: number) => void
}

export const DatePickerDialogMonthPicker: React.FC<
  DatePickerDialogMonthPickerProps
> = ({ viewDate, locale, themeColor, onSelectMonth }) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary

  const months = useMemo(() => getMonthNames(locale), [locale])
  const currentMonth = viewDate.getMonth()

  const renderMonth = useCallback(
    (name: string, index: number) => {
      const isCurrentMonth = index === currentMonth

      return (
        <Pressable
          key={index}
          style={[
            styles.monthCell,
            isCurrentMonth && { backgroundColor: colorScheme.main },
          ]}
          onPress={() => onSelectMonth(index)}
          accessibilityLabel={name}
          accessibilityRole="button"
          accessibilityState={{ selected: isCurrentMonth }}
        >
          <Text
            style={[
              styles.monthText,
              { color: theme.colors.foreground },
              isCurrentMonth && {
                color: colorScheme.foreground,
                fontWeight: '600',
              },
            ]}
          >
            {name}
          </Text>
        </Pressable>
      )
    },
    [currentMonth, colorScheme, theme, onSelectMonth]
  )

  return (
    <View style={styles.monthPickerContainer}>
      <View style={styles.monthGrid}>
        {months.map((name, index) => renderMonth(name, index))}
      </View>
    </View>
  )
}
