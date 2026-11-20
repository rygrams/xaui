import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type {
  IconContextValue,
  IconProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

/**
 * `face` is the accent the whole box fills with once the slide has counted. `labelDone`
 * and `thumbDone` carry only the colours the label and the thumb turn to then — the same
 * nodes, painted for the filled box, so a raw `color` follows them through the tint pass.
 */
export type SlideButtonSlot =
  | 'root'
  | 'face'
  | 'fill'
  | 'label'
  | 'labelDone'
  | 'thumb'
  | 'thumbDone'
  | 'glyph'
  | 'check'

export type SlideButtonSize = TramSize

type SlideButtonOwnProps = {
  children?: ReactNode
  /** The box's height, the thumb and the label's type. Never a width. */
  size?: SlideButtonSize
  /**
   * Overrides the corner of the box and the thumb. The scale is the theme's, capped at the
   * Tram corner — `full` included, so the box never becomes Native's pill.
   */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for a slide that is not in the
   * theme's accent: the thumb, the trail and the box once confirmed. `color` wins when
   * both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token. It lands where the accent does: the thumb, the
   * trail and the filled box. The line at rest stays the page's ink.
   */
  color?: string
  /**
   * How far along the track the thumb has to reach for the slide to count, from 0 to 1.
   * Below it the thumb springs home on release.
   * @default 0.9
   */
  threshold?: number
  /** Controlled: `true` pins the thumb at the end and fills the box, `false` re-arms it. */
  isConfirmed?: boolean
  /** The starting state when uncontrolled. Once confirmed it stays confirmed. @default false */
  defaultConfirmed?: boolean
  /** Fires once, when the thumb is let go past `threshold` — the action the slide guards. */
  onConfirm?: () => void
  /** Greys the line, the thumb and the label, and stops the drag. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
}

/**
 * The Native `SlideButton`'s props, with the Tram vocabulary: `accent` added beside
 * `color`, `size` on the three Tram steps, `radius` capped at the Tram corner — and no
 * `variant`: there is one drawing, a line around the box and a block of the accent in it.
 */
export type SlideButtonProps = SlideButtonOwnProps &
  Omit<ViewProps, keyof SlideButtonOwnProps> &
  Omit<ViewStyleProps, keyof SlideButtonOwnProps | keyof ViewProps>

export type SlideButtonFillProps = Omit<ViewProps, 'children'> &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: never }

export type SlideButtonLabelProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

type SlideButtonThumbOwnProps = {
  /** Replaces the built-in chevron and check — an `Icon`, or anything else. */
  children?: ReactNode
}

export type SlideButtonThumbProps = SlideButtonThumbOwnProps &
  Omit<ViewProps, keyof SlideButtonThumbOwnProps> &
  Omit<ViewStyleProps, keyof SlideButtonThumbOwnProps | keyof ViewProps>

/** `size` and `color` default to the thumb's; passing either wins. */
export type SlideButtonIconProps = IconProps

/** The colours the animated slots move between, read off the resolved styles. */
export type SlideButtonInks = {
  label: string
  labelDone: string
  thumb: string
  thumbDone: string
}

/**
 * Resolved styles, the state the slots read, and the numbers they move by. The fill, the
 * label and the thumb are views driven by the same two values, so those are the root's.
 */
export type SlideButtonContextValue = {
  fillStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  thumbStyle: StyleProp<ViewStyle>
  /** The built-in chevron, in the colour that reads on the accent. */
  glyphStyle: StyleProp<ViewStyle>
  /** The check the thumb shows once the slide has counted, in the accent. */
  checkStyle: StyleProp<ViewStyle>
  inks: SlideButtonInks
  /**
   * Values, not a style: `Icon` hands them to a third-party component. The colour is the
   * thumb's at rest; once confirmed the mark is `inks.thumb`, the accent.
   */
  icon: IconContextValue
  /** The thumb's offset from its resting place, in points, driven on the UI thread. */
  offset: SharedValue<number>
  /** 0 at rest, 1 once confirmed: how far the box has filled with the accent. */
  done: SharedValue<number>
  /** How far the thumb can travel — the inside of the line less the thumb and its insets. */
  travel: number
  /** The thumb's width, the amount the travel is shortened by. */
  thumbSize: number
  /** From the inside of the line to the thumb. */
  inset: number
  /** The fraction of `travel` the thumb must reach for the slide to count, from 0 to 1. */
  threshold: number
  isDisabled: boolean
  isConfirmed: boolean
  /** `true` under an ancestor's `disable-all`: the thumb is placed, not sprung. */
  isStill: boolean
  /** How far past the thumb a touch may land, to reach the touch target. */
  reach: { horizontal: number; vertical: number }
  /** Called once the finger is down on the thumb. */
  grab: () => void
  /** Called once the finger lifts from a drag — with whether it reached `threshold`. */
  release: (reached: boolean) => void
  /** Confirms the slide — what the screen reader's action and the Enter key call. */
  confirm: () => void
  /** The box's measured width, inside its line. Zero until it has been laid out. */
  trackLength: number
}
