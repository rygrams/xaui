import { useCallback, useMemo, useState } from 'react'
import { StyleSheet } from 'react-native'
import type { TextStyle } from 'react-native'
import { useControllableState } from '../../hooks/use-controllable-state'
import { useXAUITheme } from '../../theme/theme-hooks'
import { startOfDay } from '../../utils/dates'
import { selectRecipe } from '../select/select.recipe'
import { textFieldRecipe } from '../text-field/text-field.recipe'
import { DatePickerProvider } from './date-picker.context'
import { datePickerRecipe } from './date-picker.recipe'
import type { DatePickerAnchor, DatePickerProps } from './date-picker.type'

/** What the field says when the caller names no format. */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

/**
 * A field that opens a month.
 *
 * ```tsx
 * <DatePicker value={date} onValueChange={setDate}>
 *   <DatePicker.Trigger>
 *     <DatePicker.Value placeholder="Choisir une date" />
 *     <DatePicker.Indicator />
 *   </DatePicker.Trigger>
 *   <DatePicker.Overlay />
 *   <DatePicker.Content>
 *     <DatePicker.Calendar />
 *   </DatePicker.Content>
 * </DatePicker>
 * ```
 *
 * **It owns almost nothing, and that is the design.** The trigger is a `Select`'s trigger,
 * the panel is a `Select`'s panel, and the grid is a `Calendar` — all three by construction
 * rather than by resemblance, so a select and a date field in one form cannot drift apart
 * and a calendar in a picker cannot differ from one on a page.
 *
 * What it adds is the wiring: a date read into the field through `Intl`, a panel that
 * closes when a day is pressed, and one set of bounds rather than two.
 *
 * **The calendar's variant is not the field's.** A `ghost` field over a `primary` calendar
 * is the ordinary case — the trigger is quiet on the form and the chosen day is not — so
 * `variant` dresses the field and `calendarVariant` dresses the grid.
 *
 * **The root renders no node.** `ref`, `style` and the a11y props live on
 * `DatePicker.Trigger`.
 */
export function DatePicker({
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
  formatOptions,
  closeOnSelect = true,
  isDisabled = false,
  isInvalid = false,
}: DatePickerProps) {
  const theme = useXAUITheme()
  const [anchor, setAnchor] = useState<DatePickerAnchor | null>(null)

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

  const selection = {
    variant,
    size,
    radius,
    isOpen: isOpen ? ('true' as const) : undefined,
    isInvalid: isInvalid ? ('true' as const) : undefined,
  }

  // The shared half. Two resolutions, not one: the trigger owns a press state the root
  // cannot see, so the root resolves both faces and the slot picks — R5 intact, and the
  // second call is a cache hit.
  const styles = selectRecipe.resolve({
    theme,
    selection,
    states: { disabled: isDisabled },
  })
  const pressed = selectRecipe.resolve({
    theme,
    selection,
    states: { pressed: true },
  })
  const tint = color ? selectRecipe.tint({ theme, color, selection }) : undefined

  /** The half neither the select nor the calendar has: the panel's own inset. */
  const own = datePickerRecipe.resolve({ theme, selection: { size } })

  // The column, the label and the help line are the `TextField`'s, token for token — a
  // date field and a text field stacked in one form read as one control, which is why
  // `DatePicker.Field` composes them rather than this component owning a second table.
  const labelled = textFieldRecipe.resolve({
    theme,
    selection: { size, isInvalid: isInvalid ? ('true' as const) : undefined },
    states: { disabled: isDisabled },
  })

  const open = useCallback(() => setOpen(true), [setOpen])
  const close = useCallback(() => setOpen(false), [setOpen])
  const toggle = useCallback(
    () => (isOpen ? close() : open()),
    [close, isOpen, open]
  )

  const select = useCallback(
    (next: Date) => {
      // Midnight, always: a `Date` carrying the moment it was pressed compares unequal to
      // the same day written by the caller, and the field would read one day and hold
      // another.
      setValue(startOfDay(next))
      if (closeOnSelect) close()
    },
    [close, closeOnSelect, setValue]
  )

  const label = useMemo(
    () =>
      value === undefined ? undefined : formatDate(value, locale, formatOptions),
    [formatOptions, locale, value]
  )

  const calendar = useMemo(
    () => ({
      variant: calendarVariant,
      size,
      color,
      minValue,
      maxValue,
      firstDayOfWeek,
      locale,
    }),
    [calendarVariant, size, color, minValue, maxValue, firstDayOfWeek, locale]
  )

  const context = useMemo(() => {
    const indicator = StyleSheet.flatten<TextStyle>([
      styles.indicator,
      tint?.indicator,
    ])
    // A tint repaints the field, and `fieldPlaceholder` was chosen against the theme's
    // field colour rather than an arbitrary one. The tint's own foreground is what stays
    // legible on it — the `Autocomplete` says the same at the same line.
    const tintedPlaceholder = tint
      ? StyleSheet.flatten<TextStyle>([tint.value]).color
      : undefined

    return {
      triggerStyle: tint ? [styles.trigger, tint.trigger] : styles.trigger,
      triggerPressedStyle: pressed.trigger,
      valueStyle: tint ? [styles.value, tint.value] : styles.value,
      placeholderStyle: tint
        ? [styles.placeholder, { color: tintedPlaceholder }]
        : styles.placeholder,
      indicatorStyle: styles.indicator,
      overlayStyle: styles.overlay,
      contentStyle: styles.content,
      fieldStyle: own.field,
      columnStyle: labelled.root,
      labelStyle: labelled.label,
      descriptionStyle: labelled.description,
      errorStyle: labelled.error,
      glyph: {
        size: indicator.fontSize,
        color: typeof indicator.color === 'string' ? indicator.color : undefined,
      },
      value,
      label,
      isOpen,
      isDisabled,
      isInvalid,
      open,
      close,
      toggle,
      select,
      calendar,
      anchor,
      setAnchor,
    }
  }, [
    styles,
    pressed,
    tint,
    own,
    labelled,
    value,
    label,
    isOpen,
    isDisabled,
    isInvalid,
    open,
    close,
    toggle,
    select,
    calendar,
    anchor,
  ])

  return <DatePickerProvider value={context}>{children}</DatePickerProvider>
}

DatePicker.displayName = 'XAUI.DatePicker.Root'

/**
 * The chosen day, as the field reads it.
 *
 * `dateStyle: 'medium'` by default — "6 sept. 2026" — because a field is a line on a form
 * and the long form is a sentence. `Intl` missing from a Hermes build without ICU falls
 * back to the ISO day, which is unambiguous in every locale even where it is nobody's
 * habit.
 */
function formatDate(
  date: Date,
  locale: string | undefined,
  options: Intl.DateTimeFormatOptions | undefined
): string {
  try {
    return new Intl.DateTimeFormat(locale, options ?? DEFAULT_FORMAT).format(date)
  } catch {
    return date.toISOString().slice(0, 10)
  }
}
