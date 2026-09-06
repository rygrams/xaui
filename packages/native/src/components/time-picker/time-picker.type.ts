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
import type { PressableFeedbackProps } from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { DayPeriod, HourCycle } from '../../utils/time-mask'

export type TimePickerSlot =
  | 'dial'
  | 'face'
  | 'mark'
  | 'markSelected'
  | 'markLabel'
  | 'markLabelSelected'
  | 'hand'
  | 'hub'
  | 'display'
  | 'unit'
  | 'unitSelected'
  | 'colon'
  | 'periods'
  | 'period'
  | 'periodSelected'

/** The `Select`'s four field levels, because the trigger **is** a select's trigger. */
export type TimePickerVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type TimePickerSize = Extract<Size, 'sm' | 'md' | 'lg'>

/** Which part of the time the dial is currently showing. */
export type TimePickerUnit = 'hour' | 'minute'

type TimePickerOwnProps = {
  /** Dresses the **field**. The dial is not a field and takes the theme's own colours. */
  variant?: TimePickerVariant
  /** The field's height and the dial's box. */
  size?: TimePickerSize
  /** The field's corner. */
  radius?: RadiusKey
  /** A raw tint (R7). It lands on the chosen mark, the hand and the hub. */
  color?: string
  /** The time chosen. Controlled — leave it out and the picker holds its own. */
  value?: Date
  /** The time chosen at first mount. */
  defaultValue?: Date
  onValueChange?: (value: Date) => void
  /** Whether the sheet is open. Present means controlled. */
  isOpen?: boolean
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  /** Twelve hours and a period, or twenty-four. Unset, it is `locale`'s. */
  hourCycle?: HourCycle
  /** How coarse the minute ring is, in minutes. @default 1 */
  minuteStep?: number
  /** The hour cycle and the field's text come from here. @default the device's */
  locale?: string
  /** How the field reads the time. @default `{ timeStyle: 'short' }` */
  formatOptions?: Intl.DateTimeFormatOptions
  /** Whether choosing the minutes closes the sheet. @default true */
  closeOnSelect?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  children?: ReactNode
}

/** The root renders no node, so it carries no style and no ref — the trigger does. */
export type TimePickerProps = TimePickerOwnProps

/** R14 — the trigger renders a `PressableFeedback`, so it carries that node's props. */
export type TimePickerTriggerProps = Omit<
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
export type TimePickerTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

export type TimePickerValueProps = TimePickerTextProps & {
  /** What the field says with no time chosen. */
  placeholder?: string
}

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type TimePickerViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** The sheet's own props, less the three the picker drives. */
export type TimePickerSheetProps = Omit<
  BottomSheetProps,
  'isOpen' | 'defaultOpen' | 'onOpenChange'
>

/** R5 — resolved styles and the state the slots cannot work out on their own. */
export type TimePickerContextValue = {
  triggerStyle: StyleProp<ViewStyle>
  triggerPressedStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  placeholderStyle: StyleProp<TextStyle>
  indicatorStyle: StyleProp<ViewStyle>
  /** Values, not a style — an indicator is an `Icon`, which takes props. */
  glyph: { size: number | undefined; color: string | undefined }

  dialStyle: StyleProp<ViewStyle>
  faceStyle: StyleProp<ViewStyle>
  markStyle: StyleProp<ViewStyle>
  markSelectedStyle: StyleProp<ViewStyle>
  markLabelStyle: StyleProp<TextStyle>
  markLabelSelectedStyle: StyleProp<TextStyle>
  handStyle: StyleProp<ViewStyle>
  hubStyle: StyleProp<ViewStyle>
  displayStyle: StyleProp<ViewStyle>
  unitStyle: StyleProp<TextStyle>
  unitSelectedStyle: StyleProp<TextStyle>
  colonStyle: StyleProp<TextStyle>
  periodsStyle: StyleProp<ViewStyle>
  periodStyle: StyleProp<ViewStyle>
  periodSelectedStyle: StyleProp<ViewStyle>

  /** Values, not styles: the dial is drawn from arithmetic and needs the numbers. */
  dial: { box: number; ring: number; mark: number; innerRing: number }

  value: Date | undefined
  /** The hours as the dial shows them — 1–12 with a period, or 0–23. */
  hours: number
  minutes: number
  period: DayPeriod
  hourCycle: HourCycle
  minuteStep: number
  /** Which ring is on screen, and how the display switches it. */
  unit: TimePickerUnit
  setUnit: (unit: TimePickerUnit) => void
  /** A mark pressed on the dial. */
  onPickHour: (hour: number) => void
  onPickMinute: (minute: number) => void
  onPeriodChange: (period: DayPeriod) => void
  /** The text the field reads. */
  text: string | undefined
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
  toggle: () => void
  isDisabled: boolean
  isInvalid: boolean
}
