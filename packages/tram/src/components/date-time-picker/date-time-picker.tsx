import { forwardRef, useCallback, useEffect, useMemo, useRef } from 'react'
import { View } from 'react-native'
import { useControllableState } from '@xaui/native'
import { Slot, useStyleProps } from '@xaui/native/system'
import { DatePickerProvider } from '../date-picker/date-picker.context'
import { TimePickerProvider } from '../time-picker/time-picker.context'
import { hourCycleOf, minuteStepOf } from '../time-picker/time-picker.times'
import { useWheelFieldRoot } from '../wheel-field/use-wheel-field'
import { WheelFieldProvider } from '../wheel-field/wheel-field.context'
import { isoDay, isoTime, readMoment } from '../wheel-field/wheel-field.read'
import { DateTimePickerProvider } from './date-time-picker.context'
import { momentFormat, settleMoment } from './date-time-picker.moments'
import type { DateTimePickerStep } from './date-time-picker.moments'
import type { DateTimePickerProps } from './date-time-picker.type'

const now = () => new Date()

const isoMoment = (moment: Date) => `${isoDay(moment)} ${isoTime(moment)}`

/**
 * A field that opens a page of wheels — the Native `DateTimePicker`'s API, drawn as the
 * Metro pickers: the `TextField`'s box with the moment in it, and a page that swivels in
 * with two titles, the day and the time being chosen, over the wheels of the half that is
 * up — the `DatePicker`'s or the `TimePicker`'s — and the App Bar's ✓ and ✕.
 *
 * ```tsx
 * <DateTimePicker value={moment} onValueChange={setMoment} minuteStep={5}>
 *   <DateTimePicker.Label>rendez-vous</DateTimePicker.Label>
 *   <DateTimePicker.Field placeholder="choisir un moment" />
 *   <DateTimePicker.Content confirmLabel="ok" cancelLabel="annuler">
 *     <DateTimePicker.Steps labels={{ date: 'date', time: 'heure' }} />
 *   </DateTimePicker.Content>
 * </DateTimePicker>
 * ```
 *
 * **Two halves, two titles.** Six columns do not fit across a phone, so the halves take
 * turns, as Native's do — under the Tram `Tabs`, each title reading its half of the
 * moment. The page opens on the date, always.
 *
 * **Nothing is chosen while the wheels turn.** They stand on one moment, which either
 * half narrows without touching the other: a day turned keeps the time, a time turned
 * keeps the day. ✓ takes the moment from either half and fires `onValueChange`; ✕ and
 * the system's back leave the value as it was.
 *
 * The root is the column, not the field.
 */
export const DateTimePickerRoot = forwardRef<View, DateTimePickerProps>(
  function DateTimePicker(
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
      hourCycle: askedCycle,
      minuteStep: askedStep = 1,
      step: controlledStep,
      defaultStep = 'date',
      onStepChange,
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

    const format = useMemo(
      () => formatOptions ?? momentFormat(hourCycle),
      [formatOptions, hourCycle]
    )
    const read = useCallback(
      (moment: Date) => readMoment(moment, locale, format, isoMoment),
      [locale, format]
    )
    const settle = useCallback(
      (moment: Date) =>
        settleMoment(moment, minuteStep, bounds.minValue, bounds.maxValue),
      [minuteStep, bounds]
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

    const [step, setStep] = useControllableState<DateTimePickerStep>({
      value: controlledStep,
      defaultValue: defaultStep,
      onChange: onStepChange,
    })

    // A page closed on the time reopens on the date: one that reopened on the time would
    // hide the day from a reader who came to change it. Reset as it closes, not as it
    // opens, so the page swivelling in already shows the date.
    const wasOpen = useRef(context.isOpen)
    useEffect(() => {
      if (wasOpen.current && !context.isOpen) setStep('date')
      wasOpen.current = context.isOpen
    }, [context.isOpen, setStep])

    const own = useMemo(
      () => ({ step, setStep, hourCycle, locale }),
      [step, setStep, hourCycle, locale]
    )
    // What the two wheels read, as they read it under their own pickers.
    const dateOwn = useMemo(() => ({ ...bounds, locale }), [bounds, locale])
    const timeOwn = useMemo(
      () => ({ hourCycle, minuteStep, locale }),
      [hourCycle, minuteStep, locale]
    )

    // Under `asChild` the caller's element is the column: `Slot` merges these into it.
    const Root = asChild ? Slot : View

    return (
      <WheelFieldProvider value={context}>
        <DateTimePickerProvider value={own}>
          <DatePickerProvider value={dateOwn}>
            <TimePickerProvider value={timeOwn}>
              {/* Most general to most specific: the cached recipe, the style props, `style`. */}
              <Root ref={ref} {...rest} style={[rootStyle, styleProps, style]}>
                {children}
              </Root>
            </TimePickerProvider>
          </DatePickerProvider>
        </DateTimePickerProvider>
      </WheelFieldProvider>
    )
  }
)

DateTimePickerRoot.displayName = 'XAUI.Tram.DateTimePicker.Root'
