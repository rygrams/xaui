import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'
import type { BottomSheetProps } from '../bottom-sheet'
import type { CalendarProps } from '../calendar'
import type { FieldGroupSuffixProps } from '../field-group'
import type { TextFieldProps } from '../text-field'
import type { DateOrder, SegmentLabels } from '../../utils/date-mask'

type DateFieldOwnProps = {
  /**
   * The date shown. Present means controlled — the field follows it, and `onValueChange` is
   * how it asks for a new one.
   *
   * `null` is an empty field. It is not `undefined`, which is what says the caller is not
   * controlling this at all.
   */
  value?: Date | null
  /** Where an uncontrolled field starts. */
  defaultValue?: Date | null
  /**
   * Every edit, with the date the field now holds — or `null` while what is typed is not
   * one yet, and for a day that does not exist.
   */
  onValueChange?: (value: Date | null) => void
  /**
   * Which part is typed first. Unset, it is read out of `locale`.
   *
   * Give it when the order is a decision rather than a locale — an ISO field is `YMD`
   * wherever it is read.
   */
  order?: DateOrder
  /** The order and the separator come from here when neither is given. @default 'en-US' */
  locale?: string
  /** Between the parts. Unset, it is the one that locale writes. */
  separator?: string
  /**
   * What the placeholder calls each part — `{ day: 'JJ', month: 'MM', year: 'AAAA' }`.
   *
   * The letters are a language's and this library does not pick one, so the default is the
   * `DD` / `MM` / `YYYY` that code is written in. A `placeholder` on the field wins over it.
   */
  segmentLabels?: SegmentLabels
  /** Whether `DateField.Sheet` is open. Present means controlled. */
  isOpen?: boolean
  /** Whether it starts open. */
  defaultOpen?: boolean
  onOpenChange?: (isOpen: boolean) => void
  children?: ReactNode
}

/**
 * The `TextField`'s root props, plus what a date adds.
 *
 * Everything the `TextField` understands — `variant`, `size`, `radius`, `color`,
 * `labelPlacement`, `isInvalid`, `isDisabled`, `asChild`, the style props — is here because
 * the root below **is** the `TextField`'s.
 */
export type DateFieldProps = DateFieldOwnProps &
  Omit<TextFieldProps, keyof DateFieldOwnProps>

/**
 * `TextField.Field`'s props, less the four the mask owns.
 *
 * `value` and `onChangeText` are the mask's — a caller setting either would be writing into
 * the middle of it. `keyboardType` is a number pad, and `maxLength` is the shape's own
 * length, past which nothing more can be typed anyway.
 */
export type DateFieldFieldProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText' | 'keyboardType' | 'maxLength'
> &
  Omit<TextStyleProps, keyof TextInputProps>

type DateFieldTriggerOwnProps = {
  /**
   * What a screen reader says. A calendar mark is not text, and the label above the field
   * names the date rather than the action — so there is no default and a missing one warns.
   */
  accessibilityLabel?: string
  /** An `Icon` of your own. Unset draws the built-in calendar. */
  children?: ReactNode
}

/** R14 — it renders a `FieldGroup.Suffix`, so it carries that node's props. */
export type DateFieldTriggerProps = DateFieldTriggerOwnProps &
  Omit<FieldGroupSuffixProps, keyof DateFieldTriggerOwnProps>

type SheetLabels = {
  /** What a screen reader hears on the month-back arrow. The caller's, as on `Calendar`. */
  previousLabel?: string
  nextLabel?: string
}

/**
 * The `BottomSheet`'s own props, less the three the field drives — it owns the open state,
 * because the trigger beside the field is what changes it.
 */
export type DateFieldSheetProps = SheetLabels &
  Omit<BottomSheetProps, 'isOpen' | 'defaultOpen' | 'onOpenChange'>

/**
 * The `Calendar`'s own props, less the three the field drives, and less the children —
 * this slot *is* the composed month, and a caller who wants a different one writes a
 * `Calendar`.
 */
export type DateFieldSheetCalendarProps = SheetLabels &
  Omit<CalendarProps, 'value' | 'onValueChange' | 'locale' | 'children'>

/** R5 — what the slots need, decided once on the root. */
export type DateFieldContextValue = {
  /** What is in the box, masked. */
  text: string
  /** The date that text is, or `null` while it is not one. */
  value: Date | null
  /** A reader's keystroke, on its way through the mask. */
  onType: (input: string) => void
  /** A day chosen in the calendar: it fills the box and closes the sheet. */
  onPick: (value: Date) => void
  /** The shape being asked for, when the caller gave the field no placeholder of its own. */
  placeholder: string
  /** Named for the calendar in the sheet, which reads its months and weekdays from it. */
  locale: string
  isOpen: boolean
  setOpen: (isOpen: boolean) => void
}
