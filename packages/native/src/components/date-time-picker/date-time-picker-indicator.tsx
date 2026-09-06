import { TimePickerIndicator } from '../time-picker'
import { IconContext } from '../../system/icon'
import { useDateTimePicker } from './date-time-picker.context'
import type { IconProps } from '../../system/icon'

/**
 * The mark on the trailing edge.
 *
 * It **is** `TimePicker.Indicator` — the same clock drawn from three views — because the two
 * fields do the same thing and a second glyph would be a second thing to keep in step. The
 * size and the colour reach it through `IconContext`, which is what lets a component from
 * another picker be rendered here without being told either.
 *
 * An `Icon` passed instead replaces it, as everywhere else in the library.
 */
export function DateTimePickerIndicator(props: IconProps) {
  const { glyph } = useDateTimePicker()

  return (
    <IconContext.Provider value={glyph}>
      <TimePickerIndicator {...props} />
    </IconContext.Provider>
  )
}

DateTimePickerIndicator.displayName = 'XAUI.DateTimePicker.Indicator'
