import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, Easing, FlatList, Pressable, Text, View } from 'react-native'
import { useXUITheme } from '../../../core'
import type { ThemeColor } from '../../../types'
import { getYearRange } from '../../datepicker/datepicker.utils'
import { styles } from './datepicker-dialog.style'

type DatePickerDialogYearPickerProps = {
  viewDate: Date
  themeColor: ThemeColor
  minDate?: Date
  maxDate?: Date
  onSelectYear: (year: number) => void
}

const ITEM_HEIGHT = 48
const NUM_COLUMNS = 4

export const DatePickerDialogYearPicker: React.FC<
  DatePickerDialogYearPickerProps
> = ({ viewDate, themeColor, minDate, maxDate, onSelectYear }) => {
  const listRef = useRef<FlatList>(null)
  const groupAnim = useRef(new Animated.Value(0)).current
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary
  const isDefault = themeColor === 'default'
  const accentColor = isDefault ? theme.colors.foreground : colorScheme.main
  const accentFg = isDefault ? theme.colors.background : colorScheme.foreground

  const years = useMemo(() => getYearRange(minDate, maxDate), [minDate, maxDate])

  const currentYear = viewDate.getFullYear()

  const initialIndex = useMemo(() => {
    const index = years.indexOf(currentYear)
    const rowIndex = Math.floor(index / NUM_COLUMNS)
    return Math.max(0, rowIndex)
  }, [years, currentYear])

  useEffect(() => {
    groupAnim.setValue(0)
    Animated.timing(groupAnim, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }, [groupAnim])

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  )

  const renderYear = useCallback(
    ({ item }: { item: number }) => {
      const isCurrentYear = item === currentYear
      return (
        <Pressable
          style={[
            styles.yearCell,
            isCurrentYear && { backgroundColor: accentColor },
          ]}
          onPress={() => onSelectYear(item)}
          accessibilityLabel={`${item}`}
          accessibilityRole="button"
          accessibilityState={{ selected: isCurrentYear }}
        >
          <Text
            style={[
              styles.yearText,
              { color: theme.colors.foreground },
              isCurrentYear && {
                color: accentFg,
                fontWeight: '600',
              },
            ]}
          >
            {item}
          </Text>
        </Pressable>
      )
    },
    [currentYear, onSelectYear, accentColor, accentFg, theme.colors.foreground]
  )

  return (
    <View style={styles.yearPickerContainer}>
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
        <FlatList
          ref={listRef}
          data={years}
          renderItem={renderYear}
          keyExtractor={item => String(item)}
          numColumns={NUM_COLUMNS}
          getItemLayout={getItemLayout}
          initialScrollIndex={initialIndex}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{ justifyContent: 'center' }}
        />
      </Animated.View>
    </View>
  )
}
