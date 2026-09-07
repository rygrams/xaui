import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewStyle,
} from 'react-native'
import type { BottomSheetProps } from '../bottom-sheet'
import type { CalendarVariant } from '../calendar'
import type { RangeCalendarProps } from '../range-calendar'
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { DateRange } from '../../utils/date-range'
import type { WeekDay } from '../../utils/dates'

/** The `Select`'s four field levels, because the trigger **is** a select's trigger. */
export type DateRangePickerVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type DateRangePickerSize = Extract<Size, 'sm' | 'md' | 'lg'>

type DateRangePickerOwnProps = {
  /** Dresses the **field**. `calendarVariant` dresses the month. */
  variant?: DateRangePickerVariant
  size?: DateRangePickerSize
  radius?: RadiusKey
  color?: string
  /** The month's own level. A `ghost` field over a `primary` month is the ordinary case. */
  calendarVariant?: CalendarVariant
  /** The period chosen. Controlled — leave it out and the picker holds its own. */
  value?: DateRange
  defaultValue?: DateRange
  onValueChange?: (value: DateRange) => void
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  minValue?: Date
  maxValue?: Date
  firstDayOfWeek?: WeekDay
  locale?: string
  /** How each end reads in the field. @default `{ dateStyle: 'medium' }` */
  formatOptions?: Intl.DateTimeFormatOptions
  /** What is written between the two ends in the field. @default `' – '` */
  separator?: string
  /**
   * Whether closing the **second** end closes the sheet.
   *
   * The first never does: a period is two decisions, and a sheet that shut after the first
   * would make the second one a second opening.
   *
   * @default true
   */
  closeOnSelect?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  children?: ReactNode
}

/** The root renders no node, so it carries no style and no ref — the trigger does. */
export type DateRangePickerProps = DateRangePickerOwnProps

/** R14 — the trigger renders a `PressableFeedback`, so it carries that node's props. */
export type DateRangePickerTriggerProps = Omit<
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
export type DateRangePickerValueProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
    /** What the field says with no period chosen. */
    placeholder?: string
  }

/** The sheet's own props, less the three the picker drives. */
export type DateRangePickerSheetProps = Omit<
  BottomSheetProps,
  'isOpen' | 'defaultOpen' | 'onOpenChange'
> & {
  /** The month's two arrows, as on the `Calendar` itself. */
  previousLabel?: string
  nextLabel?: string
}

/** The `RangeCalendar`'s props, less the ones the picker drives. */
export type DateRangePickerCalendarProps = Omit<
  RangeCalendarProps,
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'locale'
  | 'minValue'
  | 'maxValue'
  | 'firstDayOfWeek'
  | 'children'
> & { previousLabel?: string; nextLabel?: string }

/** R5 — the field's resolved styles, and the period. */
export type DateRangePickerContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  triggerPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  /** Values, not a style — an indicator is an `Icon`, which takes props. */
  glyph: { size: number | undefined; color: string | undefined }

  value: DateRange
  /** What the field reads, or `undefined` while there is no start yet. */
  text: string | undefined
  onPickRange: (range: DateRange) => void

  /** Passed straight through to the `RangeCalendar`. */
  calendar: {
    variant: CalendarVariant | undefined
    size: DateRangePickerSize
    color: string | undefined
    minValue: Date | undefined
    maxValue: Date | undefined
    firstDayOfWeek: WeekDay | undefined
    locale: string | undefined
  }

  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  toggle: () => void
  isDisabled: boolean
  isInvalid: boolean
}
