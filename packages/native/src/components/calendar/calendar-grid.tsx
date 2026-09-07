import { forwardRef, useMemo } from 'react'
import { View } from 'react-native'
import { useStyleProps } from '../../system/style-props'
import { monthGrid } from '../../utils/dates'
import { CalendarDay } from './calendar-day'
import { useCalendar } from './calendar.context'
import type { CalendarGridProps } from './calendar.type'

/**
 * The six weeks of the month on screen.
 *
 * ```tsx
 * <Calendar.Grid />
 *
 * <Calendar.Grid>
 *   {date => (
 *     <Calendar.Day key={date.toISOString()} date={date}>
 *       …
 *     </Calendar.Day>
 *   )}
 * </Calendar.Grid>
 * ```
 *
 * **Children may be a function, and this is the one place in the library where that is the
 * right shape.** Forty-two cells are generated from a month rather than written, so there
 * is nothing for a caller to compose against — `asChild` merges into one element and a slot
 * list cannot enumerate a month. The function is handed each date and returns the cell;
 * with nothing, the grid renders `Calendar.Day`.
 *
 * The key is the date's own time, because two cells in one grid are never the same day and
 * an index would re-key every cell on every page.
 */
export const CalendarGrid = forwardRef<View, CalendarGridProps>(
  function CalendarGrid({ children, style, ...props }, ref) {
    const { gridStyle, month, firstDayOfWeek } = useCalendar()
    const [styleProps, rest] = useStyleProps(props)

    const days = useMemo(
      () => monthGrid(month, firstDayOfWeek),
      [month, firstDayOfWeek]
    )

    return (
      <View ref={ref} {...rest} style={[gridStyle, styleProps, style]}>
        {days.map(date => (
          <View key={date.getTime()} style={CELL}>
            {typeof children === 'function' ? (
              children(date)
            ) : (
              <CalendarDay date={date} />
            )}
          </View>
        ))}
      </View>
    )
  }
)

CalendarGrid.displayName = 'XAUI.Calendar.Grid'

/**
 * A seventh of the row, with the cell centred in it.
 *
 * `flexWrap` on the grid needs a width per child to break at seven, and a percentage is
 * what makes that width the phone's rather than a number this file would have to guess.
 * `14.2857%` rather than `100 / 7` written out: RN takes the string, and a repeating
 * decimal truncated at six places drifts by a pixel across a row.
 */
const CELL = { width: '14.2857%', alignItems: 'center' } as const
