import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { TextFieldRoot } from '../text-field'
import {
  formatTime,
  hourCycleFor,
  maskTime,
  parseTime,
  periodOf,
  timeLength,
  timePlaceholder,
  withTime,
} from '../../utils/time-mask'
import type { DayPeriod } from '../../utils/time-mask'
import { TimeFieldProvider } from './time-field.context'
import type { TimeFieldProps } from './time-field.type'

/** The letters code is written in. A language's own are the caller's to give. */
const DEFAULT_LABELS = { hours: 'HH', minutes: 'mm', seconds: 'ss' }
const DEFAULT_PERIODS: Record<DayPeriod, string> = { am: 'AM', pm: 'PM' }

/**
 * A time, typed.
 *
 * ```tsx
 * <TimeField locale="fr-FR" onValueChange={setStart}>
 *   <TimeField.Label>Heure de début</TimeField.Label>
 *   <TimeField.Field />
 * </TimeField>
 * ```
 *
 * **It is a `TextField`**, and `DateField`'s sibling in every way that matters: the same
 * root, the same variants, the same three text slots re-exported rather than wrapped, and
 * one representation — the digits, in order — that `maskTime` is the only thing to turn into
 * text.
 *
 * **The period is not typed.** On a twelve-hour clock the hours cap at 12 and AM or PM comes
 * from `TimeField.Period` beside the box. The legacy field asked for the letters to be typed
 * into a number pad, which is a keyboard that cannot produce them.
 *
 * ```tsx
 * <TimeField locale="en-US">
 *   <TimeField.Label>Starts at</TimeField.Label>
 *   <FieldGroup>
 *     <TimeField.Field />
 *     <TimeField.Period accessibilityLabel="Morning or afternoon" />
 *   </FieldGroup>
 * </TimeField>
 * ```
 *
 * **The value is a `Date`**, on the day the field already holds or on today's. That is what
 * lets a time compose with a date rather than being a second shape a caller has to merge by
 * hand.
 */
export const TimeFieldRoot = forwardRef<View, TimeFieldProps>(function TimeField(
  {
    value,
    defaultValue,
    onValueChange,
    granularity = 'minute',
    hourCycle: hourCycleProp,
    locale = 'en-US',
    timeLabels = DEFAULT_LABELS,
    periodLabels = DEFAULT_PERIODS,
    children,
    ...props
  },
  ref
) {
  const hourCycle = hourCycleProp ?? hourCycleFor(locale)

  const [typed, setTyped] = useState(() =>
    defaultValue ? formatTime(defaultValue, granularity, hourCycle) : ''
  )
  const [typedPeriod, setTypedPeriod] = useState<DayPeriod>(() =>
    defaultValue ? periodOf(defaultValue) : 'am'
  )

  // The `DateField`'s rule, and its comment: `value` does not replace the text, it overrides
  // it, and only when the two disagree about which moment they name. Without that test a
  // controlled field erases the reader's own keystrokes on every render.
  const isControlled = value !== undefined
  const typedParts = parseTime(typed, granularity, hourCycle, typedPeriod)
  const agrees =
    typedParts !== null &&
    value != null &&
    withTime(value, typedParts).getTime() === value.getTime()

  const text =
    isControlled && !agrees
      ? value === null
        ? ''
        : formatTime(value, granularity, hourCycle)
      : typed
  const period =
    isControlled && !agrees && value != null ? periodOf(value) : typedPeriod

  // The day the parts land on. A caller holding a moment gets that day back rather than
  // today's, which is what makes a time field usable on a date that is not now.
  const anchor = useRef(value ?? defaultValue ?? null)
  if (value != null) anchor.current = value

  // Not state: it is only read to decide whether the callback says anything new.
  const reported = useRef<Date | null>(null)

  const report = useCallback(
    (next: string, nextPeriod: DayPeriod) => {
      const parts = parseTime(next, granularity, hourCycle, nextPeriod)
      const moment =
        parts === null ? null : withTime(anchor.current ?? new Date(), parts)

      const before = reported.current
      if (moment === null ? before === null : before?.getTime() === moment.getTime())
        return

      reported.current = moment
      onValueChange?.(moment)
    },
    [granularity, hourCycle, onValueChange]
  )

  const onType = useCallback(
    (input: string) => {
      const next = maskTime(input, granularity, hourCycle)
      setTyped(next)
      report(next, period)
    },
    [granularity, hourCycle, period, report]
  )

  const onPeriodChange = useCallback(
    (next: DayPeriod) => {
      setTypedPeriod(next)
      report(text, next)
    },
    [report, text]
  )

  const context = useMemo(
    () => ({
      text,
      onType,
      placeholder: timePlaceholder(granularity, timeLabels),
      length: timeLength(granularity),
      period,
      periodLabels,
      onPeriodChange,
      hasPeriod: hourCycle === 12,
    }),
    [
      text,
      onType,
      granularity,
      timeLabels,
      period,
      periodLabels,
      onPeriodChange,
      hourCycle,
    ]
  )

  return (
    <TimeFieldProvider value={context}>
      <TextFieldRoot ref={ref} {...props}>
        {children}
      </TextFieldRoot>
    </TimeFieldProvider>
  )
})

TimeFieldRoot.displayName = 'XAUI.TimeField.Root'
