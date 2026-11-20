import { forwardRef, useMemo, useRef } from 'react'
import { ScrollView } from 'react-native'
import type { LayoutChangeEvent } from 'react-native'
import { useMergedRef } from '@xaui/native'
import { CalendarPick } from './calendar-pick'
import { PICK_ROW } from './calendar.recipe'
import { useCalendar } from './calendar.context'
import type { CalendarYearPickerProps } from './calendar.type'

/** Years read in threes, like the months. */
const COLUMNS = 3

/**
 * The years the calendar can be aimed at, three to a row in a scroll, opened on the year
 * on screen. Rendered **instead of** the weekdays and the grid while `view` is `'year'`;
 * pressing a year goes on to its months.
 */
export const CalendarYearPicker = forwardRef<ScrollView, CalendarYearPickerProps>(
  function CalendarYearPicker(
    { firstYear, lastYear, onLayout, contentContainerStyle, ...props },
    ref
  ) {
    const { pickerStyle, month, yearRange, goToYear, canGoToMonth, setView } =
      useCalendar()

    const first = firstYear ?? yearRange.first
    const last = lastYear ?? yearRange.last
    const shown = month.getFullYear()

    const years = useMemo(
      () => Array.from({ length: last - first + 1 }, (_, index) => first + index),
      [first, last]
    )

    const scroller = useRef<ScrollView | null>(null)
    const refs = useMergedRef(scroller, ref)
    const isPlaced = useRef(false)

    // Once, on the first layout: the row of the year on screen, at the top.
    const place = (event: LayoutChangeEvent) => {
      onLayout?.(event)
      if (isPlaced.current) return
      isPlaced.current = true

      const row = Math.floor((shown - first) / COLUMNS)
      scroller.current?.scrollTo({ y: row * PICK_ROW, animated: false })
    }

    return (
      <ScrollView
        ref={refs}
        showsVerticalScrollIndicator={false}
        {...props}
        contentContainerStyle={[pickerStyle, contentContainerStyle]}
        onLayout={place}
      >
        {years.map(year => (
          <CalendarPick
            key={year}
            label={String(year)}
            isSelected={year === shown}
            isDisabled={!canGoToMonth((year - shown) * 12)}
            onPress={() => {
              goToYear(year)
              setView('month')
            }}
          />
        ))}
      </ScrollView>
    )
  }
)

CalendarYearPicker.displayName = 'XAUI.Tram.Calendar.YearPicker'
