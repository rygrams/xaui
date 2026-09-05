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

export type CheckboxSlot = 'root' | 'indicator' | 'fill' | 'check' | 'dash' | 'label'

/**
 * Three of the `Input`'s four levels, and they mean here what they mean there — this is
 * the `field*` family again, on a box 24pt wide instead of a field 48pt tall.
 *
 * - **`primary`** — the `fieldBackground` fill plus the theme's `field` shadow. HeroUI's
 *   `primary`, with the elevation their flat token only implies.
 * - **`secondary`** — the neutral `default` fill, and the default here for the reason it
 *   is the `Input`'s: on a plain background a white box is its border and nothing else,
 *   while on a card `fieldBackground` *is* the card's own colour.
 * - **`tertiary`** — the border alone, no fill.
 *
 * **`ghost` is absent**, where the `Input` has it: a field with no border is still a line
 * of text you can see, and a checkbox with no border and no fill is nothing at all.
 *
 * A variant describes the box **at rest**. What it looks like once ticked is the accent
 * for all three — or `color`, which is the point of the `bgSelected` role.
 */
export type CheckboxVariant = 'primary' | 'secondary' | 'tertiary'

/**
 * Three of the four, and `xs` is the one missing. That box was 16 points square with a
 * 1.5pt stroke — a tick drawn in a space that small stops reading as a tick, and the touch
 * target is already the row rather than the box, so shrinking the box buys nothing a
 * caller can press. `sm` is the compact size.
 */
export type CheckboxSize = Exclude<Size, 'xs'>

type CheckboxOwnProps = {
  variant?: CheckboxVariant
  /** The box, the glyph inside it, the gap and the label's type. Never width. */
  size?: CheckboxSize
  /** Overrides the corner the size chose. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7). It is **the colour the box checks in**,
   * with a mark derived to read against it — the accent is only the default.
   *
   * It is ignored while `isInvalid`: an error outranks a brand colour, the same way it
   * outranks focus on the `Input`.
   */
  color?: string
  /** Controlled. Leave it out and the checkbox keeps its own state. */
  isSelected?: boolean
  /** The starting value when uncontrolled. @default false */
  defaultSelected?: boolean
  /** Fired with the new value on every tick, controlled or not. */
  onSelectedChange?: (isSelected: boolean) => void
  /**
   * Neither ticked nor empty — the state a "select all" sits in while some of its rows
   * are. The box fills as if selected and the mark is a dash; a screen reader hears
   * `mixed`, and a press resolves it to selected, which is what a browser's own
   * indeterminate checkbox does.
   *
   * It is a **display** state and does not touch `isSelected`: the caller decides when
   * the tri-state collapses, because only the caller knows what the rows say.
   */
  isIndeterminate?: boolean
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
 * The press behaviour the root forwards — `PressableFeedback`'s surface, minus the four
 * props this component owns itself. `asChild` (R12) is in there, and so is `animation`.
 */
type CheckboxBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
>

/**
 * R14 — the checkbox's own props, the pressable's, and every `ViewStyle` key neither
 * claims. `onPress` is the pressable's and still fires: composed with the tick, never
 * instead of it.
 */
export type CheckboxProps = CheckboxOwnProps &
  CheckboxBehaviourProps &
  Omit<ViewStyleProps, keyof CheckboxOwnProps>

type CheckboxIndicatorOwnProps = {
  /**
   * Replaces the built-in check — an icon set's glyph, a dash, anything. It is rendered
   * inside the fill, so it appears and disappears with it.
   */
  children?: ReactNode
  /** `false` shows the mark without the fade and the scale. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type CheckboxIndicatorProps = CheckboxIndicatorOwnProps &
  Omit<ViewProps, keyof CheckboxIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof CheckboxIndicatorOwnProps | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type CheckboxLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/**
 * R5 — resolved styles, not props for a slot to resolve a second time, plus the two
 * values a slot cannot compute: whether the box is ticked, and whether it may be.
 */
export type CheckboxContextValue = {
  indicatorStyle: StyleProp<ViewStyle>
  /** Laid over the box while selected, and the node the mark sits in. */
  fillStyle: StyleProp<ViewStyle>
  checkStyle: StyleProp<ViewStyle>
  /** The mark of the third state — one bar where the check has two. */
  dashStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  isSelected: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  isInvalid: boolean
}
