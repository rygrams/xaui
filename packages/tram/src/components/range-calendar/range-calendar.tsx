import { forwardRef, useCallback, useMemo } from 'react'
import type { ReactNode } from 'react'
import type { View } from 'react-native'
import {
  EMPTY_RANGE,
  nextRange,
  rangePosition,
  useControllableState,
} from '@xaui/native'
import type { DateRange } from '@xaui/native'
import { useTramHaptic } from '../../theme/tram-haptics'
import { CalendarRoot } from '../calendar/calendar'
import { useCalendar } from '../calendar/calendar.context'
import { RangeCalendarProvider } from './range-calendar.context'
import type { RangeCalendarProps } from './range-calendar.type'

/**
 * A month, and the period chosen in it. **It is the Tram `Calendar`**: the same root, the
 * same header, chevrons, headings and paging; only the day differs.
 *
 * The two ends are the accent's flat squares and the days between them its soft slice,
 * laid edge to edge — squares that touch need no half band hidden under a disc. A one-day
 * period is one square. The three presses are Native's: start, end, or a new start.
 */
export const RangeCalendarRoot = forwardRef<View, RangeCalendarProps>(
  function RangeCalendar(
    { children, value: controlledValue, defaultValue, onValueChange, ...props },
    ref
  ) {
    const [value, setValue] = useControllableState<DateRange>({
      value: controlledValue,
      defaultValue: defaultValue ?? EMPTY_RANGE,
      onChange: onValueChange,
    })

    return (
      // The calendar below holds no chosen day: a period has two ends and its `value`
      // has room for one. The cells paint themselves off the range instead.
      <CalendarRoot ref={ref} defaultMonth={value.start ?? undefined} {...props}>
        <RangeLayer value={value} setValue={setValue}>
          {children}
        </RangeLayer>
      </CalendarRoot>
    )
  }
)

RangeCalendarRoot.displayName = 'XAUI.Tram.RangeCalendar.Root'

type RangeLayerProps = {
  value: DateRange
  setValue: (next: DateRange | ((current: DateRange) => DateRange)) => void
  children?: ReactNode
}

/** Inside the calendar, so the band reads the colour the calendar resolved. */
function RangeLayer({ value, setValue, children }: RangeLayerProps) {
  const { band, isDisabled } = useCalendar()
  const haptic = useTramHaptic()

  const select = useCallback(
    (date: Date) => {
      haptic('selection')
      setValue(current => nextRange(current, date))
    },
    [haptic, setValue]
  )

  const positionOf = useCallback((date: Date) => rangePosition(date, value), [value])

  const context = useMemo(
    () => ({
      bandStyle: { backgroundColor: isDisabled ? 'transparent' : band },
      value,
      positionOf,
      select,
    }),
    [band, isDisabled, value, positionOf, select]
  )

  return <RangeCalendarProvider value={context}>{children}</RangeCalendarProvider>
}
