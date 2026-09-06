import { BottomSheet } from '../bottom-sheet'
import { Calendar } from '../calendar'
import { DateFieldProvider, useDateField } from './date-field.context'
import type {
  DateFieldSheetCalendarProps,
  DateFieldSheetProps,
} from './date-field.type'

/**
 * The month `DateField.Trigger` opens, in a sheet.
 *
 * ```tsx
 * <DateField.Sheet
 *   previousLabel="Mois précédent"
 *   nextLabel="Mois suivant"
 * />
 * ```
 *
 * With no children it is the arrangement almost every date wants: the handle, a month with
 * its two arrows, and the day chosen closing the sheet. Children replace all of it, and the
 * calendar you write there is bound the same way — `DateField.SheetCalendar` is that binding
 * on its own.
 *
 * ```tsx
 * <DateField.Sheet>
 *   <BottomSheet.Handle />
 *   <BottomSheet.Title>Quand ?</BottomSheet.Title>
 *   <DateField.SheetCalendar previousLabel="…" nextLabel="…" />
 * </DateField.Sheet>
 * ```
 *
 * **A sheet rather than a popover**, and that is the whole reason this is not the
 * `DatePicker`: a month is three hundred points wide, which on a phone is the screen — so it
 * comes up from the bottom, where the thumb is, instead of hanging off a field near the top
 * of a form.
 *
 * The `BottomSheet` mounts its content only while it is open, so the calendar costs nothing
 * on a form nobody opens.
 */
export function DateFieldSheet({
  children,
  previousLabel,
  nextLabel,
  ...props
}: DateFieldSheetProps) {
  // Read here, above the portal, and put back below it.
  const field = useDateField()

  return (
    <BottomSheet isOpen={field.isOpen} onOpenChange={field.setOpen} {...props}>
      <BottomSheet.Overlay />
      <BottomSheet.Content>
        {/* `BottomSheet.Content` renders through a `Portal`, which moves its children to a
            host elsewhere in the tree — and a React context does not travel with them. The
            sheet puts its own back on the far side for exactly this reason; the field's has
            to be put back beside it, or the calendar inside would throw looking for it. */}
        <DateFieldProvider value={field}>
          {children ?? (
            <>
              <BottomSheet.Handle />
              <DateFieldSheetCalendar
                previousLabel={previousLabel}
                nextLabel={nextLabel}
              />
            </>
          )}
        </DateFieldProvider>
      </BottomSheet.Content>
    </BottomSheet>
  )
}

DateFieldSheet.displayName = 'XAUI.DateField.Sheet'

/**
 * The month itself, already bound to the field.
 *
 * Separate from the sheet so a caller composing their own — a title above it, a "today"
 * button under it — does not have to wire the value, the locale and the dismissal by hand.
 *
 * Choosing a day **closes the sheet**: a calendar that stays open after the choice leaves
 * the reader looking for the way out of a decision they have already made.
 *
 * The two arrow labels are the caller's, as they are on the `Calendar` itself — the month
 * they go to is what a screen reader should hear, and this is not the place that knows the
 * language it should hear it in.
 */
export function DateFieldSheetCalendar({
  previousLabel,
  nextLabel,
  ...props
}: DateFieldSheetCalendarProps) {
  const { value, onPick, locale } = useDateField()

  return (
    <Calendar
      locale={locale}
      value={value ?? undefined}
      onValueChange={onPick}
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

DateFieldSheetCalendar.displayName = 'XAUI.DateField.SheetCalendar'
