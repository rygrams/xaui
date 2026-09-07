import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { BottomSheetProps } from '../bottom-sheet'
import type { CalendarProps } from '../calendar'
import type { TimePickerProps } from '../time-picker'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { HourCycle } from '../../utils/time-mask'

/** The `Select`'s four field levels, because the trigger **is** a select's trigger. */
export type DateTimePickerVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type DateTimePickerSize = Extract<Size, 'sm' | 'md' | 'lg'>

/** Which half of the moment is being chosen. */
export type DateTimePickerStep = 'date' | 'time'

type DateTimePickerOwnProps = {
  /** Dresses the **field**. The calendar and the dial take their own. */
  variant?: DateTimePickerVariant
  size?: DateTimePickerSize
  radius?: RadiusKey
  /** A raw tint (R7). It reaches the chosen day and the dial's mark. */
  color?: string
  /** The moment chosen. Controlled — leave it out and the picker holds its own. */
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date) => void
  /** Whether the sheet is open. Present means controlled. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** Which half is on screen. Present means controlled. @default 'date' */
  step?: DateTimePickerStep
  defaultStep?: DateTimePickerStep
  onStepChange?: (step: DateTimePickerStep) => void
  /** Twelve hours and a period, or twenty-four. Unset, it is `locale`'s. */
  hourCycle?: HourCycle
  minuteStep?: number
  minValue?: Date
  maxValue?: Date
  /** Names the months, the weekdays and the field's text. @default the device's */
  locale?: string
  /** How the field reads the moment. @default `{ dateStyle: 'medium', timeStyle: 'short' }` */
  formatOptions?: Intl.DateTimeFormatOptions
  /** Whether choosing the minutes closes the sheet. @default true */
  closeOnSelect?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  children?: ReactNode
}

/** The root renders no node, so it carries no style and no ref — the trigger does. */
export type DateTimePickerProps = DateTimePickerOwnProps

/** R14 — the trigger renders a `PressableFeedback`, so it carries that node's props. */
export type DateTimePickerTriggerProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'style' | 'children'
> & {
  children?: ReactNode
  asChild?: boolean
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
}

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type DateTimePickerTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type DateTimePickerValueProps = DateTimePickerTextProps & {
  /** What the field says with no moment chosen. */
  placeholder?: string
}

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type DateTimePickerViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** The sheet's own props, less the three the picker drives. */
export type DateTimePickerSheetProps = Omit<
  BottomSheetProps,
  'isOpen' | 'defaultOpen' | 'onOpenChange'
> & {
  /** What the two steps are called. The words are a language's, so they are given. */
  stepLabels?: Record<DateTimePickerStep, string>
  /** The calendar's two arrows, as on the `Calendar` itself. */
  previousLabel?: string
  nextLabel?: string
}

/** The `Calendar`'s props, less the ones the picker drives. */
export type DateTimePickerCalendarProps = Omit<
  CalendarProps,
  'value' | 'onValueChange' | 'locale' | 'minValue' | 'maxValue' | 'children'
> & { previousLabel?: string; nextLabel?: string }

/** The `TimePicker`'s props, less the ones the picker drives. */
export type DateTimePickerClockProps = Omit<
  TimePickerProps,
  | 'value'
  | 'onValueChange'
  | 'locale'
  | 'hourCycle'
  | 'minuteStep'
  | 'isOpen'
  | 'children'
>

/** R5 — resolved styles for the field, and the state the slots read. */
export type DateTimePickerContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  triggerPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  /** Values, not a style — an indicator is an `Icon`, which takes props. */
  glyph: { size: number | undefined; color: string | undefined }

  value: Date | undefined
  /** The text the field reads. */
  text: string | undefined
  /** What the two steps show while the sheet is open. */
  dateText: string | undefined
  timeText: string | undefined

  step: DateTimePickerStep
  setStep: (step: DateTimePickerStep) => void
  /** A day chosen in the calendar: it keeps the time and moves to the clock. */
  onPickDate: (day: Date) => void
  /** A time chosen on the dial: it keeps the day and closes the sheet. */
  onPickTime: (moment: Date) => void

  /** Passed straight through to the two components this composes. */
  calendar: {
    variant: CalendarProps['variant']
    size: CalendarProps['size']
    color: string | undefined
    minValue: Date | undefined
    maxValue: Date | undefined
    locale: string | undefined
  }
  clock: {
    size: DateTimePickerSize
    color: string | undefined
    hourCycle: HourCycle | undefined
    minuteStep: number
    locale: string | undefined
  }

  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  toggle: () => void
  isDisabled: boolean
  isInvalid: boolean
}
