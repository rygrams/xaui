import { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { EMPTY_RANGE } from '../../utils/date-range'
import type { DateRange } from '../../utils/date-range'
import { selectRecipe } from '../select/select.recipe'
import { DateRangePickerProvider } from './date-range-picker.context'
import type { DateRangePickerProps } from './date-range-picker.type'

/** What each end says when the caller names no format. */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

/**
 * An en dash with a space either side — a range's own punctuation, and not a hyphen, which is
 * already a date separator in half the locales this field serves.
 */
const DEFAULT_SEPARATOR = ' – '

/**
 * A field that opens a month, and takes two days from it.
 *
 * ```tsx
 * <DateRangePicker value={stay} onValueChange={setStay}>
 *   <DateRangePicker.Trigger>
 *     <DateRangePicker.Value placeholder="Choisir un séjour" />
 *     <DateRangePicker.Indicator />
 *   </DateRangePicker.Trigger>
 *   <DateRangePicker.Sheet />
 * </DateRangePicker>
 * ```
 *
 * **It owns almost nothing.** The trigger is a `Select`'s trigger and the month is a
 * `RangeCalendar`, which is itself a `Calendar`. What it adds is the wiring: two ends read
 * into the field through `Intl`, and a sheet that closes on the *second* one.
 *
 * **The first choice never closes the sheet.** A period is two decisions, and a sheet that
 * shut after the first would make the second one a second opening.
 *
 * **A sheet rather than an anchored panel**, for the `TimePicker`'s reason: a month is three
 * hundred points wide, which beside a field on a phone is the screen.
 *
 * For a period **typed** rather than chosen, that is `DateRangeField`.
 */
export function DateRangePicker({
  children,
  variant,
  size = 'md',
  radius,
  color,
  calendarVariant,
  value: controlledValue,
  defaultValue,
  onValueChange,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  minValue,
  maxValue,
  firstDayOfWeek,
  locale,
  formatOptions = DEFAULT_FORMAT,
  separator = DEFAULT_SEPARATOR,
  closeOnSelect = true,
  isDisabled = false,
  isInvalid = false,
}: DateRangePickerProps) {
  const theme = useXAUITheme()

  const [value, setValue] = useControllableState<DateRange>({
    value: controlledValue,
    defaultValue: defaultValue ?? EMPTY_RANGE,
    onChange: onValueChange,
  })

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const selection = {
    variant,
    size,
    radius,
    isOpen: isOpen ? ('true' as const) : undefined,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }

  // The `DatePicker`'s arrangement: two resolutions, because the trigger owns a press state
  // the root cannot see, so the root resolves both faces and the slot picks.
  const field = selectRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const fieldPressed = selectRecipe.resolve({
    theme,
    selection,
    states: { pressed: true },
  })
  const tint = color ? selectRecipe.tint({ theme, color, selection }) : undefined

  const onPickRange = useCallback(
    (next: DateRange) => {
      setValue(next)
      // The second end, and only the second: a period is two decisions.
      if (closeOnSelect && next.start !== null && next.end !== null) setOpen(false)
    },
    [closeOnSelect, setOpen, setValue]
  )

  const toggle = useCallback(() => {
    if (isDisabled) return
    setOpen(!isOpen)
  }, [isDisabled, isOpen, setOpen])

  const text = useMemo(() => {
    if (value.start === null) return undefined

    const format = new Intl.DateTimeFormat(locale, formatOptions)
    const start = format.format(value.start)

    // A start with no end reads as itself rather than as "start – ": a dash with nothing
    // after it says the field is broken, where a lone date says it is half answered.
    return value.end === null
      ? start
      : `${start}${separator}${format.format(value.end)}`
  }, [value, locale, formatOptions, separator])

  const glyph = useMemo(() => {
    const flat = StyleSheet.flatten<TextStyle>([field.indicator, tint?.indicator])

    return {
      size: flat.fontSize,
      color: typeof flat.color === 'string' ? flat.color : undefined,
    }
  }, [field.indicator, tint])

  const context = useMemo(
    () => ({
      triggerStyle: [field.trigger, tint?.trigger],
      triggerPressedStyle: fieldPressed.trigger,
      valueStyle: [field.value, tint?.value],
      placeholderStyle: tint
        ? [
            field.placeholder,
            { color: StyleSheet.flatten<TextStyle>([tint.value]).color },
          ]
        : field.placeholder,
      indicatorStyle: field.indicator,
      glyph,

      value,
      text,
      onPickRange,

      calendar: {
        variant: calendarVariant,
        size,
        color,
        minValue,
        maxValue,
        firstDayOfWeek,
        locale,
      },

      isOpen,
      setOpen,
      toggle,
      isDisabled,
      isInvalid,
    }),
    [
      field,
      fieldPressed,
      tint,
      glyph,
      value,
      text,
      onPickRange,
      calendarVariant,
      size,
      color,
      minValue,
      maxValue,
      firstDayOfWeek,
      locale,
      isOpen,
      setOpen,
      toggle,
      isDisabled,
      isInvalid,
    ]
  )

  return (
    <DateRangePickerProvider value={context}>{children}</DateRangePickerProvider>
  )
}

DateRangePicker.displayName = 'XAUI.DateRangePicker.Root'
