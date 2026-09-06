import { useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { startOfDay } from '../../utils/dates'
import { withTime } from '../../utils/time-mask'
import { selectRecipe } from '../select/select.recipe'
import { DateTimePickerProvider } from './date-time-picker.context'
import type { DateTimePickerProps } from './date-time-picker.type'

/** What the field says when the caller names no format. */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = {
  dateStyle: 'medium',
  timeStyle: 'short',
}

/**
 * A field that opens a month, and then a clock.
 *
 * ```tsx
 * <DateTimePicker value={moment} onValueChange={setMoment}>
 *   <DateTimePicker.Trigger>
 *     <DateTimePicker.Value placeholder="Choisir un moment" />
 *     <DateTimePicker.Indicator />
 *   </DateTimePicker.Trigger>
 *   <DateTimePicker.Sheet />
 * </DateTimePicker>
 * ```
 *
 * **It owns nothing at all, and that is the design.** The trigger is a `Select`'s trigger,
 * the two steps are a `Tabs`, the month is a `Calendar` and the dial is a `TimePicker` — four
 * components rendered as themselves rather than four tables restated. It has no recipe of its
 * own: the only style it touches is the field's, and that one belongs to the `Select`.
 *
 * **Two steps rather than two fields.** A moment is one value, so it is one control — and a
 * calendar and a clock will not fit on a phone at the same time, which is why the two take
 * turns. Choosing a day moves to the clock, exactly as the `TimePicker`'s hours move to its
 * minutes, and choosing the minutes closes the sheet.
 *
 * **Each half keeps the other.** A day chosen after a time keeps the time, and a time chosen
 * after a day keeps the day: the value is one moment being narrowed rather than two values
 * being collected.
 *
 * For a moment **typed** rather than chosen, that is `DateTimeField`.
 */
export function DateTimePicker({
  children,
  variant,
  size = 'md',
  radius,
  color,
  value: controlledValue,
  defaultValue,
  onValueChange,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  step: controlledStep,
  defaultStep = 'date',
  onStepChange,
  hourCycle,
  minuteStep = 1,
  minValue,
  maxValue,
  locale,
  formatOptions = DEFAULT_FORMAT,
  closeOnSelect = true,
  isDisabled = false,
  isInvalid = false,
}: DateTimePickerProps) {
  const theme = useXAUITheme()

  const [value, setValue] = useControllableState<Date | undefined>({
    value: controlledValue,
    defaultValue,
    onChange: onValueChange as ((next: Date | undefined) => void) | undefined,
  })

  const [isOpen, setOpen] = useControllableState({
    value: controlledOpen,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  })

  const [step, setStep] = useControllableState({
    value: controlledStep,
    defaultValue: defaultStep,
    onChange: onStepChange,
  })

  const selection = {
    variant,
    size,
    radius,
    isOpen: isOpen ? ('true' as const) : undefined,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }

  // The `DatePicker`'s arrangement: two resolutions, because the trigger owns a press state
  // the root cannot see, so the root resolves both faces and the slot picks. R5 intact, and
  // the second call is a cache hit.
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

  const onPickDate = useCallback(
    (day: Date) => {
      // The day changes and the time does not — the value is one moment being narrowed
      // rather than two values being collected. With nothing chosen yet the clock starts at
      // midnight, which is what the dial shows when it opens.
      const start = startOfDay(day)
      setValue(
        value === undefined
          ? start
          : withTime(start, {
              hours: value.getHours(),
              minutes: value.getMinutes(),
              seconds: 0,
            })
      )
      // Straight on to the clock, which is what makes a two-step sheet feel like one
      // decision — the `TimePicker`'s hours handing over to its minutes, one level up.
      setStep('time')
    },
    [setStep, setValue, value]
  )

  const onPickTime = useCallback(
    (moment: Date) => {
      setValue(moment)
      if (closeOnSelect) setOpen(false)
    },
    [closeOnSelect, setOpen, setValue]
  )

  const toggle = useCallback(() => {
    if (isDisabled) return
    setOpen(!isOpen)
    // Back to the date whenever it opens: a sheet that reopened on the clock would hide the
    // month from a reader who came to change the day.
    setStep('date')
  }, [isDisabled, isOpen, setOpen, setStep])

  const text = useMemo(
    () =>
      value === undefined
        ? undefined
        : new Intl.DateTimeFormat(locale, formatOptions).format(value),
    [value, locale, formatOptions]
  )

  const dateText = useMemo(
    () =>
      value === undefined
        ? undefined
        : new Intl.DateTimeFormat(locale, { dateStyle: 'medium' }).format(value),
    [value, locale]
  )

  const timeText = useMemo(
    () =>
      value === undefined
        ? undefined
        : new Intl.DateTimeFormat(locale, { timeStyle: 'short' }).format(value),
    [value, locale]
  )

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
      glyph,

      value,
      text,
      dateText,
      timeText,

      step,
      setStep,
      onPickDate,
      onPickTime,

      calendar: {
        variant: undefined,
        size,
        color,
        minValue,
        maxValue,
        locale,
      },
      clock: { size, color, hourCycle, minuteStep, locale },

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
      dateText,
      timeText,
      step,
      setStep,
      onPickDate,
      onPickTime,
      size,
      color,
      minValue,
      maxValue,
      locale,
      hourCycle,
      minuteStep,
      isOpen,
      setOpen,
      toggle,
      isDisabled,
      isInvalid,
    ]
  )

  return <DateTimePickerProvider value={context}>{children}</DateTimePickerProvider>
}

DateTimePicker.displayName = 'XAUI.DateTimePicker.Root'
