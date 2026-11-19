import { forwardRef, useCallback, useMemo } from 'react'
import type { View } from 'react-native'
import { WheelPicker } from '../wheel-picker'
import { useWheelField } from '../wheel-field/wheel-field.context'
import { fieldName, twoDigits } from '../wheel-field/wheel-field.read'
import { useTimePicker } from './time-picker.context'
import {
  composeTime,
  hourSquares,
  minuteSquares,
  periodNames,
  timeColumnOrder,
  timeSquaresOf,
} from './time-picker.times'
import type { DayPeriod, TimePart, TimeSquares } from './time-picker.times'
import type { TimePickerWheelProps } from './time-picker.type'

const PERIODS: DayPeriod[] = ['am', 'pm']

/** What a column's value string stands for, back in the squares' terms. */
function squaresWith(
  squares: TimeSquares,
  part: TimePart,
  next: string
): TimeSquares {
  if (part === 'period') return { ...squares, period: next as DayPeriod }

  return { ...squares, [part]: Number(next) }
}

/**
 * The columns on the page — a Tram `WheelPicker` bound to the picker's draft, its clock
 * and its locale. Its own props are the wheel's: `variant`, `size`, `visibleCount`,
 * `isAwake`, the style props.
 *
 * The hours on a twelve-hour clock run 12, 1 … 11 and read as written; on a 24-hour
 * clock they run 00 … 23. The half of the day is two squares, with ends.
 */
export const TimePickerWheel = forwardRef<View, TimePickerWheelProps>(
  function TimePickerWheel({ size, ...props }, ref) {
    const { draft, setDraft, wheel } = useWheelField()
    const { hourCycle, minuteStep, locale } = useTimePicker()

    const squares = timeSquaresOf(draft, hourCycle, minuteStep)
    const order = useMemo(
      () => timeColumnOrder(locale, hourCycle),
      [locale, hourCycle]
    )

    const names = useMemo(
      () => ({
        hour: fieldName('hour', locale),
        minute: fieldName('minute', locale),
        period: fieldName('dayPeriod', locale),
      }),
      [locale]
    )
    const columns = useMemo(() => {
      const periods = periodNames(locale)

      return {
        hour: hourSquares(hourCycle).map(hour => (
          <WheelPicker.Item key={hour} value={String(hour)}>
            {hourCycle === 12 ? String(hour) : twoDigits(hour)}
          </WheelPicker.Item>
        )),
        minute: minuteSquares(minuteStep).map(minute => (
          <WheelPicker.Item key={minute} value={String(minute)}>
            {twoDigits(minute)}
          </WheelPicker.Item>
        )),
        period: PERIODS.map(period => (
          <WheelPicker.Item key={period} value={period}>
            {periods[period]}
          </WheelPicker.Item>
        )),
      }
    }, [locale, hourCycle, minuteStep])

    const turn = useCallback(
      (part: TimePart, next: string) => {
        const current = timeSquaresOf(draft, hourCycle, minuteStep)

        setDraft(composeTime(draft, squaresWith(current, part, next), hourCycle))
      },
      [draft, hourCycle, minuteStep, setDraft]
    )

    return (
      <WheelPicker
        ref={ref}
        size={size ?? wheel.size}
        accent={wheel.accent}
        color={wheel.color}
        isDisabled={wheel.isDisabled}
        {...props}
      >
        {order.map(part => (
          <WheelPicker.Column
            key={part}
            accessibilityLabel={names[part]}
            value={String(squares[part])}
            onValueChange={next => turn(part, next)}
            // Morning and afternoon are two squares, not a turn.
            isLooping={part !== 'period'}
          >
            {columns[part]}
          </WheelPicker.Column>
        ))}
      </WheelPicker>
    )
  }
)

TimePickerWheel.displayName = 'XAUI.Tram.TimePicker.Wheel'
