import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { Calendar } from '../calendar'
import { EMPTY_RANGE, nextRange, rangePosition } from '../../utils/date-range'
import type { DateRange } from '../../utils/date-range'
import { RangeCalendarProvider } from './range-calendar.context'
import { rangeCalendarRecipe } from './range-calendar.recipe'
import type { RangeCalendarProps } from './range-calendar.type'

/**
 * A month, and the period chosen in it.
 *
 * ```tsx
 * <RangeCalendar value={stay} onValueChange={setStay}>
 *   <RangeCalendar.Header>
 *     <RangeCalendar.PreviousButton accessibilityLabel="Mois précédent" />
 *     <RangeCalendar.Title />
 *     <RangeCalendar.NextButton accessibilityLabel="Mois suivant" />
 *   </RangeCalendar.Header>
 *   <RangeCalendar.Weekdays />
 *   <RangeCalendar.Grid />
 * </RangeCalendar>
 * ```
 *
 * **It is a `Calendar`.** The root below is the `Calendar`'s root, unchanged — the same
 * variants, the same `size`, `radius`, `color`, the same month state, the same bounds, the
 * same weekday names. The header, the title, the two arrows and the weekdays **are** its
 * slots, re-exported rather than wrapped. Only the day cell differs, and only by having a
 * band behind it.
 *
 * That is possible because `Calendar.Grid` takes a **function child**: forty-two cells are
 * generated rather than written, so replacing the cell is the one composition point that
 * component published — and this is what it published it for.
 *
 * **Three presses, not two.** Pressing a day with a range already chosen starts a new one
 * rather than doing nothing: asking a reader to clear first is asking them to find a control
 * that should not need to exist. Pressing a day *before* the start makes it the new start,
 * because a backwards range is not a range and swapping the two would move a bound they did
 * not touch.
 *
 * A one-day range is allowed. A one-night stay and a one-day event are real.
 */
export const RangeCalendarRoot = forwardRef<View, RangeCalendarProps>(
  function RangeCalendar(
    { children, value: controlledValue, defaultValue, onValueChange, ...props },
    ref
  ) {
    const theme = useXAUITheme()

    const [value, setValue] = useControllableState<DateRange>({
      value: controlledValue,
      defaultValue: defaultValue ?? EMPTY_RANGE,
      onChange: onValueChange,
    })

    const selection = { size: props.size }
    const styles = rangeCalendarRecipe.resolve({ theme, selection })
    const tint = props.color
      ? rangeCalendarRecipe.tint({ theme, color: props.color, selection })
      : undefined

    const select = useCallback(
      (date: Date) => setValue(current => nextRange(current, date)),
      [setValue]
    )

    const positionOf = useCallback(
      (date: Date) => rangePosition(date, value),
      [value]
    )

    const context = useMemo(
      () => ({
        bandStyle: [styles.band, tint?.band],
        bandStartStyle: [styles.bandStart, tint?.bandStart],
        bandEndStyle: [styles.bandEnd, tint?.bandEnd],
        value,
        positionOf,
        select,
      }),
      [styles, tint, value, positionOf, select]
    )

    return (
      <RangeCalendarProvider value={context}>
        {/* No `value` and no `onValueChange`: the calendar below holds no chosen day of its
            own, because a range has two ends and its `value` has room for one. The cells
            paint themselves off this component's context instead. */}
        <Calendar ref={ref} defaultMonth={value.start ?? undefined} {...props}>
          {children}
        </Calendar>
      </RangeCalendarProvider>
    )
  }
)

RangeCalendarRoot.displayName = 'XAUI.RangeCalendar.Root'
