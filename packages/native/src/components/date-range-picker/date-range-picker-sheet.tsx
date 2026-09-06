import { BottomSheet } from '../bottom-sheet'
import { RangeCalendar } from '../range-calendar'
import {
  DateRangePickerProvider,
  useDateRangePicker,
} from './date-range-picker.context'
import type {
  DateRangePickerCalendarProps,
  DateRangePickerSheetProps,
} from './date-range-picker.type'

/**
 * The month `DateRangePicker.Trigger` opens.
 *
 * With no children it is the handle and the month. Children replace both, and
 * `DateRangePicker.Calendar` is the binding on its own — a title above it, a "this weekend"
 * row below it.
 */
export function DateRangePickerSheet({
  children,
  previousLabel,
  nextLabel,
  ...props
}: DateRangePickerSheetProps) {
  // Read here, above the portal, and put back below it.
  const picker = useDateRangePicker()

  return (
    <BottomSheet isOpen={picker.isOpen} onOpenChange={picker.setOpen} {...props}>
      <BottomSheet.Overlay />
      <BottomSheet.Content>
        {/* `BottomSheet.Content` renders through a `Portal`, which moves its children to a
            host elsewhere in the tree — and a React context does not travel with them. The
            sheet puts its own back on the far side; the picker's has to be put back beside
            it, or the month inside would throw looking for it. */}
        <DateRangePickerProvider value={picker}>
          {children ?? (
            <>
              <BottomSheet.Handle />
              <DateRangePickerCalendar
                previousLabel={previousLabel}
                nextLabel={nextLabel}
              />
            </>
          )}
        </DateRangePickerProvider>
      </BottomSheet.Content>
    </BottomSheet>
  )
}

DateRangePickerSheet.displayName = 'XAUI.DateRangePicker.Sheet'

/**
 * The month, already bound.
 *
 * It **is** a `RangeCalendar` — the same component, rendered as itself — so every rule that
 * one has about a third press, a backwards range and a one-day range is this one's too.
 */
export function DateRangePickerCalendar({
  previousLabel,
  nextLabel,
  ...props
}: DateRangePickerCalendarProps) {
  const { value, onPickRange, calendar } = useDateRangePicker()

  return (
    <RangeCalendar
      variant={calendar.variant}
      size={calendar.size}
      color={calendar.color}
      locale={calendar.locale}
      minValue={calendar.minValue}
      maxValue={calendar.maxValue}
      firstDayOfWeek={calendar.firstDayOfWeek}
      value={value}
      onValueChange={onPickRange}
      {...props}
    >
      <RangeCalendar.Header>
        <RangeCalendar.PreviousButton accessibilityLabel={previousLabel} />
        <RangeCalendar.Title />
        <RangeCalendar.NextButton accessibilityLabel={nextLabel} />
      </RangeCalendar.Header>
      <RangeCalendar.Weekdays />
      <RangeCalendar.Grid />
    </RangeCalendar>
  )
}

DateRangePickerCalendar.displayName = 'XAUI.DateRangePicker.Calendar'
