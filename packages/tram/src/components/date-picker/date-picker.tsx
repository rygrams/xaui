import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useWheelFieldRoot } from '../wheel-field/use-wheel-field'
import { WheelFieldProvider } from '../wheel-field/wheel-field.context'
import { isoDay, readMoment } from '../wheel-field/wheel-field.read'
import { DatePickerProvider } from './date-picker.context'
import { clampDate } from './date-picker.dates'
import type { DatePickerProps } from './date-picker.type'

/** What the field says when the caller names no format: "18 nov. 2026". */
const DEFAULT_FORMAT: Intl.DateTimeFormatOptions = { dateStyle: 'medium' }

const today = () => new Date()

/**
 * A field that opens a page of wheels — the Native `DatePicker`'s API, drawn as the
 * Metro date picker: the `TextField`'s box with the day in it, and a page that swivels
 * in with three columns of squares, the day, the month and the year, and the App Bar's
 * ✓ and ✕ along the bottom.
 *
 * ```tsx
 * <DatePicker value={date} onValueChange={setDate} locale="fr-FR">
 *   <DatePicker.Label>naissance</DatePicker.Label>
 *   <DatePicker.Field placeholder="choisir une date" />
 *   <DatePicker.Content confirmLabel="ok" cancelLabel="annuler" />
 *   <DatePicker.Description>jour, mois, année.</DatePicker.Description>
 * </DatePicker>
 * ```
 *
 * **The columns are in the locale's order** — the day first in French, the month first
 * in American English, the year first in Japanese. A month square carries its number
 * and its name, a day square its number and its weekday. The day and the month turn
 * without end; the year runs a century each way, or between `minValue` and `maxValue`.
 *
 * **Nothing is chosen while the wheels turn.** ✓ takes the day and fires
 * `onValueChange`; ✕ and the system's back leave the value as it was. A day outside the
 * bounds turns back to the nearest one; 31 January turned to February lands on its
 * last day.
 *
 * The root is the column, not the field. While the page is up the field's line is the
 * accent read as ink. ✓ is felt through `TramProvider`'s `onHaptic`, when the app gave
 * it one.
 */
export const DatePickerRoot = forwardRef<View, DatePickerProps>(function DatePicker(
  {
    children,
    size,
    radius,
    accent,
    color,
    value,
    defaultValue,
    onValueChange,
    isOpen,
    defaultOpen,
    onOpenChange,
    minValue,
    maxValue,
    locale,
    formatOptions = DEFAULT_FORMAT,
    isDisabled,
    isInvalid,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)

  // By the moment, not the object: a bound written inline is a new `Date` every render.
  const min = minValue?.getTime()
  const max = maxValue?.getTime()
  const bounds = useMemo(
    () => ({
      minValue: min === undefined ? undefined : new Date(min),
      maxValue: max === undefined ? undefined : new Date(max),
    }),
    [min, max]
  )

  const settle = useCallback(
    (day: Date) => clampDate(day, bounds.minValue, bounds.maxValue),
    [bounds]
  )
  const read = useCallback(
    (day: Date) => readMoment(day, locale, formatOptions, isoDay),
    [locale, formatOptions]
  )

  const { context, rootStyle } = useWheelFieldRoot({
    size,
    radius,
    accent,
    color,
    value,
    defaultValue,
    onValueChange,
    isOpen,
    defaultOpen,
    onOpenChange,
    isDisabled,
    isInvalid,
    read,
    seed: today,
    settle,
  })

  const own = useMemo(() => ({ ...bounds, locale }), [bounds, locale])

  // Under `asChild` the caller's element is the column: `Slot` merges these into it. No
  // role on it either way — the control is the trigger inside.
  const Root = asChild ? Slot : View

  return (
    <WheelFieldProvider value={context}>
      <DatePickerProvider value={own}>
        {/* Most general to most specific: the cached recipe, the style props, `style`. */}
        <Root ref={ref} {...rest} style={[rootStyle, styleProps, style]}>
          {children}
        </Root>
      </DatePickerProvider>
    </WheelFieldProvider>
  )
})

DatePickerRoot.displayName = 'XAUI.Tram.DatePicker.Root'
