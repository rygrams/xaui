import type { ReactNode } from 'react'
import type { StyleProp, TextInputProps, ViewStyle } from 'react-native'
import type { TextStyleProps } from '../../system/style-props'
import type { FieldGroupPrefixProps, FieldGroupSuffixProps } from '../field-group'
import type { TextFieldProps } from '../text-field'

/** The two the `TextField` does not have: the stepper's box and the bar it draws. */
export type NumberFieldSlot = 'stepButton' | 'stepGlyph' | 'stepExhausted'

type NumberFieldOwnProps = {
  /**
   * The number shown. Present means controlled — the field follows it, and `onValueChange`
   * is how it asks for a new one. `null` is an empty field.
   */
  value?: number | null
  /** Where an uncontrolled field starts. */
  defaultValue?: number | null
  /**
   * Every edit, with the number the field now holds — or `null` while what is in the box
   * is not one yet.
   *
   * **While the reader is typing it is the raw number**, bounds and all: `min={10}` and a
   * reader on their way to `15` types a `1` first, and clamping that to ten would take the
   * keyboard away from them. The bounds are applied when they leave the field, and on
   * every press of a stepper.
   */
  onValueChange?: (value: number | null) => void
  /** The floor. Unset, the field runs down as far as the reader takes it. */
  min?: number
  /** The ceiling. */
  max?: number
  /** How far one press of a stepper moves the value. @default 1 */
  step?: number
  /**
   * How the value is written when the field is **not** being typed into — a currency, a
   * unit, a fixed number of decimals. `Intl.NumberFormat`'s own options, unchanged.
   *
   * The moment the caret enters the box the value is rewritten plainly, without grouping,
   * because a reader editing `1,234.50 €` should not have to type the comma or the euro
   * sign back in.
   */
  formatOptions?: Intl.NumberFormatOptions
  /** Which characters group and separate the number, in and out. @default 'en-US' */
  locale?: string
  children?: ReactNode
}

/**
 * The `TextField`'s root props, plus what a number adds.
 *
 * Everything the `TextField` understands — `variant`, `size`, `radius`, `color`,
 * `labelPlacement`, `isInvalid`, `isDisabled`, `asChild`, the style props — is here because
 * the root below **is** the `TextField`'s.
 */
export type NumberFieldProps = NumberFieldOwnProps &
  Omit<TextFieldProps, keyof NumberFieldOwnProps>

/**
 * `TextField.Field`'s props, less the two the number owns.
 *
 * `value` and `onChangeText` are the field's own — a caller setting either would be writing
 * into the middle of the parse. **`keyboardType` stays**, unlike the `MaskField`'s: the pad
 * a number field opens is a guess from the step and the format, and a field that has to
 * take a minus sign needs a keyboard with one on it.
 */
export type NumberFieldFieldProps = Omit<
  TextInputProps,
  'editable' | 'value' | 'onChangeText'
> &
  Omit<TextStyleProps, keyof TextInputProps>

type StepButtonOwnProps = {
  /**
   * What a screen reader says. There is no default, for the reason the close button's has
   * none: a plus sign is not text, and the label beside it names the quantity rather than
   * the action.
   */
  accessibilityLabel?: string
  /** Replaces the drawn mark — an icon of your own. */
  children?: ReactNode
}

/** R14 — it renders a `FieldGroup.Prefix`, so it carries that node's props. */
export type NumberFieldDecrementProps = StepButtonOwnProps &
  Omit<FieldGroupPrefixProps, keyof StepButtonOwnProps>

/** R14 — it renders a `FieldGroup.Suffix`, so it carries that node's props. */
export type NumberFieldIncrementProps = StepButtonOwnProps &
  Omit<FieldGroupSuffixProps, keyof StepButtonOwnProps>

/** R5 — what the slots need, decided once on the root. */
export type NumberFieldContextValue = {
  /** What is in the box: the value formatted, or the reader's own characters mid-edit. */
  text: string
  /** A reader's keystroke, on its way through the parse. */
  onType: (input: string) => void
  /** The caret arrived — the value is rewritten plainly so it can be edited. */
  onEditStart: () => void
  /** The caret left — what is in the box is parsed, clamped and written out again. */
  onEditEnd: () => void
  /** The pad the shape implies, which a caller's own `keyboardType` still overrides. */
  keyboard: 'number-pad' | 'decimal-pad'
  increment: () => void
  decrement: () => void
  /** Whether that press would move the value at all. */
  canIncrement: boolean
  canDecrement: boolean
  /** R5 — the stepper's box, its bar, and the dimming for a button with nowhere to go. */
  stepButtonStyle: StyleProp<ViewStyle>
  stepGlyphStyle: StyleProp<ViewStyle>
  stepExhaustedStyle: StyleProp<ViewStyle>
}
