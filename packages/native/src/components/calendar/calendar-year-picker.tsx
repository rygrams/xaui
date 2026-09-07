import { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'
import type { LayoutChangeEvent, ScrollView as ScrollViewType } from 'react-native'
import type { ViewStyle, TextStyle } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { useMergedRef } from '../../hooks/use-merged-ref'
import { PressableFeedback } from '../../system/pressable-feedback'
import { useStyleProps } from '../../system/style-props'
import { useXAUITheme } from '../../theme/theme-hooks'
import { useCalendar } from './calendar.context'
import type { CalendarYearPickerProps } from './calendar.type'

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)

/**
 * Years read in threes. Four would need cells measured against the parent's width —
 * breaking the grid on a narrow phone rather than on a broad one — while three of a
 * thirty-one per cent cell fill the row wherever it is laid.
 */
const COLUMNS = 3

/** One drop on the way in, sized like the overlays: fast, and gone before it lands late. */
const OPEN_MS = 200

/**
 * The years the calendar can be aimed at, laid in a scrolling grid of pills.
 *
 * The caller renders it **instead of** the weekdays and the grid while `view` is `'year'` —
 * a header whose `Calendar.Title` sits inside a `PressableFeedback` of its own is the
 * switch. `useCalendar()` hands over the whole arithmetic: the year on screen, the ends of
 * the list, and a `goToYear` that keeps the month of the year it was showing.
 *
 * Pressing a year steps `view` on to `'month'` — legacy's walk, where a year is chosen for
 * the months in it, not on its own. The year being shown wears the chosen day's disc, and
 * a year the bounds refuse is dead rather than merely disappointing: pressing it would land
 * on a month with no day in it, and a live control that stops, silently, is the worst of
 * the three options.
 */
export const CalendarYearPicker = forwardRef<
  ScrollViewType,
  CalendarYearPickerProps
>(function CalendarYearPicker(
  { firstYear, lastYear, style, onLayout, contentContainerStyle, ...props },
  ref
) {
  const {
    yearPickerStyle,
    yearStyle,
    yearSelectedStyle,
    yearLabelStyle,
    yearLabelSelectedStyle,
    month,
    yearRange: defaultRange,
    goToYear,
    canGoToMonth,
    setView,
  } = useCalendar()
  const [styleProps, rest] = useStyleProps(props)
  const theme = useXAUITheme()

  const first = firstYear ?? defaultRange.first
  const last = lastYear ?? defaultRange.last
  const shownYear = month.getFullYear()

  const years = useMemo(
    () => Array.from({ length: last - first + 1 }, (_, index) => first + index),
    [first, last]
  )
  const initialRow = Math.floor((shownYear - first) / COLUMNS)

  // The row is `cell + gap` tall, and the gap is a point count only the theme knows.
  // The cell's height sits on the resolved style, where the size axis put it.
  const gap = theme.spacing(2)
  const cell = StyleSheet.flatten<ViewStyle>([yearStyle])?.height ?? 0
  const rowHeight = (typeof cell === 'number' ? cell : 0) + gap

  const scroller = useRef<ScrollViewType | null>(null)
  const refs = useMergedRef(scroller, ref)

  /** RN scrolls only what has laid out once; one call, and never after that. */
  const [isPlaced, setIsPlaced] = useState(false)
  const scrollToRow = (animated: boolean) => {
    if (initialRow === 0 || isPlaced) return
    scroller.current?.scrollTo({ y: initialRow * rowHeight, animated })
  }

  const place = (event: LayoutChangeEvent) => {
    onLayout?.(event)
    if (isPlaced) return
    scrollToRow(false)
    setIsPlaced(true)
  }

  // Composed above rather than culled here: `onLayout` runs before every measurement
  // is certain, and an effect is the place a caller's first draw has all of it.
  useEffect(() => {
    scrollToRow(false)
  })

  return (
    <AnimatedScrollView
      ref={refs}
      {...rest}
      style={[yearPickerStyle, styleProps, style]}
      // The row direction, the wrap, the centring and the gap all live here, because a
      // `ScrollView` refuses to carry child layout on its own style — RN throws by
      // invariant. Three 31%-wide cells to a row, wrapping down the scroll.
      contentContainerStyle={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap,
        },
        contentContainerStyle,
      ]}
      onLayout={place}
      entering={FadeInDown.duration(OPEN_MS)}
      showsVerticalScrollIndicator={false}
    >
      {years.map(year => {
        const disabled = !canGoToMonth((year - shownYear) * 12)
        const isSelected = year === shownYear

        return (
          <PressableFeedback
            key={year}
            isDisabled={disabled}
            accessibilityRole="button"
            accessibilityLabel={`${year}`}
            accessibilityState={{ selected: isSelected, disabled }}
            style={[yearStyle, isSelected && (yearSelectedStyle as ViewStyle)]}
            // Legacy's walk: a year chosen here is not the end of it, the months of that
            // year are — so the panel steps on to the month grid rather than the days.
            onPress={() => {
              goToYear(year)
              setView('month')
            }}
          >
            <Text
              style={[
                yearLabelStyle,
                isSelected && (yearLabelSelectedStyle as TextStyle),
              ]}
            >
              {year}
            </Text>
          </PressableFeedback>
        )
      })}
    </AnimatedScrollView>
  )
})

CalendarYearPicker.displayName = 'XAUI.Calendar.YearPicker'
