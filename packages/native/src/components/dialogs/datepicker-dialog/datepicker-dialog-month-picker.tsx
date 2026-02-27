import React, { useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, Pressable, Text, View } from 'react-native'
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
  const isDefault = themeColor === 'default'
  const accentColor = isDefault ? theme.colors.foreground : colorScheme.main
  const accentFg = isDefault ? theme.colors.background : colorScheme.onMain

  const months = useMemo(() => getMonthNames(locale), [locale])
  const currentMonth = viewDate.getMonth()

  const groupAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {
    groupAnim.setValue(0)
    Animated.timing(groupAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [groupAnim])

  return (
    <View style={styles.monthPickerContainer}>
      <Animated.View
        style={{
          opacity: groupAnim,
          transform: [
            {
              translateY: groupAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [12, 0],
              }),
            },
          ],
        }}
      >
        <View style={styles.monthGrid}>
          {months.map((name, index) => {
            const isCurrentMonth = index === currentMonth

            return (
              <Pressable
                key={index}
                style={[
                  styles.monthCell,
                  isCurrentMonth && { backgroundColor: accentColor },
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
                      color: accentFg,
                      fontWeight: '600',
                    },
                  ]}
                >
                  {name}
                </Text>
              </Pressable>
            )
          })}
        </View>
      </Animated.View>
    </View>
  )
}
