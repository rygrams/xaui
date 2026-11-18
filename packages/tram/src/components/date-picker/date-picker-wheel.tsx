import { forwardRef, useCallback, useMemo, useState } from 'react'
import { Text } from 'react-native'
import type { TextStyle, View } from 'react-native'
import { useXAUITheme } from '@xaui/native/theme'
import { roleType } from '../typography/typography.role'
import { WheelPicker } from '../wheel-picker'
import { useWheelField } from '../wheel-field/wheel-field.context'
import { fieldName, partName, twoDigits } from '../wheel-field/wheel-field.read'
import { useDatePicker } from './date-picker.context'
import {
  composeDate,
  dateColumnOrder,
  daysInMonth,
  squaresOf,
  yearSpan,
} from './date-picker.dates'
import type { DatePart } from './date-picker.dates'
import type { DatePickerWheelProps } from './date-picker.type'

const MONTHS = Array.from({ length: 12 }, (_, index) => index + 1)

/**
 * A number and, under it, a caption — a month's name, a day's weekday. The caption is a
 * nested `Text` with the role's size and face and **no colour of its own**: it takes the
 * square's, which is mixed on the UI thread as the square nears the middle.
 */
function square(value: number, caption: string | undefined, type: TextStyle) {
  const text = twoDigits(value)

  return (
    <WheelPicker.Item key={value} value={String(value)}>
      {caption ? (
        <>
          {text}
          {'\n'}
          <Text style={type}>{caption}</Text>
        </>
      ) : (
        text
      )}
    </WheelPicker.Item>
  )
}

/**
 * The three columns on the page — a Tram `WheelPicker` bound to the picker's draft, its
 * bounds and its locale. Its own props are the wheel's: `variant`, `size`,
 * `visibleCount`, `isAwake`, the style props.
 *
 * ```tsx
 * <DatePicker.Content>
 *   <DatePicker.Wheel variant="light" isAwake />
 * </DatePicker.Content>
 * ```
 *
 * A column says which part it turns to a screen reader, in the picker's locale.
 */
export const DatePickerWheel = forwardRef<View, DatePickerWheelProps>(
  function DatePickerWheel({ size, ...props }, ref) {
    const theme = useXAUITheme()
    const { draft, setDraft, wheel } = useWheelField()
    const { minValue, maxValue, locale } = useDatePicker()
    const [thisYear] = useState(() => new Date().getFullYear())

    const squares = squaresOf(draft)
    const { year, month } = squares
    const order = useMemo(() => dateColumnOrder(locale), [locale])
    const [from, to] = yearSpan(thisYear, year, minValue, maxValue)

    const names = useMemo(
      () => ({
        day: fieldName('day', locale),
        month: fieldName('month', locale),
        year: fieldName('year', locale),
      }),
      [locale]
    )
    const columns = useMemo(() => {
      const caption = roleType('caption', theme)

      return {
        month: MONTHS.map(each =>
          square(
            each,
            partName(new Date(2000, each - 1, 1), locale, { month: 'short' }),
            caption
          )
        ),
        day: Array.from({ length: daysInMonth(year, month) }, (_, index) =>
          square(
            index + 1,
            partName(new Date(year, month - 1, index + 1), locale, {
              weekday: 'short',
            }),
            caption
          )
        ),
        year: Array.from({ length: to - from + 1 }, (_, index) => (
          <WheelPicker.Item key={from + index} value={String(from + index)}>
            {String(from + index)}
          </WheelPicker.Item>
        )),
      }
    }, [theme, locale, year, month, from, to])

    const turn = useCallback(
      (part: DatePart, next: string) =>
        setDraft(composeDate({ ...squaresOf(draft), [part]: Number(next) })),
      [draft, setDraft]
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
            // A year has no "after the last one": it is the only column with ends.
            isLooping={part !== 'year'}
          >
            {columns[part]}
          </WheelPicker.Column>
        ))}
      </WheelPicker>
    )
  }
)

DatePickerWheel.displayName = 'XAUI.Tram.DatePicker.Wheel'
