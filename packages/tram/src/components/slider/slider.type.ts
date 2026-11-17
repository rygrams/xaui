import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { SharedValue } from 'react-native-reanimated'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { ScaleValue, ValueScale } from '../../system/value-scale'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type SliderSlot =
  | 'root'
  | 'output'
  | 'track'
  | 'rail'
  | 'fill'
  | 'thumb'
  | 'block'

/** One value, or the two ends of a range. */
export type SliderValue = ScaleValue

/** Which way the track runs. Vertical counts **from the bottom**. */
export type SliderOrientation = 'horizontal' | 'vertical'

export type SliderSize = TramSize

type SliderOwnProps = {
  children?: ReactNode
  /** The line, the thumb and the output's type. The thumb is as wide as the `Switch`'s. */
  size?: SliderSize
  orientation?: SliderOrientation
  /** Overrides the corner of the line, the fill and the thumb. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for a slider that is not in the
   * theme's accent. It is the colour of the filled part; `color` wins when both are set.
   */
  accent?: TramAccentName
  /**
   * A raw `#RRGGBB` tint, never a token: the colour of the filled part. The line stays
   * the soft grey and the thumb the page's ink.
   */
  color?: string
  /**
   * A number for one thumb, a pair for a range. The shape decides how many thumbs there
   * are, and it comes back out the same way: `[20, 60]` reports `[20, 60]`.
   */
  value?: SliderValue
  /** The starting value when uncontrolled. @default 0 */
  defaultValue?: SliderValue
  /** Fires on every step a thumb crosses, while it is dragged included. */
  onValueChange?: (value: SliderValue) => void
  /** Fires once, when the finger lifts. What a network call belongs on. */
  onValueCommit?: (value: SliderValue) => void
  /** @default 0 */
  min?: number
  /** @default 100 */
  max?: number
  /** `0` for a continuous slider. @default 1 */
  step?: number
  /** Greys the line, the fill, the thumb and the output, and stops the touch. */
  isDisabled?: boolean
  /**
   * Renders the caller's one child element as the root, with the slider's props, style
   * and ref merged into it. The slots go inside that element.
   */
  asChild?: boolean
}

/**
 * The Native `Slider`'s props, with the Tram vocabulary: `accent` added beside `color`,
 * and `size` on the three Tram steps.
 */
export type SliderProps = SliderOwnProps &
  Omit<ViewProps, keyof SliderOwnProps> &
  Omit<ViewStyleProps, keyof SliderOwnProps | keyof ViewProps>

type SliderOutputOwnProps = {
  /**
   * Given the current value, so the caller can format it. Defaults to the number, or to
   * the two ends joined by an en dash when the slider is a range.
   */
  children?: ReactNode | ((value: SliderValue) => ReactNode)
}

export type SliderOutputProps = SliderOutputOwnProps &
  Omit<TextProps, keyof SliderOutputOwnProps> &
  Omit<TextStyleProps, keyof SliderOutputOwnProps | keyof TextProps>

type SliderTrackOwnProps = {
  /** The fill and the thumbs. */
  children?: ReactNode
}

export type SliderTrackProps = SliderTrackOwnProps &
  Omit<ViewProps, keyof SliderTrackOwnProps> &
  Omit<ViewStyleProps, keyof SliderTrackOwnProps | keyof ViewProps>

/** Neither takes children — where they sit is the slider's arithmetic. */
export type SliderFillProps = Omit<ViewProps, 'children'> & ViewStyleProps

export type SliderThumbProps = Omit<ViewProps, 'children'> &
  ViewStyleProps & {
    /**
     * Which thumb this is. `0` on a plain slider, `0` and `1` on a range — written out,
     * so a range is two slots that can be seen and styled apart.
     */
    index?: number
    /** What a screen reader reads instead of the raw number. */
    accessibilityValueText?: (value: number) => string
  }

/** A thumb's two animated numbers. */
export type SliderThumbMotion = {
  /** Its place along the travel, 0 to 1 — written by the drag, and sprung to a value. */
  place: SharedValue<number>
  /** Its scale across the track: 1, or less while it is held. */
  squash: SharedValue<number>
}

/**
 * Resolved styles, the state the slots read, and what they animate from. The fill and the
 * thumbs are views moved by the same numbers, so those numbers are the root's.
 */
export type SliderContextValue = {
  outputStyle: StyleProp<TextStyle>
  trackStyle: StyleProp<ViewStyle>
  /** The line itself — `Slider.Track` is the box it is drawn in. */
  railStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  thumbStyle: StyleProp<ViewStyle>
  /** The ink inside the thumb's cut-out. */
  blockStyle: StyleProp<ViewStyle>
  orientation: SliderOrientation
  /** One entry for a plain slider, two for a range. Always on a step. */
  values: readonly number[]
  scale: ValueScale
  isDisabled: boolean
  /** `true` under an ancestor's `disable-all`: the thumb is placed, not sprung. */
  isStill: boolean
  /** The track's measured length along its own axis. Zero until it is laid out. */
  trackLength: number
  setTrackLength: (length: number) => void
  /** The thumb's length along the track: what the travel is inset by. */
  thumbLength: number
  /** The lower thumb — the only one of a plain slider — then the upper. */
  thumbs: readonly [SliderThumbMotion, SliderThumbMotion]
  /** The thumb under the finger, or -1. While held it is the drag's to place. */
  held: SharedValue<number>
  /** How far past the track a touch may land, to reach the touch target. */
  reach: number
  /** Asks for a thumb at a value; it lands on a step, and never past its neighbour. */
  moveThumb: (index: number, value: number) => void
  /** Reports the value to `onValueCommit`: the finger lifted, or a screen reader moved it. */
  commit: () => void
  /** Sends the thumbs back to the state, once no finger holds one. */
  settle: () => void
}
