import type { ReactNode } from 'react'
import type { TextInputProps } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'
import type { TextFieldProps } from '../text-field'
import type { DateOrder, MaskFieldMask, SegmentLabels } from '../../utils/mask'

/**
 * `mask` takes a preset name or a **pattern string** — `#` a digit, `A` a letter, `*`
 * either, every other character a literal. The `& {}` keeps the four presets in
 * autocomplete without narrowing the type to them.
 */
type MaskSpec = MaskFieldMask | (string & {})

type MaskFieldOwnProps = {
  /** The shape the box is masked to. Required — there is no default shape. */
  mask: MaskSpec
  /**
   * The masked text. Present means controlled — the field follows it, and `onValueChange`
   * is how it asks for a new one. `''` is an empty field.
   */
  value?: string
  /** Where an uncontrolled field starts. Masked on the way in, so a raw string is fine. */
  defaultValue?: string
  /**
   * Every edit: the masked text, and — when `convert` is set — what it converts to, or
   * `null` while the text is not a value yet.
   *
   * Without `convert` the second argument is the masked text itself.
   */
  onValueChange?: (text: string, value: unknown) => void
  /**
   * Turns the masked text into a value of your own — a `Date`, `{ hours, minutes }`, a card
   * number. Return `null` while the text is not one yet.
   *
   * The field stays about the string; this is the one plug. `parseMaskedDate` and
   * `parseMaskedTime` are exported for the `date` and `time` shapes.
   */
  convert?: (text: string) => unknown
  /**
   * Which date part is typed first, for the `date` and `datetime` shapes. Unset, it is
   * read out of `locale`. Give it when the order is a decision — an ISO field is `YMD`.
   */
  order?: DateOrder
  /** The order and the separator come from here when neither is given. @default 'en-US' */
  locale?: string
  /** Between the date parts. Unset, it is the one the locale writes. */
  separator?: string
  /**
   * What the placeholder calls each date part — `{ day: 'JJ', month: 'MM', year: 'AAAA' }`.
   * The letters are a language's, so the default is the `DD` / `MM` / `YYYY` code is
   * written in. A `placeholder` on the field wins over it.
   */
  segmentLabels?: SegmentLabels
  children?: ReactNode
}

/**
 * The `TextField`'s root props, plus what a mask adds.
 *
 * Everything the `TextField` understands — `variant`, `size`, `radius`, `color`,
 * `labelPlacement`, `isInvalid`, `isDisabled`, `asChild`, the style props — is here because
 * the root below **is** the `TextField`'s.
 */
export type MaskFieldProps = MaskFieldOwnProps &
  Omit<TextFieldProps, keyof MaskFieldOwnProps>

/**
 * `TextField.Field`'s props, less the four the mask owns.
 *
 * `value` and `onChangeText` are the mask's — a caller setting either would be writing into
 * the middle of it. `keyboardType` follows the shape, and `maxLength` is the shape's own
 * length, past which nothing more can be typed anyway.
 */
export type MaskFieldFieldProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText' | 'keyboardType' | 'maxLength'
> &
  Omit<TextStyleProps, keyof TextInputProps>

/** R5 — what the slots need, decided once on the root. */
export type MaskFieldContextValue = {
  /** What is in the box, masked. */
  text: string
  /** A reader's keystroke, on its way through the mask. */
  onType: (input: string) => void
  /** The shape being asked for, when the field was given no placeholder of its own. */
  placeholder: string
  /** `number-pad` when the shape is all digits, `default` otherwise. */
  keyboard: 'number-pad' | 'default'
  /** The full rendered length of the shape. */
  length: number
}
