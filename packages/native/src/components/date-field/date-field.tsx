import { forwardRef, useCallback, useMemo, useRef, useState } from 'react'
import type { View } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { TextFieldRoot } from '../text-field'
import {
  dateOrderFor,
  dateSeparatorFor,
  datePlaceholder,
  formatDate,
  maskDate,
  parseDate,
} from '../../utils/date-mask'
import { DateFieldProvider } from './date-field.context'
import type { DateFieldProps } from './date-field.type'

/** The letters code is written in. A language's own are the caller's to give. */
const DEFAULT_LABELS = { day: 'DD', month: 'MM', year: 'YYYY' }

/**
 * A date, typed.
 *
 * ```tsx
 * <DateField locale="fr-FR" onValueChange={setBirthday}>
 *   <DateField.Label>Date de naissance</DateField.Label>
 *   <DateField.Field />
 *   <DateField.Description>Jour, mois, année.</DateField.Description>
 * </DateField>
 * ```
 *
 * **It is a `TextField`.** The root below is the `TextField`'s root, unchanged: the same
 * recipe, the same four variants, the same `size`, `radius`, `color`, `labelPlacement`,
 * `isInvalid` and `isDisabled`. `DateField.Label`, `.Description` and `.Error` **are** the
 * `TextField`'s slots — the same components, not wrappers — and only `DateField.Field`
 * differs, by masking what is typed into it. The `TextArea`'s arrangement exactly.
 *
 * **It is a mask, not a set of segments.** There is one representation — the digits, in
 * order — and `maskDate` is the only thing that turns them into text. That is what makes the
 * field survive a paste, a keyboard that offers its own punctuation, and a backspace over a
 * separator, none of which a three-input segmented field survives without a rule each.
 *
 * **The order and the separator come from the locale**, out of `Intl` rather than off a
 * table of countries. Give `order` when it is a decision rather than a locale: an ISO field
 * is `YMD` wherever it is read.
 *
 * A date that cannot exist — the 31st of February — reports `null` rather than rolling
 * forward into March, which is what `new Date` would do and what nobody typing it meant.
 *
 * **A calendar is optional and composed**, not a prop. `DateField.Trigger` inside a
 * `FieldGroup` puts the mark on the trailing edge, and `DateField.Sheet` is the month it
 * opens — a sheet rather than a popover, because a month is three hundred points wide and on
 * a phone that is the screen. A field that is only ever typed writes neither.
 *
 * For a date **chosen** rather than typed, that is `DatePicker`; for the month itself,
 * `Calendar`.
 */
export const DateFieldRoot = forwardRef<View, DateFieldProps>(function DateField(
  {
    value,
    defaultValue,
    onValueChange,
    order: orderProp,
    locale = 'en-US',
    separator: separatorProp,
    segmentLabels = DEFAULT_LABELS,
    isOpen: isOpenProp,
    defaultOpen = false,
    onOpenChange,
    children,
    ...props
  },
  ref
) {
  const order = orderProp ?? dateOrderFor(locale)
  const separator = separatorProp ?? dateSeparatorFor(locale)

  const [typed, setTyped] = useState(() =>
    defaultValue ? formatDate(defaultValue, order, separator) : ''
  )
  const [isOpen, setOpen] = useControllableState({
    value: isOpenProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  // The field is text-first: what the reader is halfway through typing is not a date, and a
  // component that stored only dates would have nowhere to keep it. `value` therefore does
  // not replace the text — it *overrides* it, and only when the two actually disagree about
  // which day it is. Without that test a controlled field would erase the reader's own
  // keystrokes on every render; with it, a caller can still set the date from outside and be
  // obeyed. `parseDate` is what makes them comparable, since `04/07/1995` and `4/7/1995` are
  // the same day written twice.
  const isControlled = value !== undefined
  const typedDate = parseDate(typed, order)
  const text =
    isControlled && !isSameInstant(typedDate, value)
      ? value === null
        ? ''
        : formatDate(value, order, separator)
      : typed

  // Not state: it is only read to decide whether the callback says anything new, and a
  // render of its own would be a render per keystroke that changes nothing on screen.
  const reported = useRef(typedDate)

  const onType = useCallback(
    (input: string) => {
      const next = maskDate(input, order, separator)
      setTyped(next)

      const date = parseDate(next, order)
      // Every edit, but only when the *date* moved: a reader typing the year of a date that
      // is already complete would otherwise fire `null` on each of the four keystrokes.
      if (isSameInstant(date, reported.current)) return

      reported.current = date
      onValueChange?.(date)
    },
    [onValueChange, order, separator]
  )

  const onPick = useCallback(
    (picked: Date) => {
      onType(formatDate(picked, order, separator))
      // A calendar that stays open after the choice leaves the reader looking for the way
      // out of a decision they have already made.
      setOpen(false)
    },
    [onType, order, separator, setOpen]
  )

  const context = useMemo(
    () => ({
      text,
      value: parseDate(text, order),
      onType,
      onPick,
      placeholder: datePlaceholder(order, separator, segmentLabels),
      locale,
      isOpen,
      setOpen,
    }),
    [text, order, onType, onPick, separator, segmentLabels, locale, isOpen, setOpen]
  )

  return (
    <DateFieldProvider value={context}>
      <TextFieldRoot ref={ref} {...props}>
        {children}
      </TextFieldRoot>
    </DateFieldProvider>
  )
})

DateFieldRoot.displayName = 'XAUI.DateField.Root'

/** Two dates, either of which may be absent, on the same day or not. */
function isSameInstant(
  a: Date | null | undefined,
  b: Date | null | undefined
): boolean {
  if (!a || !b) return !a && !b

  return a.getTime() === b.getTime()
}
