import { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { periodOf, withTime } from '../../utils/time-mask'
import type { DayPeriod } from '../../utils/time-mask'
import { hourCycleFor } from '../../utils/time-mask'
import { selectRecipe } from '../select/select.recipe'
import { TimePickerProvider } from './time-picker.context'
import { timePickerDial, timePickerRecipe } from './time-picker.recipe'
import type { TimePickerProps, TimePickerUnit } from './time-picker.type'

/** What the field says when the caller names no format. */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { timeStyle: 'short' }

const HOURS_IN_HALF_DAY = 12

/**
 * A field that opens a clock.
 *
 * ```tsx
 * <TimePicker value={time} onValueChange={setTime}>
 *   <TimePicker.Trigger>
 *     <TimePicker.Value placeholder="Choisir une heure" />
 *     <TimePicker.Indicator />
 *   </TimePicker.Trigger>
 *   <TimePicker.Sheet />
 * </TimePicker>
 * ```
 *
 * **The trigger is a `Select`'s trigger**, by construction rather than by resemblance — the
 * tokens, the four field levels, the focus and the invalid treatment are all that component's,
 * so a select and a time field in one form cannot drift apart. `variant` dresses the field
 * and never reaches the dial, which is not a field.
 *
 * **A sheet rather than an anchored panel.** A clock face is close to three hundred points
 * square, which beside a field on a phone is the screen — the `DateField.Sheet` argument. It
 * is also where the legacy put it.
 *
 * **The dial is the legacy's**, and the shape almost every platform settled on: the hours
 * round the face, then the minutes, with the two big numbers above switching between them.
 * Choosing the minutes closes the sheet, because at that point the time is complete.
 *
 * For a time **typed** rather than chosen, that is `TimeField`.
 */
export function TimePicker({
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
  hourCycle: hourCycleProp,
  minuteStep = 1,
  locale,
  formatOptions = DEFAULT_FORMAT,
  closeOnSelect = true,
  isDisabled = false,
  isInvalid = false,
}: TimePickerProps) {
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

  // The dial always opens on the hours: a reader who came to change the minutes can reach
  // them in one press, and one who came to set a time from nothing needs the hours first.
  const [unit, setUnit] = useState<TimePickerUnit>('hour')

  const hourCycle = hourCycleProp ?? hourCycleFor(locale ?? 'en-US')

  const selection = {
    variant,
    size,
    radius,
    isOpen: isOpen ? ('true' as const) : undefined,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }

  // The `DatePicker`'s arrangement, and its comment: two resolutions rather than one,
  // because the trigger owns a press state the root cannot see — so the root resolves both
  // faces and the slot picks. R5 intact, and the second call is a cache hit.
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
  const fieldTint = color
    ? selectRecipe.tint({ theme, color, selection })
    : undefined

  const dialStyles = timePickerRecipe.resolve({
    theme,
    selection: { size },
    states: { disabled: isDisabled },
  })
  const dialTint = color
    ? timePickerRecipe.tint({ theme, color, selection: { size } })
    : undefined

  // No value yet is midnight on the dial rather than an empty face: a clock with no hand is
  // a clock that looks broken, and the field beside it still reads its placeholder.
  const shown = value ?? new Date(new Date().setHours(0, 0, 0, 0))
  const hours24 = shown.getHours()
  const period: DayPeriod = periodOf(shown)
  const hours =
    hourCycle === 24 ? hours24 : hours24 % HOURS_IN_HALF_DAY || HOURS_IN_HALF_DAY

  const commit = useCallback(
    (next: Date) => {
      setValue(next)
    },
    [setValue]
  )

  const onPickHour = useCallback(
    (hour: number) => {
      const wanted =
        hourCycle === 24
          ? hour
          : (hour % HOURS_IN_HALF_DAY) + (period === 'pm' ? HOURS_IN_HALF_DAY : 0)

      commit(
        withTime(shown, {
          hours: wanted,
          minutes: shown.getMinutes(),
          seconds: 0,
        })
      )
      // Straight on to the minutes, which is the one thing that makes a two-ring dial feel
      // like one gesture rather than two — and what every platform's clock does.
      setUnit('minute')
    },
    [commit, hourCycle, period, shown]
  )

  const onPickMinute = useCallback(
    (minute: number) => {
      commit(withTime(shown, { hours: hours24, minutes: minute, seconds: 0 }))
      if (closeOnSelect) setOpen(false)
    },
    [closeOnSelect, commit, hours24, setOpen, shown]
  )

  const onPeriodChange = useCallback(
    (next: DayPeriod) => {
      if (next === period) return

      const shifted =
        next === 'pm' ? hours24 + HOURS_IN_HALF_DAY : hours24 - HOURS_IN_HALF_DAY

      commit(
        withTime(shown, {
          hours: shifted,
          minutes: shown.getMinutes(),
          seconds: 0,
        })
      )
    },
    [commit, hours24, period, shown]
  )

  const toggle = useCallback(() => {
    if (isDisabled) return
    setOpen(!isOpen)
    setUnit('hour')
  }, [isDisabled, isOpen, setOpen])

  const text = useMemo(
    () =>
      value === undefined
        ? undefined
        : new Intl.DateTimeFormat(locale, formatOptions).format(value),
    [value, locale, formatOptions]
  )

  // Values, not a style: an indicator is a third party's `Icon`, and `size` and `color` are
  // props it takes rather than a style it accepts. Flattened once here, as everywhere else.
  const glyphInk = useMemo(() => {
    const flat = StyleSheet.flatten<TextStyle>([
      field.indicator,
      fieldTint?.indicator,
    ])

    return {
      size: flat.fontSize,
      color: typeof flat.color === 'string' ? flat.color : undefined,
    }
  }, [field.indicator, fieldTint])

  const context = useMemo(
    () => ({
      triggerStyle: [field.trigger, fieldTint?.trigger],
      triggerPressedStyle: fieldPressed.trigger,
      valueStyle: [field.value, fieldTint?.value],
      // A tint repaints the field, and `fieldPlaceholder` was chosen against the theme's
      // field colour rather than an arbitrary one. The tint's own foreground is what stays
      // legible on it — the `DatePicker` says the same at the same line.
      placeholderStyle: fieldTint
        ? [
            field.placeholder,
            { color: StyleSheet.flatten<TextStyle>([fieldTint.value]).color },
          ]
        : field.placeholder,
      indicatorStyle: field.indicator,
      glyph: glyphInk,

      dialStyle: dialStyles.dial,
      faceStyle: dialStyles.face,
      markStyle: dialStyles.mark,
      markSelectedStyle: [dialStyles.markSelected, dialTint?.markSelected],
      markLabelStyle: dialStyles.markLabel,
      markLabelSelectedStyle: [
        dialStyles.markLabelSelected,
        dialTint?.markLabelSelected,
      ],
      handStyle: [dialStyles.hand, dialTint?.hand],
      hubStyle: [dialStyles.hub, dialTint?.hub],
      displayStyle: dialStyles.display,
      unitStyle: dialStyles.unit,
      unitSelectedStyle: [dialStyles.unitSelected, dialTint?.unitSelected],
      colonStyle: dialStyles.colon,
      periodsStyle: dialStyles.periods,
      periodStyle: dialStyles.period,
      periodSelectedStyle: [dialStyles.periodSelected, dialTint?.periodSelected],

      dial: timePickerDial(size),

      value,
      hours,
      minutes: shown.getMinutes(),
      period,
      hourCycle,
      minuteStep: Math.max(1, Math.floor(minuteStep)),
      unit,
      setUnit,
      onPickHour,
      onPickMinute,
      onPeriodChange,
      text,
      isOpen,
      setOpen,
      toggle,
      isDisabled,
      isInvalid,
    }),
    [
      field,
      fieldPressed,
      fieldTint,
      glyphInk,
      dialStyles,
      dialTint,
      size,
      value,
      hours,
      shown,
      period,
      hourCycle,
      minuteStep,
      unit,
      onPickHour,
      onPickMinute,
      onPeriodChange,
      text,
      isOpen,
      setOpen,
      toggle,
      isDisabled,
      isInvalid,
    ]
  )

  return <TimePickerProvider value={context}>{children}</TimePickerProvider>
}

TimePicker.displayName = 'XAUI.TimePicker.Root'
