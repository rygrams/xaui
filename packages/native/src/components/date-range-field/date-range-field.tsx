import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { TextFieldRoot } from '../text-field'
import { dateOrderFor, dateSeparatorFor } from '../../utils/date-mask'
import {
  dateRangeLength,
  dateRangePlaceholder,
  formatDateRange,
  isSameRange,
  maskDateRange,
  parseDateRange,
} from '../../utils/date-range-mask'
import type { DateRange } from '../../utils/date-range-mask'
import { DateRangeFieldProvider } from './date-range-field.context'
import type { DateRangeFieldProps } from './date-range-field.type'

/** The letters code is written in. A language's own are the caller's to give. */
const DEFAULT_LABELS = { day: 'DD', month: 'MM', year: 'YYYY' }
const EMPTY: DateRange = { start: null, end: null }

/**
 * A period, typed — two dates in one box.
 *
 * ```tsx
 * <DateRangeField locale="fr-FR" onValueChange={setStay}>
 *   <DateRangeField.Label>Séjour</DateRangeField.Label>
 *   <DateRangeField.Field />
 *   <DateRangeField.Description>Arrivée et départ.</DateRangeField.Description>
 * </DateRangeField>
 * ```
 *
 * **One box**, for the `DateTimeField`'s reason: a period is one value, and two boxes make a
 * reader tab between them and decide which one an error belongs to. The mask is `maskDate`
 * twice over one stream of digits — the first eight are the start and the rest are the end —
 * so every rule that mask already has is kept rather than copied, and the dash appears the
 * moment the ninth digit does.
 *
 * **The two ends are reported independently.** A reader who has finished the start and is
 * halfway through the end has a start, and a caller filtering a list can use it straight
 * away. Waiting for both would make the field feel inert until its last digit.
 *
 * **Whether the end is after the start is not decided here.** That is a rule about the range
 * rather than about what was typed, and it differs by feature — some ranges may be a single
 * day and some may not. `isInvalid` with a `DateRangeField.Error` is where a caller says so.
 *
 * For a period **chosen** rather than typed, that is `DateRangePicker`.
 */
export const DateRangeFieldRoot = forwardRef<View, DateRangeFieldProps>(
  function DateRangeField(
    {
      value,
      defaultValue,
      onValueChange,
      order: orderProp,
      locale = 'en-US',
      separator: separatorProp,
      segmentLabels = DEFAULT_LABELS,
      children,
      ...props
    },
    ref
  ) {
    const order = orderProp ?? dateOrderFor(locale)
    const separator = separatorProp ?? dateSeparatorFor(locale)

    const [typed, setTyped] = useState(() =>
      defaultValue ? formatDateRange(defaultValue, order, separator) : ''
    )

    // The `DateField`'s rule, and its comment: `value` does not replace the text, it
    // overrides it, and only when the two disagree about which days they name.
    const isControlled = value !== undefined
    const typedRange = parseDateRange(typed, order)
    const text =
      isControlled && !isSameRange(typedRange, value ?? EMPTY)
        ? formatDateRange(value ?? EMPTY, order, separator)
        : typed

    // Not state: it is only read to decide whether the callback says anything new.
    const reported = useRef<DateRange>(EMPTY)

    const onType = useCallback(
      (input: string) => {
        const next = maskDateRange(input, order, separator)
        setTyped(next)

        const range = parseDateRange(next, order)
        // Every edit, but only when an *end* moved: a reader typing the year of a date that
        // is already complete would otherwise fire on each of the four keystrokes.
        if (isSameRange(range, reported.current)) return

        reported.current = range
        onValueChange?.(range)
      },
      [onValueChange, order, separator]
    )

    const context = useMemo(
      () => ({
        text,
        onType,
        placeholder: dateRangePlaceholder(order, separator, segmentLabels),
        length: dateRangeLength(),
      }),
      [text, onType, order, separator, segmentLabels]
    )

    return (
      <DateRangeFieldProvider value={context}>
        <TextFieldRoot ref={ref} {...props}>
          {children}
        </TextFieldRoot>
      </DateRangeFieldProvider>
    )
  }
)

DateRangeFieldRoot.displayName = 'XAUI.DateRangeField.Root'
