import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, Pressable, Text, View } from 'react-native'
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

type AnimatedMonthCellProps = {
  name: string
  index: number
  isCurrentMonth: boolean
  themeColor: ThemeColor
  onSelectMonth: (month: number) => void
}

const AnimatedMonthCell: React.FC<AnimatedMonthCellProps> = ({
  name,
  index,
  isCurrentMonth,
  themeColor,
  onSelectMonth,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary
  const isDefault = themeColor === 'default'
  const accentColor = isDefault ? theme.colors.foreground : colorScheme.main
  const accentFg = isDefault ? theme.colors.background : colorScheme.foreground
  const scaleAnim = useRef(new Animated.Value(isCurrentMonth ? 1 : 0)).current

  useEffect(() => {
    if (isCurrentMonth) {
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
  }, [isCurrentMonth, scaleAnim])

  return (
    <Pressable
      style={[styles.monthCell]}
      onPress={() => onSelectMonth(index)}
      accessibilityLabel={name}
      accessibilityRole="button"
      accessibilityState={{ selected: isCurrentMonth }}
    >
      {isCurrentMonth ? (
        <Animated.View
          style={[
            styles.monthCellInner,
            { backgroundColor: accentColor },
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text
            style={[
              styles.monthText,
              { color: accentFg, fontWeight: '600' },
            ]}
          >
            {name}
          </Text>
        </Animated.View>
      ) : (
        <Text
          style={[styles.monthText, { color: theme.colors.foreground }]}
        >
          {name}
        </Text>
      )}
    </Pressable>
  )
}

export const DatePickerDialogMonthPicker: React.FC<
  DatePickerDialogMonthPickerProps
> = ({ viewDate, locale, themeColor, onSelectMonth }) => {
  const months = useMemo(() => getMonthNames(locale), [locale])
  const currentMonth = viewDate.getMonth()

  const renderMonth = useCallback(
    (name: string, index: number) => (
      <AnimatedMonthCell
        key={index}
        name={name}
        index={index}
        isCurrentMonth={index === currentMonth}
        themeColor={themeColor}
        onSelectMonth={onSelectMonth}
      />
    ),
    [currentMonth, themeColor, onSelectMonth]
  )

  return (
    <View style={styles.monthPickerContainer}>
      <View style={styles.monthGrid}>
        {months.map((name, index) => renderMonth(name, index))}
      </View>
    </View>
  )
}
