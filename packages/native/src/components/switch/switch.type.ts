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

export type SwitchSlot =
  | 'root'
  | 'track'
  | 'trackSelected'
  | 'thumb'
  | 'thumbSelected'
  | 'label'

/**
 * The two shapes a switch comes in — the legacy component's `inside` and `overlap`, under
 * the library's own two names.
 *
 * - **`primary`** — the thumb rides **inside** the track, clear of its edges by the
 *   track's padding. The shape everything else in this library shares: a filled surface
 *   with something on it.
 * - **`secondary`** — the track is a thin bar and the thumb **overlaps** it, standing
 *   above and below. Less ink, and the knob reads as the thing you drag.
 *
 * It is a **geometry** axis, unusually: both take the same colours, because a switch that
 * is on is the accent either way. What changes is the track's height, the thumb's size and
 * whether the track's padding holds it in.
 */
export type SwitchVariant = 'primary' | 'secondary'

/**
 * Three of the four, the same three as the `Checkbox` and the `Radio` — `xs` is the one
 * missing. That track was 40 by 24 with an 18pt knob, and a switch is aimed at rather than
 * read: unlike those two it has no row to press, the track *is* the target. Below `sm` it
 * stops being comfortably hittable, and shrinking the one control whose whole surface is
 * the touch target buys width nobody asked for.
 */
export type SwitchSize = Exclude<Size, 'xs'>

type SwitchOwnProps = {
  variant?: SwitchVariant
  /** The track, the thumb, the gap and the label's type. */
  size?: SwitchSize
  /** Overrides the track's corner, which is `full`. The thumb stays round. */
  radius?: RadiusKey
  /**
   * A raw tint (`'#7c3aed'`), never a token (R7): the colour the track takes once the
   * switch is on, with a thumb derived to read against it. The track at rest keeps the
   * neutral it had — a switch that is off is off in every brand.
   */
  color?: string
  /** Controlled. Leave it out and the switch keeps its own state. */
  isSelected?: boolean
  /** The starting value when uncontrolled. @default false */
  defaultSelected?: boolean
  /** Fired with the new value on every flip, controlled or not. */
  onSelectedChange?: (isSelected: boolean) => void
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
type SwitchBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
>

/**
 * R14 — the switch's own props, the pressable's, and every `ViewStyle` key neither claims.
 *
 * **There is no `isInvalid`**, where the `Checkbox` and the `Radio` have one: a switch
 * applies its change the moment it is flipped, so there is no later moment at which it can
 * be wrong. A setting that cannot be turned on is `isDisabled`, with the reason written
 * beside it.
 */
export type SwitchProps = SwitchOwnProps &
  SwitchBehaviourProps &
  Omit<ViewStyleProps, keyof SwitchOwnProps>

type SwitchTrackOwnProps = {
  /** The thumb, and anything else the caller lays over the track. */
  children?: ReactNode
  /** `false` swaps the colour at the flip instead of crossing to it. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type SwitchTrackProps = SwitchTrackOwnProps &
  Omit<ViewProps, keyof SwitchTrackOwnProps> &
  Omit<ViewStyleProps, keyof SwitchTrackOwnProps | keyof ViewProps>

type SwitchThumbOwnProps = {
  /** A glyph on the knob — a check, a moon. It travels with it. */
  children?: ReactNode
  /** `false` puts the thumb at its end of the track with no slide. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type SwitchThumbProps = SwitchThumbOwnProps &
  Omit<ViewProps, keyof SwitchThumbOwnProps> &
  Omit<ViewStyleProps, keyof SwitchThumbOwnProps | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type SwitchLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

/**
 * R5 — resolved styles, plus the four things a slot cannot resolve for itself.
 *
 * The two colour pairs and the travel are **values, not styles**: a colour that is crossed
 * and a distance that is slid are interpolated on the UI thread, and a worklet needs
 * numbers and strings rather than a style object it would have to flatten every frame.
 */
export type SwitchContextValue = {
  trackStyle: StyleProp<ViewStyle>
  thumbStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  /** The track's colour off and on. The tint moves the second one. */
  track: { off: string; on: string }
  /** The thumb's colour off and on. */
  thumb: { off: string; on: string }
  /** How far the thumb travels, in points, from its resting inset to the far end. */
  travel: number
  isSelected: boolean
  isDisabled: boolean
}
