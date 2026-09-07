import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type NumberStepperSlot =
  | 'root'
  | 'track'
  | 'value'
  | 'button'
  | 'buttonGlyph'
  | 'buttonExhausted'

/**
 * The library's four emphasis levels, narrowed like the `Card`'s and the `TextField`'s
 * (§1 bis). A stepper **reports nothing** — it is a quantity being set, not a verdict — so
 * `success`, `warning` and `danger` are absent.
 *
 * What the level moves is the **pair of buttons**, because they are what a finger is aimed
 * at; the pill under them is the ground they are raised off.
 *
 * - **`primary`** — the accent, filled. The stepper is the point of the screen.
 * - **`secondary`** — the raised `surface` button on the soft pill. The default, and the
 *   one thing here that departs from the vocabulary table: `default` is the token
 *   `secondary` usually names, and a `default` button on a `defaultSoft` pill is two greys
 *   a shade apart, in which the button stops reading as raised at all.
 * - **`tertiary`** — the border alone, on the pill, no fill.
 * - **`ghost`** — neither, and no pill either. A stepper inside a list row that has its own
 *   ground.
 */
export type NumberStepperVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type NumberStepperSize = Size

type NumberStepperOwnProps = {
  /**
   * The number shown. Present means controlled — the stepper follows it, and
   * `onValueChange` is how it asks for a new one. `null` is a stepper with nothing set.
   */
  value?: number | null
  /** Where an uncontrolled stepper starts. */
  defaultValue?: number | null
  /** Every press, with the number the stepper now holds. Always inside the bounds. */
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
  /** The buttons' diameter, the pill's height, the gaps and the type. Never width. */
  size?: NumberStepperSize
  /** Overrides the circle the buttons are, and the pill's own corner. */
  radius?: RadiusKey
  /** A raw tint (R7), never a token. It lands where the variant put its tokens. */
  color?: string
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — its own props, the wrapper `View`'s, and every `ViewStyle` key neither claims. */
export type NumberStepperProps = NumberStepperOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof NumberStepperOwnProps> &
  Omit<ViewStyleProps, keyof NumberStepperOwnProps | keyof ViewProps>

/** R14 — it renders a `View`, so it carries that node's style keys as props. */
export type NumberStepperTrackProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

type NumberStepperValueOwnProps = {
  /**
   * Given the number the stepper holds, so a caller can write it their own way. Without
   * one it is the value formatted, and an em dash while there is none.
   */
  children?: ReactNode | ((value: number | null) => ReactNode)
}

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type NumberStepperValueProps = NumberStepperValueOwnProps &
  Omit<TextProps, keyof NumberStepperValueOwnProps> &
  Omit<TextStyleProps, keyof NumberStepperValueOwnProps | keyof TextProps>

type NumberStepperButtonOwnProps = {
  /**
   * What a screen reader says. There is no default, for the reason the close button's has
   * none: a plus is not text, and the label beside the stepper names the quantity rather
   * than what pressing it does.
   */
  accessibilityLabel?: string
  /**
   * Replaces the drawn mark — an icon of your own. A `Decrement` that becomes a bin at the
   * floor is this prop and a ternary, not a prop of its own.
   */
  children?: ReactNode
}

/** R14 — it renders a `PressableFeedback`, so it carries that node's props. */
export type NumberStepperButtonProps = NumberStepperButtonOwnProps &
  Omit<PressableProps, 'style' | 'disabled' | keyof NumberStepperButtonOwnProps> &
  Omit<ViewStyleProps, keyof NumberStepperButtonOwnProps> & {
    style?: StyleProp<ViewStyle>
  }

/** R5 — resolved styles and values, decided once on the root. */
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
  trackStyle: StyleProp<ViewStyle>
  valueStyle: StyleProp<ViewStyle>
  buttonStyle: StyleProp<ViewStyle>
  buttonGlyphStyle: StyleProp<ViewStyle>
  /** The dimming for a button with nowhere left to go. */
  buttonExhaustedStyle: StyleProp<ViewStyle>
  isDisabled: boolean
}
