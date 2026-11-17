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
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type RadioSlot = 'root' | 'indicator' | 'mark' | 'label'

export type RadioSize = TramSize

type RadioOwnProps = {
  /** The circle, the dot inside it, the gap and the label's type. Never width. */
  size?: RadioSize
  /**
   * One of the twenty named accents — `accent="lime"` — for an option that is not in the
   * theme's accent. It is the colour of the dot; `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the colour of the dot. The circle's line stays
   * the page's ink. Ignored while `isInvalid` — an error outranks a brand colour.
   */
  color?: string
  /**
   * What this option stands for inside a `Radio.Group`. The group holds the chosen value;
   * this is the one the option compares it to, and the only thing that puts an option in
   * a set — nothing walks the children. Outside a group it means nothing: use
   * `isSelected`.
   */
  value?: string
  /**
   * Controlled. Leave it out and the radio keeps its own state — or, inside a
   * `Radio.Group`, takes it from the set. Given here it wins over the set.
   */
  isSelected?: boolean
  /** The starting value when uncontrolled. @default false */
  defaultSelected?: boolean
  /**
   * Fired when the option becomes the chosen one — `true` and only `true`: a press
   * selects, it never clears. Inside a group it fires beside the group's `onValueChange`.
   */
  onSelectedChange?: (isSelected: boolean) => void
  /** Draws the circle's line and the dot in `danger`. A group's still applies. */
  isInvalid?: boolean
  /** Greys the circle, the dot and the label, and stops the press. A group's applies. */
  isDisabled?: boolean
  /**
   * `false` keeps the row its full size under the finger; `'disable-all'` also places the
   * dot with no spring, here and in everything below.
   */
  animation?: AnimationProp
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type RadioBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
>

/**
 * The radio's own props, the press behaviour it forwards, and every `ViewStyle` key its
 * vocabulary does not claim — the Native `Radio`'s three terms.
 *
 * **No `variant`**, where Native has three: they are three fills of the circle at rest,
 * and the Metro circle has no fill — a line on the ground. **No `radius`** either: a
 * radio is a circle, one of the two shapes allowed past the Tram corner, and a prop that
 * could only square it off would be drawing a checkbox.
 */
export type RadioProps = RadioOwnProps &
  RadioBehaviourProps &
  Omit<ViewStyleProps, keyof RadioOwnProps>

type RadioIndicatorOwnProps = {
  /**
   * Replaces the built-in dot — an icon set's glyph, anything. It arrives and leaves the
   * way the dot does.
   */
  children?: ReactNode
  /** `false` shows the dot with no spring. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type RadioIndicatorProps = RadioIndicatorOwnProps &
  Omit<ViewProps, keyof RadioIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof RadioIndicatorOwnProps | keyof ViewProps>

export type RadioLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/** Resolved styles, and the values a slot cannot compute for itself. */
export type RadioContextValue = {
  indicatorStyle: StyleProp<ViewStyle>
  markStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  isSelected: boolean
  isDisabled: boolean
  isInvalid: boolean
  /** An ancestor, or the root, asked for no animation at all. */
  isStill: boolean
}
