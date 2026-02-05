import React, { useCallback, useEffect, useMemo, useRef } from 'react'
import { Animated, FlatList, Pressable, Text, View } from 'react-native'
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

type AnimatedYearCellProps = {
  year: number
  isCurrentYear: boolean
  themeColor: ThemeColor
  onSelectYear: (year: number) => void
}

const AnimatedYearCell: React.FC<AnimatedYearCellProps> = ({
  year,
  isCurrentYear,
  themeColor,
  onSelectYear,
}) => {
  const theme = useXUITheme()
  const colorScheme = theme.colors[themeColor] ?? theme.colors.primary
  const isDefault = themeColor === 'default'
  const accentColor = isDefault ? theme.colors.foreground : colorScheme.main
  const accentFg = isDefault ? theme.colors.background : colorScheme.foreground
  const scaleAnim = useRef(new Animated.Value(isCurrentYear ? 1 : 0)).current

  useEffect(() => {
    if (isCurrentYear) {
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
  }, [isCurrentYear, scaleAnim])

  return (
    <Pressable
      style={[styles.yearCell]}
      onPress={() => onSelectYear(year)}
      accessibilityLabel={`${year}`}
      accessibilityRole="button"
      accessibilityState={{ selected: isCurrentYear }}
    >
      {isCurrentYear ? (
        <Animated.View
          style={[
            styles.yearCellInner,
            { backgroundColor: accentColor },
            { transform: [{ scale: scaleAnim }] },
          ]}
        >
          <Text
            style={[
              styles.yearText,
              { color: accentFg, fontWeight: '600' },
            ]}
          >
            {year}
          </Text>
        </Animated.View>
      ) : (
        <Text style={[styles.yearText, { color: theme.colors.foreground }]}>
          {year}
        </Text>
      )}
    </Pressable>
  )
}

export const DatePickerDialogYearPicker: React.FC<
  DatePickerDialogYearPickerProps
> = ({ viewDate, themeColor, minDate, maxDate, onSelectYear }) => {
  const listRef = useRef<FlatList>(null)

  const years = useMemo(
    () => getYearRange(minDate, maxDate),
    [minDate, maxDate]
  )

  const currentYear = viewDate.getFullYear()

  const initialIndex = useMemo(() => {
    const index = years.indexOf(currentYear)
    const rowIndex = Math.floor(index / NUM_COLUMNS)
    return Math.max(0, rowIndex)
  }, [years, currentYear])

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  )

  const renderYear = useCallback(
    ({ item }: { item: number }) => (
      <AnimatedYearCell
        year={item}
        isCurrentYear={item === currentYear}
        themeColor={themeColor}
        onSelectYear={onSelectYear}
      />
    ),
    [currentYear, themeColor, onSelectYear]
  )

  return (
    <View style={styles.yearPickerContainer}>
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
    </View>
  )
}
