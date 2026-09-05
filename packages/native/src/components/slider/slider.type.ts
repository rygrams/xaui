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

export type SliderSlot = 'root' | 'output' | 'track' | 'fill' | 'thumb' | 'knob'

export type SliderSize = Exclude<Size, 'xs'>

type SliderOwnProps = {
  children?: ReactNode
  size?: SliderSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. Paints the fill and the thumb. */
  color?: string
  value?: number
  defaultValue?: number
  /** Fires on every step the thumb crosses, including while it is being dragged. */
  onValueChange?: (value: number) => void
  /** Fires once, when the finger lifts. What a network call belongs on. */
  onValueCommit?: (value: number) => void
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
  /** Given the current value, so the caller can format it. Defaults to the number. */
  children?: ReactNode | ((value: number) => ReactNode)
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
    /** What a screen reader reads instead of the raw number. */
    accessibilityValueText?: (value: number) => string
  }

/** R5 — resolved style ids and the state the slots read. */
export type SliderContextValue = {
  outputStyle: StyleProp<TextStyle>
  trackStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  thumbStyle: StyleProp<ViewStyle>
  knobStyle: StyleProp<ViewStyle>
  value: number
  min: number
  max: number
  step: number
  isDisabled: boolean
  /** How far along the track the value sits, from 0 to 1. */
  fraction: number
  /** The track's measured width. Zero until it has been laid out once. */
  trackWidth: number
  setTrackWidth: (width: number) => void
  /** The thumb's own width, so the track can inset the travel by half of it each side. */
  thumbWidth: number
  /** Called with a position along the track, from 0 to 1. */
  slideTo: (fraction: number) => void
  commit: () => void
}
