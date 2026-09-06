import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'
import type { FieldGroupSuffixProps } from '../field-group'
import type { TextFieldProps } from '../text-field'
import type { DateOrder, SegmentLabels } from '../../utils/date-mask'
import type {
  DayPeriod,
  HourCycle,
  TimeGranularity,
  TimeLabels,
} from '../../utils/time-mask'

type DateTimeFieldOwnProps = {
  /** The moment shown. Present means controlled. */
  value?: Date | null
  /** Where an uncontrolled field starts. */
  defaultValue?: Date | null
  /** Every edit, with the moment the field now holds — or `null` while it is not one yet. */
  onValueChange?: (value: Date | null) => void
  /** Which date part is typed first. Unset, it is read out of `locale`. */
  order?: DateOrder
  /** Between the date's parts. Unset, it is the one that locale writes. */
  separator?: string
  /** How far down the time is written. @default 'minute' */
  granularity?: TimeGranularity
  /** Twelve hours and a period beside them, or twenty-four. Unset, it is `locale`'s. */
  hourCycle?: HourCycle
  /** The order, the separator and the cycle all come from here. @default 'en-US' */
  locale?: string
  /** What the placeholder calls each date part. @default `DD` / `MM` / `YYYY` */
  segmentLabels?: SegmentLabels
  /** And each time part. @default `HH` / `mm` / `ss` */
  timeLabels?: TimeLabels
  /** What `DateTimeField.Period` says. @default `{ am: 'AM', pm: 'PM' }` */
  periodLabels?: Record<DayPeriod, string>
  children?: ReactNode
}

/** The `TextField`'s root props, plus what a moment adds. */
export type DateTimeFieldProps = DateTimeFieldOwnProps &
  Omit<TextFieldProps, keyof DateTimeFieldOwnProps>

/** `TextField.Field`'s props, less the four the mask owns. */
export type DateTimeFieldFieldProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText' | 'keyboardType' | 'maxLength'
> &
  Omit<TextStyleProps, keyof TextInputProps>

/** R14 — it renders a `FieldGroup.Suffix`, so it carries that node's props. */
export type DateTimeFieldPeriodProps = Omit<FieldGroupSuffixProps, 'children'> & {
  /** What a screen reader says. There is no default, for the reason the arrows have none. */
  accessibilityLabel?: string
}

/** R5 — what the slots need, decided once on the root. */
export type DateTimeFieldContextValue = {
  text: string
  onType: (input: string) => void
  placeholder: string
  /** How long a finished moment is, so the field can stop the caret at its end. */
  length: number
  period: DayPeriod
  periodLabels: Record<DayPeriod, string>
  onPeriodChange: (period: DayPeriod) => void
  /** Whether there is a period at all — the slot renders nothing without one. */
  hasPeriod: boolean
}
