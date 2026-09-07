import { View } from 'react-native'
import type { ComponentType } from 'react'
import { Icon } from '../../system/icon'
import type { IconComponentProps } from '../../system/icon'
import { useDatePicker } from './date-picker.context'
import { CalendarGlyphIcon } from './calendar-glyph-icon'

/**
 * The calendar mark on the field.
 *
 * It does **not** turn with the panel the way a `Select`'s chevron does: a chevron rotates
 * because it points at where the list will appear, and a calendar glyph points nowhere. The
 * field's `accessibilityState.expanded` is what says the panel is open; the mark just says
 * the field is a date.
 *
 * `as` swaps the glyph — pass `ChevronDownIcon` back for the select-style affordance, or any
 * icon of your own.
 */
export function DatePickerIndicator(props: {
  as?: ComponentType<IconComponentProps>
}) {
  const { as = CalendarGlyphIcon } = props
  const { indicatorStyle } = useDatePicker()

  return (
    <View style={indicatorStyle}>
      <Icon as={as} />
    </View>
  )
}

DatePickerIndicator.displayName = 'XAUI.DatePicker.Indicator'
