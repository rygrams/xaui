import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { TextFieldRoot } from '../text-field'
import { dateOrderFor, dateSeparatorFor } from '../../utils/date-mask'
import {
  dateTimeLength,
  dateTimePlaceholder,
  formatDateTime,
  maskDateTime,
  parseDateTime,
} from '../../utils/date-time-mask'
import type { DateTimeShape } from '../../utils/date-time-mask'
import { hourCycleFor, periodOf } from '../../utils/time-mask'
import type { DayPeriod } from '../../utils/time-mask'
import { DateTimeFieldProvider } from './date-time-field.context'
import type { DateTimeFieldProps } from './date-time-field.type'

/** The letters code is written in. A language's own are the caller's to give. */
const DEFAULT_DATE_LABELS = { day: 'DD', month: 'MM', year: 'YYYY' }
const DEFAULT_TIME_LABELS = { hours: 'HH', minutes: 'mm', seconds: 'ss' }
const DEFAULT_PERIODS: Record<DayPeriod, string> = { am: 'AM', pm: 'PM' }

/**
 * A moment, typed — a date and a time in one box.
 *
 * ```tsx
 * <DateTimeField locale="fr-FR" onValueChange={setStartsAt}>
 *   <DateTimeField.Label>Début de l’événement</DateTimeField.Label>
 *   <DateTimeField.Field />
 * </DateTimeField>
 * ```
 *
 * **One box, not two fields side by side.** A moment is one value, and two boxes make a
 * reader tab between them, decide which one an error belongs to, and hold half a moment
 * while they do. The mask is the two masks in sequence over one stream of digits: the first
 * eight are the date and the rest are the time, so every rule the `DateField` and the
 * `TimeField` already have — the month capped at 12, the day capped by its month, the
 * minutes at 59, nothing raised under the reader — is kept rather than copied.
 *
 * Both halves have to be whole and real before the value is anything: a complete date beside
 * a half-typed time is not a moment, and neither is the 31st of February at noon.
 *
 * **The period is a toggle**, as it is on the `TimeField`, and for the same reason — the
 * keyboard is a number pad. `DateTimeField.Period` renders nothing on a twenty-four-hour
 * field.
 *
 * For a moment **chosen** rather than typed, that is `DateTimePicker`; for either half on its
 * own, `DateField` and `TimeField`.
 */
export const DateTimeFieldRoot = forwardRef<View, DateTimeFieldProps>(
  function DateTimeField(
    {
      value,
      defaultValue,
      onValueChange,
      order: orderProp,
      separator: separatorProp,
      granularity = 'minute',
      hourCycle: hourCycleProp,
      locale = 'en-US',
      segmentLabels = DEFAULT_DATE_LABELS,
      timeLabels = DEFAULT_TIME_LABELS,
      periodLabels = DEFAULT_PERIODS,
      children,
      ...props
    },
    ref
  ) {
    const shape: DateTimeShape = {
      order: orderProp ?? dateOrderFor(locale),
      separator: separatorProp ?? dateSeparatorFor(locale),
      granularity,
      hourCycle: hourCycleProp ?? hourCycleFor(locale),
    }

    const [typed, setTyped] = useState(() =>
      defaultValue ? formatDateTime(defaultValue, shape) : ''
    )
    const [typedPeriod, setTypedPeriod] = useState<DayPeriod>(() =>
      defaultValue ? periodOf(defaultValue) : 'am'
    )

    // The `DateField`'s rule, and its comment: `value` does not replace the text, it
    // overrides it, and only when the two disagree about which moment they name.
    const isControlled = value !== undefined
    const typedMoment = parseDateTime(typed, shape, typedPeriod)
    const agrees =
      typedMoment !== null &&
      value != null &&
      typedMoment.getTime() === value.getTime()

    const text =
      isControlled && !agrees
        ? value === null
          ? ''
          : formatDateTime(value, shape)
        : typed
    const period =
      isControlled && !agrees && value != null ? periodOf(value) : typedPeriod

    // Not state: it is only read to decide whether the callback says anything new.
    const reported = useRef<Date | null>(null)

    const report = useCallback(
      (next: string, nextPeriod: DayPeriod) => {
        const moment = parseDateTime(next, shape, nextPeriod)

        const before = reported.current
        if (
          moment === null ? before === null : before?.getTime() === moment.getTime()
        ) {
          return
        }

        reported.current = moment
        onValueChange?.(moment)
      },
      // The shape is four primitives; spreading them is what keeps this callback stable
      // across a render that rebuilt the object around the same four values.
      [
        shape.order,
        shape.separator,
        shape.granularity,
        shape.hourCycle,
        onValueChange,
      ]
    )

    const onType = useCallback(
      (input: string) => {
        const next = maskDateTime(input, shape)
        setTyped(next)
        report(next, period)
      },
      [
        shape.order,
        shape.separator,
        shape.granularity,
        shape.hourCycle,
        period,
        report,
      ]
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
        placeholder: dateTimePlaceholder(shape, {
          date: segmentLabels,
          time: timeLabels,
        }),
        length: dateTimeLength(granularity),
        period,
        periodLabels,
        onPeriodChange,
        hasPeriod: shape.hourCycle === 12,
      }),
      [
        text,
        onType,
        shape.order,
        shape.separator,
        shape.granularity,
        shape.hourCycle,
        segmentLabels,
        timeLabels,
        granularity,
        period,
        periodLabels,
        onPeriodChange,
      ]
    )

    return (
      <DateTimeFieldProvider value={context}>
        <TextFieldRoot ref={ref} {...props}>
          {children}
        </TextFieldRoot>
      </DateTimeFieldProvider>
    )
  }
)

DateTimeFieldRoot.displayName = 'XAUI.DateTimeField.Root'
