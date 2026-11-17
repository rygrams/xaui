import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type {
  AsChildProps,
  TextStyleProps,
  ViewStyleProps,
} from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type ProgressBarSlot =
  | 'root'
  | 'header'
  | 'label'
  | 'value'
  | 'track'
  | 'bare'
  | 'fill'
  | 'bubble'

/** The bar's thickness and the header's type. Never its width. */
export type ProgressBarSize = TramSize

type ProgressBarOwnProps = {
  /** The bar's thickness and the header's type. Its width is its parent's business. */
  size?: ProgressBarSize
  /** Overrides the corner of the bar and of its fill. Every key stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents — `accent="lime"` — for a bar that is not in the
   * theme's accent. It is the colour of the fill and of the bubbles; `color` wins when
   * both are set.
   */
  accent?: TramAccentName
  /** A raw `#RRGGBB` tint, never a token: the colour of the fill and of the bubbles. */
  color?: string
  /** How far along. Held within `[minValue, maxValue]`. @default 0 */
  value?: number
  /** @default 0 */
  minValue?: number
  /** @default 100 */
  maxValue?: number
  /**
   * How `ProgressBar.Value` reads the progress. Anything `Intl.NumberFormat` takes — a
   * currency, a unit, more decimals. @default { style: 'percent' }
   */
  formatOptions?: Intl.NumberFormatOptions
  /**
   * How long it will take is not known: the bar gives way to five bubbles that run from
   * its start to its end, and `value` is not read.
   */
  isIndeterminate?: boolean
  /** Greys the fill and the header, and dims the bar. Nothing is pressed. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * The Native `ProgressBar`'s props, with the Tram vocabulary: `accent` beside `color`, no
 * `variant`, and `isIndeterminate` — the Metro bar's five bubbles, which Native leaves to
 * its `Spinner`.
 */
export type ProgressBarProps = ProgressBarOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ProgressBarOwnProps> &
  Omit<ViewStyleProps, keyof ProgressBarOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name. */
export type ProgressBarViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** The fill, plus the one thing only it has: whether it moves. */
export type ProgressBarFillProps = ProgressBarViewSlotProps & {
  /**
   * `false` puts the fill at its width with no motion — for a value the caller already
   * animates — and stands the bubbles still.
   */
  animation?: boolean
}

/** `Text`'s own props win over the `TextStyle` keys of the same name. */
export type ProgressBarTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/**
 * Resolved styles, and the values no slot can compute: how far along the bar is, how that
 * reads as text, and how long the track is for the bubbles to cross.
 */
export type ProgressBarContextValue = {
  headerStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  valueStyle: StyleProp<TextStyle>
  trackStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  bubbleStyle: StyleProp<ViewStyle>
  /** 0 to 1. The fill's width, and what `Value` formats. */
  place: number
  /** The caller's own number, unclamped — what a format other than a percentage reads. */
  value: number
  formatOptions: Intl.NumberFormatOptions | undefined
  isIndeterminate: boolean
  isDisabled: boolean
  /** `true` under an ancestor's `disable-all`: nothing slides, nothing runs. */
  isStill: boolean
  /** The track's measured width. Zero until it is laid out. */
  trackWidth: number
  setTrackWidth: (width: number) => void
  /** A bubble's diameter: what its run is paced by. */
  bubbleSize: number
}
