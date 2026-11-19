import { forwardRef, useMemo } from 'react'
import type { View } from 'react-native'
import { DatePickerWheel } from '../date-picker/date-picker-wheel'
import { Tabs } from '../tabs'
import { TimePickerWheel } from '../time-picker/time-picker-wheel'
import { useWheelField } from '../wheel-field/wheel-field.context'
import { isoDay, isoTime, readMoment } from '../wheel-field/wheel-field.read'
import { useDateTimePicker } from './date-time-picker.context'
import { STEPS, stepFormats } from './date-time-picker.moments'
import type { DateTimePickerStep } from './date-time-picker.moments'
import type {
  DateTimePickerDateWheelProps,
  DateTimePickerStepsProps,
  DateTimePickerTimeWheelProps,
} from './date-time-picker.type'

const DEFAULT_LABELS: Record<DateTimePickerStep, string> = {
  date: 'date',
  time: 'time',
}

const FALLBACKS: Record<DateTimePickerStep, (moment: Date) => string> = {
  date: isoDay,
  time: isoTime,
}

/**
 * The day, the month and the year — the `DatePicker`'s wheel, on the picker's moment: a
 * day turned keeps the time. Its props are the wheel's; `size` defaults to the picker's.
 */
export const DateTimePickerDateWheel = forwardRef<
  View,
  DateTimePickerDateWheelProps
>(function DateTimePickerDateWheel(props, ref) {
  return <DatePickerWheel ref={ref} {...props} />
})

DateTimePickerDateWheel.displayName = 'XAUI.Tram.DateTimePicker.DateWheel'

/**
 * The hours and the minutes — the `TimePicker`'s wheel, on the picker's moment and clock:
 * a time turned keeps the day.
 */
export const DateTimePickerTimeWheel = forwardRef<
  View,
  DateTimePickerTimeWheelProps
>(function DateTimePickerTimeWheel(props, ref) {
  return <TimePickerWheel ref={ref} {...props} />
})

DateTimePickerTimeWheel.displayName = 'XAUI.Tram.DateTimePicker.TimeWheel'

/**
 * The two halves of the page, as the Tram `Tabs`: a row of two titles over the half's
 * wheels. **Each title reads its half of the moment being chosen** — "18 nov. 2026",
 * "09:30" — so the page says what both halves stand on without a header of its own; the
 * one up is in the page's ink, the other in `muted`, and a press on it brings its wheels
 * in from its side. `labels` name the halves to a screen reader.
 *
 * With no children, the two panels hold `.DateWheel` and `.TimeWheel`. Written out, each
 * panel is a `Tabs.Content` whose `value` is the step's name:
 *
 * ```tsx
 * <DateTimePicker.Steps labels={labels}>
 *   <Tabs.Content value="date"><DateTimePicker.DateWheel variant="light" /></Tabs.Content>
 *   <Tabs.Content value="time"><DateTimePicker.TimeWheel variant="light" /></Tabs.Content>
 * </DateTimePicker.Steps>
 * ```
 */
export const DateTimePickerSteps = forwardRef<View, DateTimePickerStepsProps>(
  function DateTimePickerSteps(
    { labels = DEFAULT_LABELS, size = 'md', children, style, ...props },
    ref
  ) {
    const { draft, wheel } = useWheelField()
    const { step, setStep, hourCycle, locale } = useDateTimePicker()

    const formats = useMemo(() => stepFormats(hourCycle), [hourCycle])
    const titles = useMemo(
      () =>
        Object.fromEntries(
          STEPS.map(each => [
            each,
            readMoment(draft, locale, formats[each], FALLBACKS[each]),
          ])
        ) as Record<DateTimePickerStep, string>,
      [draft, locale, formats]
    )

    return (
      <Tabs
        ref={ref}
        size={size}
        value={step}
        onValueChange={next => setStep(next as DateTimePickerStep)}
        accent={wheel.accent}
        color={wheel.color}
        isDisabled={wheel.isDisabled}
        // The page lays its body from the start: the row takes the width it scrolls in.
        style={[{ alignSelf: 'stretch' }, style]}
        {...props}
      >
        <Tabs.List>
          {STEPS.map(each => (
            <Tabs.Trigger
              key={each}
              value={each}
              accessibilityLabel={`${labels[each]}, ${titles[each]}`}
            >
              {titles[each]}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
        {children ?? (
          <>
            <Tabs.Content value="date">
              <DateTimePickerDateWheel />
            </Tabs.Content>
            <Tabs.Content value="time">
              <DateTimePickerTimeWheel />
            </Tabs.Content>
          </>
        )}
      </Tabs>
    )
  }
)

DateTimePickerSteps.displayName = 'XAUI.Tram.DateTimePicker.Steps'
