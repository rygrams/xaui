import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IconContextValue } from '../../system/icon'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { WeekDay } from '../../utils/dates'
import type { CalendarProps, CalendarVariant } from '../calendar'
import type { SelectAnchor, SelectContentProps } from '../select/select.type'

/** Two slots of its own; the rest is the `Select`'s field and the `Calendar`'s grid. */
export type DatePickerSlot = 'field'

/** The field's four levels, because the trigger **is** a field — the `Select`'s exactly. */
export type DatePickerVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type DatePickerSize = Exclude<Size, 'xs'>

export type DatePickerAnchor = SelectAnchor

type DatePickerOwnProps = {
  variant?: DatePickerVariant
  size?: DatePickerSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. The field, and the chosen day. */
  color?: string
  /**
   * The calendar's own emphasis, which is **not** the field's. A `ghost` field over a
   * `primary` calendar is the ordinary case: the trigger is quiet on the form and the
   * chosen day is not.
   */
  calendarVariant?: CalendarVariant
  /** The chosen day. Controlled — leave it out and the picker holds its own. */
  value?: Date
  defaultValue?: Date
  onValueChange?: (value: Date) => void
  /** Controlled open state. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  minValue?: Date
  maxValue?: Date
  firstDayOfWeek?: WeekDay
  locale?: string
  /**
   * How the field reads the chosen day. Anything `Intl.DateTimeFormat` takes.
   * @default { dateStyle: 'medium' }
   */
  formatOptions?: Intl.DateTimeFormatOptions
  /**
   * Whether choosing a day closes the panel. On by default: a picker whose only job is one
   * date has been answered the moment a day is pressed, and a panel that stayed open would
   * need a second control to say so. Off for a picker inside a form that confirms.
   */
  closeOnSelect?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  children?: ReactNode
}

/**
 * The root renders **no node**, like the `Select`'s. It is state and resolved style around
 * a trigger and a panel, which is why `ref`, `style`, `testID`, the a11y props and R14's
 * style props are all on `DatePicker.Trigger`.
 */
export type DatePickerProps = DatePickerOwnProps

export type DatePickerTriggerProps = {
  children?: ReactNode
  asChild?: boolean
} & Omit<PressableProps, 'children'> &
  ViewStyleProps

type DatePickerValueOwnProps = { children?: ReactNode; placeholder?: string }

export type DatePickerValueProps = DatePickerValueOwnProps &
  Omit<TextProps, keyof DatePickerValueOwnProps> &
  Omit<TextStyleProps, keyof DatePickerValueOwnProps | keyof TextProps>

export type DatePickerOverlayProps = ViewProps &
  ViewStyleProps & { isDismissable?: boolean }

/** The panel's placement props are the `Select`'s — it is the same anchored surface. */
export type DatePickerContentProps = SelectContentProps

/**
 * The grid inside the panel. Everything the `Calendar` takes except the props the picker
 * already owns: it is bound to the picker's value, its bounds and its locale, and a second
 * source for any of those is two answers to one question.
 */
export type DatePickerCalendarProps = Omit<
  CalendarProps,
  | 'value'
  | 'defaultValue'
  | 'onValueChange'
  | 'minValue'
  | 'maxValue'
  | 'firstDayOfWeek'
  | 'locale'
  | 'variant'
  | 'isDisabled'
>

/** R5 — resolved style ids and the state the slots read. */
export type DatePickerContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  triggerPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  overlayStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  fieldStyle: StyleProp<ViewStyle>
  glyph: IconContextValue
  value: Date | undefined
  /** The chosen day as the field reads it, or `undefined` while none is. */
  label: string | undefined
  isOpen: boolean
  isDisabled: boolean
  isInvalid: boolean
  open: () => void
  close: () => void
  toggle: () => void
  select: (value: Date) => void
  /** What `DatePicker.Calendar` binds itself to. */
  calendar: {
    variant: CalendarVariant | undefined
    size: DatePickerSize
    color: string | undefined
    minValue: Date | undefined
    maxValue: Date | undefined
    firstDayOfWeek: WeekDay | undefined
    locale: string | undefined
  }
  anchor: DatePickerAnchor | null
  setAnchor: (anchor: DatePickerAnchor) => void
}
