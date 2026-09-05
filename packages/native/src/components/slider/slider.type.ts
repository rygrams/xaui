import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'
import type { SliderValue } from './slider.utils'

export type { SliderValue } from './slider.utils'

export type SliderSlot = 'root' | 'output' | 'track' | 'fill' | 'thumb'

/**
 * Which way the rail runs. Vertical counts **from the bottom**: a rail whose fill grew
 * downwards would report a larger value the lower the knob sat, which is the opposite of
 * what a vertical control means everywhere it appears.
 */
export type SliderOrientation = 'horizontal' | 'vertical'

export type SliderSize = Exclude<Size, 'xs'>

type SliderOwnProps = {
  children?: ReactNode
  size?: SliderSize
  orientation?: SliderOrientation
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. Paints the fill and the thumb. */
  color?: string
  /**
   * A number for one thumb, a pair for a range. The shape decides how many thumbs there
   * are, and it comes back out the same way — a slider given `[20, 60]` reports
   * `[20, 60]`, never `20`.
   */
  value?: SliderValue
  defaultValue?: SliderValue
  /** Fires on every step a thumb crosses, including while it is being dragged. */
  onValueChange?: (value: SliderValue) => void
  /** Fires once, when the finger lifts. What a network call belongs on. */
  onValueCommit?: (value: SliderValue) => void
  min?: number
  max?: number
  /** Set it to `0` for a continuous slider. */
  step?: number
  isDisabled?: boolean
}

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

type SliderTrackOwnProps = { children?: ReactNode }

export type SliderTrackProps = SliderTrackOwnProps &
  Omit<ViewProps, keyof SliderTrackOwnProps> &
  Omit<ViewStyleProps, keyof SliderTrackOwnProps | keyof ViewProps>

/** Neither takes children — where they sit is the root's arithmetic. */
export type SliderFillProps = Omit<ViewProps, 'children'> & ViewStyleProps

export type SliderThumbProps = Omit<ViewProps, 'children'> &
  ViewStyleProps & {
    /**
     * Which thumb this is. `0` on a plain slider, `0` and `1` on a range — written out
     * rather than conjured by the track, so a range is two slots you can see and style
     * apart rather than one that silently became two.
     */
    index?: number
    /** What a screen reader reads instead of the raw number. */
    accessibilityValueText?: (value: number) => string
  }

/** R5 — resolved style ids and the state the slots read. */
export type SliderContextValue = {
  outputStyle: StyleProp<TextStyle>
  trackStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  thumbStyle: StyleProp<ViewStyle>
  orientation: SliderOrientation
  /** One entry for a plain slider, two for a range. Always snapped. */
  values: readonly number[]
  min: number
  max: number
  step: number
  isDisabled: boolean
  /** How far along the rail each value sits, from 0 to 1. */
  fractions: readonly number[]
  /** The track's measured length along its own axis. Zero until it has been laid out. */
  trackLength: number
  setTrackLength: (length: number) => void
  /** The knob's diameter, so the rail can inset the travel by half of it at each end. */
  thumbSize: number
  /** Moves one thumb to a position along the rail, from 0 to 1. */
  slideTo: (index: number, fraction: number) => void
  /** Which thumb a press at this position should move. */
  thumbFor: (fraction: number) => number
  commit: () => void
}
