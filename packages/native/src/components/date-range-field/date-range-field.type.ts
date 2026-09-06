import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'
import type { TextFieldProps } from '../text-field'
import type { DateOrder, SegmentLabels } from '../../utils/date-mask'
import type { DateRange } from '../../utils/date-range-mask'

/**
 * The value this field carries, surfaced through the component's own types.
 *
 * `utils/` is private (§2 bis) — the arithmetic lives there and nothing is re-exported from
 * it — but the *shape a caller holds* is part of this component's API, so it is named here
 * and this is the file the barrel takes it from.
 */
export type { DateRange }

type DateRangeFieldOwnProps = {
  /** The range shown. Present means controlled. */
  value?: DateRange
  /** Where an uncontrolled field starts. */
  defaultValue?: DateRange
  /**
   * Every edit, with the range the field now holds.
   *
   * **The two ends are reported independently.** A reader who has finished the start and is
   * halfway through the end has a start, and a caller filtering a list can use it straight
   * away — waiting for both would make the field feel inert until its last digit.
   */
  onValueChange?: (value: DateRange) => void
  /** Which part is typed first. Unset, it is read out of `locale`. */
  order?: DateOrder
  /** The order and the separator come from here when neither is given. @default 'en-US' */
  locale?: string
  /** Between a date's own parts. Unset, it is the one that locale writes. */
  separator?: string
  /** What the placeholder calls each part. @default `DD` / `MM` / `YYYY` */
  segmentLabels?: SegmentLabels
  children?: ReactNode
}

/** The `TextField`'s root props, plus what a range adds. */
export type DateRangeFieldProps = DateRangeFieldOwnProps &
  Omit<TextFieldProps, keyof DateRangeFieldOwnProps>

/** `TextField.Field`'s props, less the four the mask owns. */
export type DateRangeFieldFieldProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText' | 'keyboardType' | 'maxLength'
> &
  Omit<TextStyleProps, keyof TextInputProps>

/** R5 — what the field needs, decided once on the root. */
export type DateRangeFieldContextValue = {
  text: string
  onType: (input: string) => void
  placeholder: string
  /** How long a finished range is, so the field can stop the caret at its end. */
  length: number
}
