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
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'
import type { MarkGeometry } from './checkbox.mark'

export type CheckboxSlot = 'root' | 'indicator' | 'mark' | 'label'

export type CheckboxSize = TramSize

type CheckboxOwnProps = {
  /** The box, the mark inside it, the gap and the label's type. Never width. */
  size?: CheckboxSize
  /** Overrides the box's corner. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for a checkbox that is not in the
   * theme's accent. It is the colour of the mark; `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the colour of the mark. The box's line stays the
   * page's ink. Ignored while `isInvalid` — an error outranks a brand colour.
   */
  color?: string
  /** Controlled. Leave it out and the checkbox keeps its own state. */
  isSelected?: boolean
  /** The starting value when uncontrolled. @default false */
  defaultSelected?: boolean
  /** Fired with the new value on every tick, controlled or not. */
  onSelectedChange?: (isSelected: boolean) => void
  /**
   * Neither ticked nor empty — a "select all" while some of its rows are. The mark is a
   * bar, a screen reader hears `mixed`, and a press resolves it to selected. A display
   * state: it does not touch `isSelected`.
   */
  isIndeterminate?: boolean
  /** Draws the box's line and the mark in `danger`. The label keeps its ink. */
  isInvalid?: boolean
  /** Greys the box, the mark and the label, and stops the press. */
  isDisabled?: boolean
  /**
   * `false` keeps the row its full size under the finger; `'disable-all'` also places the
   * mark with no spring, here and in everything below.
   */
  animation?: AnimationProp
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type CheckboxBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
>

/**
 * The checkbox's own props, the press behaviour it forwards, and every `ViewStyle` key its
 * vocabulary does not claim — the Native `Checkbox`'s three terms.
 *
 * **No `variant`**, where Native has three: they are three fills of the box at rest, and
 * the Metro box has no fill — a line on the ground.
 */
export type CheckboxProps = CheckboxOwnProps &
  CheckboxBehaviourProps &
  Omit<ViewStyleProps, keyof CheckboxOwnProps>

type CheckboxIndicatorOwnProps = {
  /**
   * Replaces the built-in square — an icon set's glyph, anything. It arrives and leaves
   * the way the square does.
   */
  children?: ReactNode
  /** `false` shows the mark with no spring. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type CheckboxIndicatorProps = CheckboxIndicatorOwnProps &
  Omit<ViewProps, keyof CheckboxIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof CheckboxIndicatorOwnProps | keyof ViewProps>

export type CheckboxLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** Resolved styles, and the values a slot cannot compute for itself. */
export type CheckboxContextValue = {
  indicatorStyle: StyleProp<ViewStyle>
  markStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  /** A value, not a style: the bar of the third state is computed in a worklet. */
  geometry: MarkGeometry
  isSelected: boolean
  isIndeterminate: boolean
  isDisabled: boolean
  isInvalid: boolean
  /** An ancestor, or the root, asked for no animation at all. */
  isStill: boolean
}
