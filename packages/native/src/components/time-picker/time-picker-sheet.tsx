import { BottomSheet } from '../bottom-sheet'
import { TimePickerClock } from './time-picker-clock'
import { TimePickerDisplay } from './time-picker-display'
import { TimePickerProvider, useTimePicker } from './time-picker.context'
import type { TimePickerSheetProps } from './time-picker.type'

/**
 * The clock `TimePicker.Trigger` opens.
 *
 * With no children it is the arrangement every platform settled on: the two big numbers, then
 * the dial. Children replace it, and `TimePicker.Display` and `TimePicker.Clock` are the two
 * pieces to build your own from — a title above them, a confirm row below.
 *
 * The `BottomSheet` mounts its content only while it is open, so a face of twenty-four
 * pressable marks costs nothing on a form nobody opens.
 */
export function TimePickerSheet({ children, ...props }: TimePickerSheetProps) {
  // Read here, above the portal, and put back below it.
  const picker = useTimePicker()

  return (
    <BottomSheet isOpen={picker.isOpen} onOpenChange={picker.setOpen} {...props}>
      <BottomSheet.Overlay />
      <BottomSheet.Content>
        {/* `BottomSheet.Content` renders through a `Portal`, which moves its children to a
            host elsewhere in the tree — and a React context does not travel with them. The
            sheet puts its own back on the far side; the picker's has to be put back beside
            it, or the dial would throw looking for it. */}
        <TimePickerProvider value={picker}>
          {children ?? (
            <>
              <BottomSheet.Handle />
              <TimePickerDisplay style={{ alignSelf: 'center' }} />
              <TimePickerClock style={{ alignSelf: 'center' }} />
            </>
          )}
        </TimePickerProvider>
      </BottomSheet.Content>
    </BottomSheet>
  )
}

TimePickerSheet.displayName = 'XAUI.TimePicker.Sheet'
