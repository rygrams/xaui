import { forwardRef, useCallback, useMemo } from 'react'
import { View } from 'react-native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { useWheelFieldRoot } from '../wheel-field/use-wheel-field'
import { WheelFieldProvider } from '../wheel-field/wheel-field.context'
import { isoTime, readMoment } from '../wheel-field/wheel-field.read'
import { TimePickerProvider } from './time-picker.context'
import {
  composeTime,
  hourCycleOf,
  minuteStepOf,
  timeSquaresOf,
} from './time-picker.times'
import type { TimePickerProps } from './time-picker.type'

const now = () => new Date()

/**
 * A field that opens a page of wheels — the Native `TimePicker`'s API, drawn as the
 * Metro time picker: the `TextField`'s box with the time in it, and a page that swivels
 * in with a column of hours and one of minutes — and, on a twelve-hour clock, the half
 * of the day — and the App Bar's ✓ and ✕ along the bottom.
 *
 * ```tsx
 * <TimePicker value={time} onValueChange={setTime} minuteStep={5}>
 *   <TimePicker.Label>réveil</TimePicker.Label>
 *   <TimePicker.Field placeholder="choisir une heure" />
 *   <TimePicker.Content confirmLabel="ok" cancelLabel="annuler" />
 * </TimePicker>
 * ```
 *
 * **The clock is the locale's** unless `hourCycle` says otherwise, and so is the order
 * of the columns — the half of the day comes first in Korean. The hours and the minutes
 * turn without end; a time between two minute squares stands on the one under it.
 *
 * **Nothing is chosen while the wheels turn.** ✓ takes the time and fires
 * `onValueChange`; ✕ and the system's back leave the value as it was.
 *
 * The root is the column, not the field. The field reads the time through `Intl`, on
 * the picker's clock.
 */
export const TimePickerRoot = forwardRef<View, TimePickerProps>(function TimePicker(
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
    hourCycle: askedCycle,
    minuteStep: askedStep = 1,
    locale,
    formatOptions,
    isDisabled,
    isInvalid,
    asChild = false,
    style,
    ...props
  },
  ref
) {
  const [styleProps, rest] = useStyleProps(props)

  const hourCycle = useMemo(
    () => askedCycle ?? hourCycleOf(locale),
    [askedCycle, locale]
  )
  const minuteStep = minuteStepOf(askedStep)

  // The field on the picker's clock, unless the caller wrote a format of their own.
  const format = useMemo<Intl.DateTimeFormatOptions>(
    () => formatOptions ?? { timeStyle: 'short', hour12: hourCycle === 12 },
    [formatOptions, hourCycle]
  )
  const read = useCallback(
    (time: Date) => readMoment(time, locale, format, isoTime),
    [locale, format]
  )
  // On a minute square, to the minute: what the wheels can stand on.
  const settle = useCallback(
    (time: Date) => composeTime(time, timeSquaresOf(time, 24, minuteStep), 24),
    [minuteStep]
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
    seed: now,
    settle,
  })

  const own = useMemo(
    () => ({ hourCycle, minuteStep, locale }),
    [hourCycle, minuteStep, locale]
  )

  // Under `asChild` the caller's element is the column: `Slot` merges these into it.
  const Root = asChild ? Slot : View

  return (
    <WheelFieldProvider value={context}>
      <TimePickerProvider value={own}>
        {/* Most general to most specific: the cached recipe, the style props, `style`. */}
        <Root ref={ref} {...rest} style={[rootStyle, styleProps, style]}>
          {children}
        </Root>
      </TimePickerProvider>
    </WheelFieldProvider>
  )
})

TimePickerRoot.displayName = 'XAUI.Tram.TimePicker.Root'
