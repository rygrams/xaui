import type { WheelPickerProps } from '../wheel-picker/wheel-picker.type'
import type {
  WheelFieldContentProps,
  WheelFieldContextValue,
  WheelFieldFieldProps,
  WheelFieldIndicatorProps,
  WheelFieldOverlayProps,
  WheelFieldRootProps,
  WheelFieldSize,
  WheelFieldSlot,
  WheelFieldTextProps,
  WheelFieldTriggerProps,
  WheelFieldValueProps,
} from '../wheel-field/wheel-field.type'

export type DatePickerSlot = WheelFieldSlot

export type DatePickerSize = WheelFieldSize

type DatePickerOwnProps = {
  /** The first day the wheels can make. A day before it turns back to it. */
  minValue?: Date
  /** The last day the wheels can make. */
  maxValue?: Date
}

/**
 * The root is the column — `DatePicker.Label`, the field, `DatePicker.Description` /
 * `.Error` — so `ref`, `style` and the style props dress that column.
 *
 * The Native `DatePicker`'s props, with the Tram vocabulary: **no `variant`** (the
 * Metro field is one box, the ground inside a line), **no `calendarVariant`** (the
 * wheel's own `variant` is written on `DatePicker.Wheel`), **no `firstDayOfWeek`** (there
 * is no grid of weeks), **no `closeOnSelect`** (nothing is chosen until ✓), `accent`
 * added. `value` is a day at midnight.
 */
export type DatePickerProps = WheelFieldRootProps<DatePickerOwnProps>

export type DatePickerLabelProps = WheelFieldTextProps
export type DatePickerDescriptionProps = WheelFieldTextProps
export type DatePickerErrorProps = WheelFieldTextProps
export type DatePickerTriggerProps = WheelFieldTriggerProps
export type DatePickerFieldProps = WheelFieldFieldProps
export type DatePickerValueProps = WheelFieldValueProps
export type DatePickerIndicatorProps = WheelFieldIndicatorProps
export type DatePickerOverlayProps = WheelFieldOverlayProps
export type DatePickerContentProps = WheelFieldContentProps

/**
 * The wheel on the page: everything the `WheelPicker` takes except what the picker
 * owns — its columns, its colour and whether it answers. `size` defaults to the picker's.
 */
export type DatePickerWheelProps = Omit<
  WheelPickerProps,
  'children' | 'accent' | 'color' | 'isDisabled' | 'asChild'
>

/** The bounds and the locale the wheel is built from. */
export type DatePickerContextValue = {
  minValue?: Date
  maxValue?: Date
  locale?: string
}

/** What the field, the page and the wheel read — shared with the `TimePicker`. */
export type DatePickerFieldContextValue = WheelFieldContextValue
