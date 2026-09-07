import { forwardRef, isValidElement } from 'react'
import { View } from 'react-native'
import type { ComponentType, ReactNode } from 'react'
import { useDatePicker } from './date-picker.context'
import { DatePickerDescription } from './date-picker-description'
import { DatePickerError } from './date-picker-error'
import { DatePickerIndicator } from './date-picker-indicator'
import { DatePickerLabel } from './date-picker-label'
import { DatePickerTrigger } from './date-picker-trigger'
import { DatePickerValue } from './date-picker-value'
import type { DatePickerFieldProps } from './date-picker.type'

/**
 * The whole field in one tag: the label, the trigger with its value and calendar glyph, and
 * the hint or the error under it.
 *
 * It **is** the `TextField`'s column — the same `root` gap, the same label and help styles —
 * wrapped around the picker's trigger, so a date field and a text field stacked in one form
 * line up and read as one control. Everything `DatePicker.Trigger` takes is written here and
 * lands on the trigger; `ref` is the trigger too, since that is the node the panel measures.
 *
 * `errorMessage` shows **only while `isInvalid`**, and then in place of `description` — the
 * one line the field has room for is the one that matters. A `label` / `description` /
 * `errorMessage` that is a string is wrapped in the styled slot; a node of your own is left
 * alone.
 *
 * For finer control the slots are still there: `DatePicker.Trigger`, `DatePicker.Value`,
 * `DatePicker.Indicator`, `DatePicker.Label`, `DatePicker.Description`, `DatePicker.Error`.
 */
export const DatePickerField = forwardRef<View, DatePickerFieldProps>(
  function DatePickerField(
    { placeholder, label, description, errorMessage, children, ...triggerProps },
    ref
  ) {
    const { columnStyle, isInvalid } = useDatePicker()

    const help =
      isInvalid && errorMessage != null
        ? wrap(errorMessage, DatePickerError)
        : wrap(description, DatePickerDescription)

    return (
      <View style={columnStyle}>
        {wrap(label, DatePickerLabel)}
        <DatePickerTrigger ref={ref} {...triggerProps}>
          {children ?? (
            <>
              <DatePickerValue placeholder={placeholder} />
              <DatePickerIndicator />
            </>
          )}
        </DatePickerTrigger>
        {help}
      </View>
    )
  }
)

DatePickerField.displayName = 'XAUI.DatePicker.Field'

/** A string becomes the styled slot; a node the caller built is rendered untouched. */
function wrap(
  node: ReactNode,
  Slot: ComponentType<{ children?: ReactNode }>
): ReactNode {
  if (node == null || node === false) return null
  return isValidElement(node) ? node : <Slot>{node}</Slot>
}
