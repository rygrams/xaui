import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  AnimationProp,
  PressableFeedbackProps,
} from '../../system/pressable-feedback'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type RadioSlot = 'root' | 'indicator' | 'fill' | 'thumb' | 'label'

/**
 * The `Checkbox`'s three levels, meaning the same thing on a circle — `primary` the field
 * fill plus the field shadow, `secondary` the neutral one and the default, `tertiary` the
 * border alone. A variant describes the circle **at rest**; selected, all three are the
 * accent, or `color`.
 */
export type RadioVariant = 'primary' | 'secondary' | 'tertiary'

/**
 * Three of the four, the same three as the `Checkbox` — `xs` is the one missing. That
 * circle was 16 points across with a 7pt dot, and a target that small is read rather than
 * aimed at; the touch target is the row anyway, so shrinking the circle buys nothing a
 * caller can press. The two components pair in the same form, so they offer the same sizes
 * or a caller discovers the difference the hard way.
 */
export type RadioSize = Exclude<Size, 'xs'>

type RadioOwnProps = {
  variant?: RadioVariant
  /** The circle, the dot inside it, the gap and the label's type. Never width. */
  size?: RadioSize
  /**
   * Overrides the corner, which is `full` — a radio is a circle, and that is the one thing
   * about it a caller is unlikely to want to change. It is here because every control in
   * the library has it, and because a squared-off option in a segmented row is a real
   * design.
   */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7): the colour the option takes once it is
   * the chosen one, with a dot derived to read against it.
   *
   * Ignored while `isInvalid`, as on the `Checkbox`.
   */
  color?: string
  /** Controlled. Leave it out and the radio keeps its own state. */
  isSelected?: boolean
  /** The starting value when uncontrolled. @default false */
  defaultSelected?: boolean
  /**
   * Fired when the option becomes the chosen one — **`true` and only `true`**. Pressing a
   * selected radio changes nothing: a set of options has no "none of these" unless one of
   * them says so, which is a `Checkbox`'s job or another option's.
   */
  onSelectedChange?: (isSelected: boolean) => void
  /** Paints the border, the fill and the label in `danger`. */
  isInvalid?: boolean
  /** Dims the row and stops the press. */
  isDisabled?: boolean
  animation?: AnimationProp
  /** R9 — `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

/**
 * The press behaviour the root forwards — `PressableFeedback`'s surface, minus the props
 * this component owns itself. `asChild` (R12) is in there, and so is `animation`.
 */
type RadioBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
>

/**
 * R14 — the radio's own props, the pressable's, and every `ViewStyle` key neither claims.
 */
export type RadioProps = RadioOwnProps &
  RadioBehaviourProps &
  Omit<ViewStyleProps, keyof RadioOwnProps>

type RadioIndicatorOwnProps = {
  /** Replaces the built-in dot. It is rendered inside the fill, so it arrives with it. */
  children?: ReactNode
  /** `false` shows the dot without the fade and the scale. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type RadioIndicatorProps = RadioIndicatorOwnProps &
  Omit<ViewProps, keyof RadioIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof RadioIndicatorOwnProps | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type RadioLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/**
 * R5 — resolved styles, not props for a slot to resolve a second time, plus the value no
 * slot can compute: whether this option is the chosen one.
 */
export type RadioContextValue = {
  indicatorStyle: StyleProp<ViewStyle>
  /** Laid over the circle while selected, and the node the dot sits in. */
  fillStyle: StyleProp<ViewStyle>
  thumbStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  isSelected: boolean
  isDisabled: boolean
  isInvalid: boolean
}
