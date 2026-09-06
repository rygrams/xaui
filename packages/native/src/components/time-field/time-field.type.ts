import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'
import type { FieldGroupSuffixProps } from '../field-group'
import type { TextFieldProps } from '../text-field'
import type {
  DayPeriod,
  HourCycle,
  TimeGranularity,
  TimeLabels,
} from '../../utils/time-mask'

type TimeFieldOwnProps = {
  /**
   * The time shown. Present means controlled — the field follows it, and `onValueChange` is
   * how it asks for a new one.
   *
   * A `Date`, like everything else in this library that carries a moment: a time on its own
   * still lands on a day, and keeping the type lets a `DateField`'s value pass straight
   * through. The day is the one already held, or today's when there is none.
   */
  value?: Date | null
  /** Where an uncontrolled field starts. */
  defaultValue?: Date | null
  /** Every edit, with the time the field now holds — or `null` while it is not one yet. */
  onValueChange?: (value: Date | null) => void
  /** How far down the time is written. @default 'minute' */
  granularity?: TimeGranularity
  /** Twelve hours and a period beside them, or twenty-four. Unset, it is `locale`'s. */
  hourCycle?: HourCycle
  /** The hour cycle comes from here when it is not given. @default 'en-US' */
  locale?: string
  /**
   * What the placeholder calls each part — `{ hours: 'HH', minutes: 'mm', seconds: 'ss' }`.
   *
   * The letters are a language's and this library does not pick one, so the default is the
   * one code is written in. A `placeholder` on the field wins over it.
   */
  timeLabels?: TimeLabels
  /** What `TimeField.Period` says. @default `{ am: 'AM', pm: 'PM' }` */
  periodLabels?: Record<DayPeriod, string>
  children?: ReactNode
}

/**
 * The `TextField`'s root props, plus what a time adds.
 *
 * Everything the `TextField` understands is here because the root below **is** the
 * `TextField`'s.
 */
export type TimeFieldProps = TimeFieldOwnProps &
  Omit<TextFieldProps, keyof TimeFieldOwnProps>

/**
 * `TextField.Field`'s props, less the four the mask owns — the same four `DateField.Field`
 * takes over, for the same reasons.
 */
export type TimeFieldFieldProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText' | 'keyboardType' | 'maxLength'
> &
  Omit<TextStyleProps, keyof TextInputProps>

/** R14 — it renders a `FieldGroup.Suffix`, so it carries that node's props. */
export type TimeFieldPeriodProps = Omit<FieldGroupSuffixProps, 'children'> & {
  /** What a screen reader says. There is no default, for the reason the arrows have none. */
  accessibilityLabel?: string
}

/** R5 — what the slots need, decided once on the root. */
export type TimeFieldContextValue = {
  /** What is in the box, masked. */
  text: string
  /** A reader's keystroke, on its way through the mask. */
  onType: (input: string) => void
  /** The shape being asked for, when the caller gave the field no placeholder of its own. */
  placeholder: string
  /** How long a finished time is, so the field can stop the caret at its end. */
  length: number
  /** Which half of the day, and how it is written. Meaningless on a twenty-four-hour field. */
  period: DayPeriod
  periodLabels: Record<DayPeriod, string>
  onPeriodChange: (period: DayPeriod) => void
  /** Whether there is a period at all — `TimeField.Period` renders nothing without one. */
  hasPeriod: boolean
}
