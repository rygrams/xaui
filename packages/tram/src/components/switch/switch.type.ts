import type { ReactNode } from 'react'
import type {
  PressableStateCallbackType,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  AnimationProp,
  PressableFeedbackProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'
import type { TravelGeometry } from './switch.travel'

export type SwitchSlot = 'root' | 'track' | 'fill' | 'thumb' | 'block' | 'label'

export type SwitchSize = TramSize

type SwitchOwnProps = {
  /** The track, the thumb, the gap and the label's type. `lg` is Windows Phone's. */
  size?: SwitchSize
  /** Overrides the corner of the track and the thumb. The scale stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for a switch that is not in the
   * theme's accent. It is the colour the track fills with; `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the colour the track fills with once the switch
   * is on. The line and the thumb stay the page's ink.
   */
  color?: string
  /** Controlled. Leave it out and the switch keeps its own state. */
  isSelected?: boolean
  /** The starting value when uncontrolled. @default false */
  defaultSelected?: boolean
  /** Fired with the new value on every flip — a tap or a drag let go past the half. */
  onSelectedChange?: (isSelected: boolean) => void
  /** Greys the track, the thumb and the label, and stops the press and the drag. */
  isDisabled?: boolean
  /**
   * `false` keeps the thumb its full size under the finger; `'disable-all'` also places
   * it with no slide, here and in everything below.
   */
  animation?: AnimationProp
  /** `Pressable`'s function form as much as an object or an array. */
  style?:
    | StyleProp<ViewStyle>
    | ((state: PressableStateCallbackType) => StyleProp<ViewStyle>)
  children?: ReactNode
}

type SwitchBehaviourProps = Omit<
  PressableFeedbackProps,
  'isPressed' | 'isDisabled' | 'style' | 'children' | 'animation'
>

/**
 * The switch's own props, the press behaviour it forwards, and every `ViewStyle` key its
 * vocabulary does not claim — the Native `Switch`'s three terms.
 *
 * **No `variant`**, where Native has two: its `primary` and `secondary` are two shapes of
 * the same control, and the Metro switch has one.
 */
export type SwitchProps = SwitchOwnProps &
  SwitchBehaviourProps &
  Omit<ViewStyleProps, keyof SwitchOwnProps>

type SwitchTrackOwnProps = {
  /** The thumb, and anything else the caller lays over the track. */
  children?: ReactNode
  /** `false` fills the track at the flip instead of following the thumb. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type SwitchTrackProps = SwitchTrackOwnProps &
  Omit<ViewProps, keyof SwitchTrackOwnProps> &
  Omit<ViewStyleProps, keyof SwitchTrackOwnProps | keyof ViewProps>

type SwitchThumbOwnProps = {
  /** A glyph on the thumb. It travels with it. */
  children?: ReactNode
  /** `false` puts the thumb at its end of the track with no slide. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type SwitchThumbProps = SwitchThumbOwnProps &
  Omit<ViewProps, keyof SwitchThumbOwnProps> &
  Omit<ViewStyleProps, keyof SwitchThumbOwnProps | keyof ViewProps>

export type SwitchLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & {
    children?: ReactNode
  }

type SwitchStateOwnProps = {
  /** What the row reads while the switch is on. */
  on: ReactNode
  /** What it reads while the switch is off. */
  off: ReactNode
}

/**
 * A slot Native does not have: the Metro switch writes its state out, in large, at the
 * start of the row. It takes the two texts rather than children, since which one shows
 * is the switch's to say.
 */
export type SwitchStateProps = Omit<TextProps, 'children'> &
  Omit<TextStyleProps, keyof TextProps> &
  SwitchStateOwnProps

/**
 * Resolved styles, and what the slots animate from. The thumb and the fill are two views
 * moved by one number, so that number is the root's and both read it.
 */
export type SwitchContextValue = {
  trackStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  thumbStyle: StyleProp<ViewStyle>
  /** The ink inside the thumb's cut-out — what `Switch.Thumb` draws its children on. */
  blockStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  /** A value, not a style: the travel is computed in worklets. */
  geometry: TravelGeometry
  /** The thumb's place along its travel, 0 to 1 — animated, and written by the drag. */
  progress: SharedValue<number>
  /** The thumb's vertical scale: 1, or less while it is held. */
  squash: SharedValue<number>
  /** How far past the track a drag may start, to reach the touch target. */
  dragReach: number
  onDragStart: () => void
  /** Called when the thumb is let go, with the state it was let go on. */
  onDragEnd: (isSelected: boolean) => void
  isSelected: boolean
  isDisabled: boolean
}
