import { BottomSheet } from '../bottom-sheet'
import { Calendar } from '../calendar'
import { TimePicker } from '../time-picker'
import {
  DateTimePickerProvider,
  useDateTimePicker,
} from './date-time-picker.context'
import { DateTimePickerSteps } from './date-time-picker-steps'
import type {
  DateTimePickerCalendarProps,
  DateTimePickerClockProps,
  DateTimePickerSheetProps,
} from './date-time-picker.type'

/**
 * The month and the clock `DateTimePicker.Trigger` opens.
 *
 * With no children it is the two steps and whichever half they are on. Children replace all
 * of it, and `DateTimePicker.Steps`, `.Calendar` and `.Clock` are the three pieces to build
 * your own from.
 *
 * **A sheet, and the `TimePicker`'s reason.** A month is three hundred points wide and a
 * clock face is three hundred square; either one beside a field on a phone is the screen.
 */
export function DateTimePickerSheet({
  children,
  stepLabels,
  previousLabel,
  nextLabel,
  ...props
}: DateTimePickerSheetProps) {
  // Read here, above the portal, and put back below it.
  const picker = useDateTimePicker()

  return (
    <BottomSheet isOpen={picker.isOpen} onOpenChange={picker.setOpen} {...props}>
      <BottomSheet.Overlay />
      <BottomSheet.Content>
        {/* `BottomSheet.Content` renders through a `Portal`, which moves its children to a
            host elsewhere in the tree — and a React context does not travel with them. The
            sheet puts its own back on the far side; the picker's has to be put back beside
            it, or the calendar inside would throw looking for it. */}
        <DateTimePickerProvider value={picker}>
          {children ?? (
            <>
              <BottomSheet.Handle />
              <DateTimePickerSteps labels={stepLabels} />
              {picker.step === 'date' ? (
                <DateTimePickerCalendar
                  previousLabel={previousLabel}
                  nextLabel={nextLabel}
                />
              ) : (
                <DateTimePickerClock />
              )}
            </>
          )}
        </DateTimePickerProvider>
      </BottomSheet.Content>
    </BottomSheet>
  )
}

DateTimePickerSheet.displayName = 'XAUI.DateTimePicker.Sheet'

/**
 * The month, already bound.
 *
 * It **is** a `Calendar` — the same component, rendered as itself — and choosing a day keeps
 * whatever time the value already had, then moves to the clock.
 */
export function DateTimePickerCalendar({
  previousLabel,
  nextLabel,
  ...props
}: DateTimePickerCalendarProps) {
  const { value, onPickDate, calendar } = useDateTimePicker()

  return (
    <Calendar
      size={calendar.size}
      color={calendar.color}
      locale={calendar.locale}
      minValue={calendar.minValue}
      maxValue={calendar.maxValue}
      value={value}
      onValueChange={onPickDate}
      {...props}
    >
      <Calendar.Header>
        <Calendar.PreviousButton accessibilityLabel={previousLabel} />
        <Calendar.Title />
        <Calendar.NextButton accessibilityLabel={nextLabel} />
      </Calendar.Header>
      <Calendar.Weekdays />
      <Calendar.Grid />
    </Calendar>
  )
}

DateTimePickerCalendar.displayName = 'XAUI.DateTimePicker.Calendar'

/**
 * The dial, already bound.
 *
 * It **is** a `TimePicker` with its own sheet left out: the display and the clock are the two
 * pieces that component publishes for exactly this, and rendering them here is what makes a
 * date-and-time field and a time field behave identically on their second step.
 *
 * `closeOnSelect` is the outer picker's, not this one's — the minutes close the sheet the
 * trigger opened, and this `TimePicker` has no sheet of its own to close.
 */
export function DateTimePickerClock(props: DateTimePickerClockProps) {
  const { value, onPickTime, clock } = useDateTimePicker()

  return (
    <TimePicker
      size={clock.size}
      color={clock.color}
      locale={clock.locale}
      hourCycle={clock.hourCycle}
      minuteStep={clock.minuteStep}
      value={value}
      onValueChange={onPickTime}
      closeOnSelect={false}
      {...props}
    >
      <TimePicker.Display style={{ alignSelf: 'center' }} />
      <TimePicker.Clock style={{ alignSelf: 'center' }} />
    </TimePicker>
  )
}

DateTimePickerClock.displayName = 'XAUI.DateTimePicker.Clock'
