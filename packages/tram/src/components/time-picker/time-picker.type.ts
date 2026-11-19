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
import type { HourCycle } from './time-picker.times'

export type TimePickerSlot = WheelFieldSlot

export type TimePickerSize = WheelFieldSize

type TimePickerOwnProps = {
  /** Twelve hours and a half of the day, or twenty-four. Unset, it is `locale`'s. */
  hourCycle?: HourCycle
  /**
   * How far apart two minute squares are. A step that does not divide the hour is the
   * nearest one under it that does. @default 1
   */
  minuteStep?: number
}

/**
 * The root is the column — `TimePicker.Label`, the field, `TimePicker.Description` /
 * `.Error` — so `ref`, `style` and the style props dress that column. **Native's root
 * renders no node**: Tram's has the `DatePicker`'s shape, label and help lines included,
 * because the page is titled by the label, as the Metro "choose time" was.
 *
 * The Native `TimePicker`'s props, with the Tram vocabulary: **no `variant`** (one box),
 * **no `closeOnSelect`** (nothing is chosen until ✓), `accent` added. `value` keeps its
 * day; the wheels change its hours and minutes, and its seconds are dropped.
 */
export type TimePickerProps = WheelFieldRootProps<TimePickerOwnProps>

export type TimePickerLabelProps = WheelFieldTextProps
export type TimePickerDescriptionProps = WheelFieldTextProps
export type TimePickerErrorProps = WheelFieldTextProps
export type TimePickerTriggerProps = WheelFieldTriggerProps
export type TimePickerFieldProps = WheelFieldFieldProps
export type TimePickerValueProps = WheelFieldValueProps
export type TimePickerIndicatorProps = WheelFieldIndicatorProps
export type TimePickerOverlayProps = WheelFieldOverlayProps
export type TimePickerContentProps = WheelFieldContentProps

/**
 * The wheel on the page: everything the `WheelPicker` takes except what the picker
 * owns. `size` defaults to the picker's.
 */
export type TimePickerWheelProps = Omit<
  WheelPickerProps,
  'children' | 'accent' | 'color' | 'isDisabled' | 'asChild'
>

/** The clock and the locale the wheel is built from. */
export type TimePickerContextValue = {
  hourCycle: HourCycle
  /** Already fitted to divide the hour. */
  minuteStep: number
  locale?: string
}

/** What the field, the page and the wheel read — shared with the `DatePicker`. */
export type TimePickerFieldContextValue = WheelFieldContextValue
