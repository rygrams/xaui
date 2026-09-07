import { forwardRef } from 'react'
import type { View } from 'react-native'
import { DatePickerIndicator } from './date-picker-indicator'
import { DatePickerTrigger } from './date-picker-trigger'
import { DatePickerValue } from './date-picker-value'
import type { DatePickerFieldProps } from './date-picker.type'

/**
 * The trigger in one tag: the field the user sees, with its value and its calendar glyph
 * already inside it.
 *
 * It is `DatePicker.Trigger` wrapping `DatePicker.Value` and `DatePicker.Indicator` — the
 * shape every picker wants — so `<DatePicker.Field placeholder="…" />` is the whole control.
 * Everything `DatePicker.Trigger` takes is written here, and `ref` is the trigger, since
 * that is the node the panel measures. `children` replaces the value and the glyph.
 *
 * The label and the hint are **siblings**, not props: `DatePicker.Label` above,
 * `DatePicker.Description` or a caller-mounted `DatePicker.Error` below — `isInvalid` drives
 * the colours, and the caller decides whether the message is on screen, exactly as a
 * `TextField` does.
 */
export const DatePickerField = forwardRef<View, DatePickerFieldProps>(
  function DatePickerField({ placeholder, children, ...triggerProps }, ref) {
    return (
      <DatePickerTrigger ref={ref} {...triggerProps}>
        {children ?? (
          <>
            <DatePickerValue placeholder={placeholder} />
            <DatePickerIndicator />
          </>
        )}
      </DatePickerTrigger>
    )
  }
)

DatePickerField.displayName = 'XAUI.DatePicker.Field'
