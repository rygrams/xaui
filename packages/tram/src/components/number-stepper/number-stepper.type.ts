import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { AccentDrawing } from '../../system/accent-paint'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type NumberStepperSlot = 'root' | 'track' | 'value' | 'button' | 'glyph'

/**
 * How the two keys are drawn — the `Button`'s four drawings, where Native names four
 * emphasis levels: `outline` (the default, a line of the accent's ink), `contained` (the
 * accent, filled), `flat` (its soft slice) and `text` (the bare mark).
 */
export type NumberStepperVariant = AccentDrawing

export type NumberStepperSize = TramSize

type NumberStepperOwnProps = {
  /**
   * The number shown. Present means controlled — the stepper follows it, and
   * `onValueChange` is how it asks for a new one. `null` is a stepper with nothing set.
   */
  value?: number | null
  /** Where an uncontrolled stepper starts. */
  defaultValue?: number | null
  /** Every press that moves the value, with the number it now holds. */
  onValueChange?: (value: number | null) => void
  /** The floor. Unset, it runs down as far as it is pressed. */
  min?: number
  /** The ceiling. */
  max?: number
  /** How far one press moves the value. @default 1 */
  step?: number
  /** How the value is written — a unit, a currency, a fixed number of decimals. */
  formatOptions?: Intl.NumberFormatOptions
  /** Which characters group and separate the number. @default 'en-US' */
  locale?: string
  variant?: NumberStepperVariant
  /** The keys' side — 32, 40, 48 — the gaps and the type. Never width. */
  size?: NumberStepperSize
  /** Overrides the keys' corner. Every key stays within 2. */
  radius?: RadiusKey
  /** One of the twenty named accents, for a stepper that is not in the theme's. */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`. */
  color?: string
  isDisabled?: boolean
  /** Merge into the single child instead of rendering a `View`. */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** Its own props, the wrapper `View`'s, and every `ViewStyle` key neither claims. */
export type NumberStepperProps = NumberStepperOwnProps &
  Omit<ViewProps, keyof NumberStepperOwnProps> &
  Omit<ViewStyleProps, keyof NumberStepperOwnProps | keyof ViewProps>

/** It renders a `View`, so it carries that node's style keys as props. */
export type NumberStepperTrackProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

type NumberStepperValueOwnProps = {
  /**
   * Given the number the stepper holds, so a caller can write it their own way. Without
   * one it is the value formatted, and an em dash while there is none.
   */
  children?: ReactNode | ((value: number | null) => ReactNode)
}

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type NumberStepperValueProps = NumberStepperValueOwnProps &
  Omit<TextProps, keyof NumberStepperValueOwnProps> &
  Omit<TextStyleProps, keyof NumberStepperValueOwnProps | keyof TextProps>

type NumberStepperButtonOwnProps = {
  /**
   * What a screen reader says. There is no default: a plus is not text, and the label
   * beside the stepper names the quantity rather than what pressing it does.
   */
  accessibilityLabel?: string
  /** Replaces the drawn mark — an icon of your own. */
  children?: ReactNode
}

/** It renders a pressable, so it carries that node's props. */
export type NumberStepperButtonProps = NumberStepperButtonOwnProps &
  Omit<PressableProps, 'style' | 'disabled' | keyof NumberStepperButtonOwnProps> &
  Omit<ViewStyleProps, keyof NumberStepperButtonOwnProps> & {
    style?: StyleProp<ViewStyle>
  }

/** Resolved styles and values, decided once on the root. */
export type NumberStepperContextValue = {
  /** The number it holds, for a `Value` that formats it itself. */
  value: number | null
  /** That number as the stepper writes it, or an em dash while there is none. */
  text: string
  increment: () => void
  decrement: () => void
  /** Whether that press would move the value at all. */
  canIncrement: boolean
  canDecrement: boolean
  /** The keys' side, in points: what their `hitSlop` makes up to 48. */
  side: number
  trackStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<TextStyle>
  buttonStyle: StyleProp<ViewStyle>
  /** A key with nowhere left to go: drawn as a disabled one. */
  buttonSpentStyle: StyleProp<ViewStyle>
  glyphStyle: StyleProp<ViewStyle>
  glyphSpentStyle: StyleProp<ViewStyle>
  isDisabled: boolean
}
