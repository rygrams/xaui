import type { ReactNode } from 'react'
import type { StyleProp, TextStyle, ViewProps, ViewStyle } from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramSize } from '../../theme/tram-tokens'
import type { TextFieldFieldProps, TextFieldProps } from '../text-field'

/**
 * What the `TextField` does not draw: the box that holds the field and its two steppers,
 * the field's look inside it, a stepper's cell, the rule between a cell and the value,
 * and the bar a stepper's mark is made of.
 */
export type NumberFieldSlot =
  | 'group'
  | 'groupField'
  | 'step'
  | 'press'
  | 'rule'
  | 'ruleStart'
  | 'ruleEnd'
  | 'glyph'
  | 'glyphSpent'

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
   * is not one yet. While the reader types it is the raw number; the bounds land when
   * they leave the field, and on every press of a stepper.
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
   */
  formatOptions?: Intl.NumberFormatOptions
  /** Which characters group and separate the number, in and out. @default 'en-US' */
  locale?: string
  children?: ReactNode
}

/**
 * The Tram `TextField`'s root props, plus what a number adds — Native's arrangement. No
 * `variant`, because the Tram `TextField` has none: the Metro box has one drawing.
 */
export type NumberFieldProps = NumberFieldOwnProps &
  Omit<TextFieldProps, keyof NumberFieldOwnProps>

/** `TextField.Field`'s props, less the two the number owns. `keyboardType` stays. */
export type NumberFieldFieldProps = Omit<
  TextFieldFieldProps,
  'value' | 'defaultValue' | 'onChangeText'
>

type ViewSlotProps = Omit<ViewProps, 'children'> &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/**
 * The box: one line around the field and its two steppers. Native lays its steppers over
 * the field with `FieldGroup`, which Tram does not have; this is the same arrangement,
 * drawn once.
 */
export type NumberFieldGroupProps = ViewSlotProps

type StepButtonOwnProps = {
  /**
   * What a screen reader says. There is no default: a plus is not text, and the label
   * above the field names the quantity rather than what pressing it does.
   */
  accessibilityLabel?: string
  /** Replaces the drawn mark — an icon of your own. */
  children?: ReactNode
}

/** The cell's own `View` props: the cell is the node a ref and a style land on. */
export type NumberFieldDecrementProps = StepButtonOwnProps &
  Omit<ViewSlotProps, keyof StepButtonOwnProps>

export type NumberFieldIncrementProps = NumberFieldDecrementProps

/** R5 — what the slots need, decided once on the root. */
export type NumberFieldContextValue = {
  /** What is in the box: the value formatted, or the reader's own characters mid-edit. */
  text: string
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
  /** The width of a stepper's cell, for the touch target. */
  cell: number
  groupStyle: StyleProp<ViewStyle>
  groupFieldStyle: StyleProp<TextStyle>
  stepStyle: StyleProp<ViewStyle>
  pressStyle: StyleProp<ViewStyle>
  ruleStyle: StyleProp<ViewStyle>
  ruleStartStyle: StyleProp<ViewStyle>
  ruleEndStyle: StyleProp<ViewStyle>
  glyphStyle: StyleProp<ViewStyle>
  glyphSpentStyle: StyleProp<ViewStyle>
}

/** What the box hands the field inside it: the focus its line follows. */
export type NumberFieldGroupContextValue = {
  focus: SharedValue<number>
}

export type NumberFieldSize = TramSize
