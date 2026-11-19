import type { TabsProps } from '../tabs/tabs.type'
import type { DatePickerWheelProps } from '../date-picker/date-picker.type'
import type { HourCycle } from '../time-picker/time-picker.times'
import type { TimePickerWheelProps } from '../time-picker/time-picker.type'
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
import type { DateTimePickerStep } from './date-time-picker.moments'

export type { DateTimePickerStep }

export type DateTimePickerSlot = WheelFieldSlot

export type DateTimePickerSize = WheelFieldSize

type DateTimePickerOwnProps = {
  /** The first moment the wheels can make, to the minute. */
  minValue?: Date
  /** The last moment the wheels can make, to the minute. */
  maxValue?: Date
  /** Twelve hours and a half of the day, or twenty-four. Unset, it is `locale`'s. */
  hourCycle?: HourCycle
  /** How far apart two minute squares are. @default 1 */
  minuteStep?: number
  /** Which half the page shows. Present means controlled. @default 'date' */
  step?: DateTimePickerStep
  defaultStep?: DateTimePickerStep
  onStepChange?: (step: DateTimePickerStep) => void
}

/**
 * The root is the column — `DateTimePicker.Label`, the field, `.Description` / `.Error`
 * — as the Tram `DatePicker`'s and `TimePicker`'s are, so `ref`, `style` and the style
 * props dress that column. **Native's root renders no node.**
 *
 * The Native `DateTimePicker`'s props, with the Tram vocabulary: **no `variant`** (one
 * box), **no `closeOnSelect`** (nothing is chosen until ✓), `accent` added. `formatOptions`
 * defaults to `{ dateStyle: 'medium', timeStyle: 'short' }` on the picker's clock.
 */
export type DateTimePickerProps = WheelFieldRootProps<DateTimePickerOwnProps>

export type DateTimePickerLabelProps = WheelFieldTextProps
export type DateTimePickerDescriptionProps = WheelFieldTextProps
export type DateTimePickerErrorProps = WheelFieldTextProps
export type DateTimePickerTriggerProps = WheelFieldTriggerProps
export type DateTimePickerFieldProps = WheelFieldFieldProps
export type DateTimePickerValueProps = WheelFieldValueProps
export type DateTimePickerIndicatorProps = WheelFieldIndicatorProps
export type DateTimePickerOverlayProps = WheelFieldOverlayProps
export type DateTimePickerContentProps = WheelFieldContentProps

type DateTimePickerStepsOwnProps = {
  /**
   * What the two halves are called, to a screen reader: each title reads its half of the
   * moment, and is announced as "date, 18 nov. 2026". @default `{ date: 'date', time: 'time' }`
   */
  labels?: Record<DateTimePickerStep, string>
}

/**
 * The two halves as the Tram `Tabs`: a row of two titles — the day and the time being
 * chosen — over the half's wheels. Its props are the tabs' root's, less what the picker
 * drives; `size` defaults to `sm`. With children, they are the panels: a `Tabs.Content`
 * per step, its `value` the step's name.
 */
export type DateTimePickerStepsProps = DateTimePickerStepsOwnProps &
  Omit<
    TabsProps,
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'accent'
    | 'color'
    | 'isDisabled'
    | keyof DateTimePickerStepsOwnProps
  >

/** The day, the month and the year: the `DatePicker`'s wheel, keeping the time. */
export type DateTimePickerDateWheelProps = DatePickerWheelProps

/** The hours and the minutes: the `TimePicker`'s wheel, keeping the day. */
export type DateTimePickerTimeWheelProps = TimePickerWheelProps

/** The step on the page, for the slots. */
export type DateTimePickerContextValue = {
  step: DateTimePickerStep
  setStep: (step: DateTimePickerStep) => void
  hourCycle: HourCycle
  locale?: string
}

/** What the field, the page and the wheels read — shared with the two other pickers. */
export type DateTimePickerFieldContextValue = WheelFieldContextValue
