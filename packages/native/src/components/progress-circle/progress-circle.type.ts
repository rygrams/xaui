import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { AsChildProps } from '../../system/slot'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'
import type { CircleGeometry } from './progress-circle.geometry'

export type ProgressCircleSlot = 'root' | 'track' | 'fill' | 'value'

/** The `ProgressBar`'s five, for the `ProgressBar`'s reasons. */
export type ProgressCircleVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

/** Three. `size` is the ring's diameter and the type in the middle of it. */
export type ProgressCircleSize = Exclude<Size, 'xs'>

type ProgressCircleOwnProps = {
  variant?: ProgressCircleVariant
  /** The ring's diameter, its stroke and the type inside it. */
  size?: ProgressCircleSize
  /**
   * The ring's radius **in points**, and the one place in this library where `radius` means
   * what it means in geometry rather than a corner — a circle has no corner to round.
   *
   * A raw number, so it lives outside the style cache and outside the vocabulary (R6): it
   * wins over `size` the way a raw `color` wins over a variant's token. Reach for it when
   * the ring has to line up with something already on the screen; reach for `size`
   * otherwise.
   */
  radius?: number
  /** The stroke's thickness in points, overriding `size`. Clamped to half the diameter. */
  strokeWidth?: number
  /** A raw tint (`'#7c3aed'`), never a token (R7). It lands on the arc. */
  color?: string
  /** How far along. Clamped into `[minValue, maxValue]`. @default 0 */
  value?: number
  /** @default 0 */
  minValue?: number
  /** @default 100 */
  maxValue?: number
  /**
   * How `ProgressCircle.Value` reads the fraction. @default { style: 'percent' }
   */
  formatOptions?: Intl.NumberFormatOptions
  /** Dims the ring. There is nothing to press, so nothing else changes. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the ring's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ProgressCircleProps = ProgressCircleOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ProgressCircleOwnProps> &
  Omit<ViewStyleProps, keyof ProgressCircleOwnProps | keyof ViewProps>

type ProgressCircleIndicatorOwnProps = {
  /** `false` snaps the arc to its new length instead of sweeping to it. */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type ProgressCircleIndicatorProps = ProgressCircleIndicatorOwnProps &
  Omit<ViewProps, keyof ProgressCircleIndicatorOwnProps> &
  Omit<ViewStyleProps, keyof ProgressCircleIndicatorOwnProps | keyof ViewProps>

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type ProgressCircleValueProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/**
 * R5 — resolved values, not props for a slot to resolve again. The two colours are strings
 * rather than styles because an SVG path is stroked by a prop, not by a stylesheet, and
 * the geometry is numbers for the same reason.
 */
export type ProgressCircleContextValue = {
  geometry: CircleGeometry
  trackColor: string | undefined
  fillColor: string | undefined
  valueStyle: StyleProp<TextStyle>
  /** 0 to 1. How much of the circumference is drawn, and what `Value` formats. */
  fraction: number
  /** The caller's own number, unclamped — what a non-percentage format reads. */
  value: number
  formatOptions: Intl.NumberFormatOptions | undefined
  isDisabled: boolean
}
