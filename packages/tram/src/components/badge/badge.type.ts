import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { ReportVariant } from '../../system/report-tokens'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type BadgeSlot = 'root' | 'label'

/** Native's eleven names, each a flat fill — `ReportVariant` has the table. */
export type BadgeVariant = ReportVariant

/** 16, 20, 24 tall; the dot 6, 8, 10 a side. */
export type BadgeSize = TramSize

/** Which corner of the positioned parent the badge sits in — flush, not astride it. */
export type BadgePlacement = 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start'

type BadgeOwnProps = {
  /** `primary` by default — the accent, where Native's default is `danger`. */
  variant?: BadgeVariant
  size?: BadgeSize
  /** Overrides the sharp rectangle: up to the Tram corner of 2, or `full` for a pill. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents, painted as `color` is: the true colour as a fill, the
   * mode's ink where the badge has none (`tertiary`, `ghost`).
   */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`. */
  color?: string
  /** A square with nothing in it: something is new, not how much. */
  isDot?: boolean
  /** Pins the badge in a corner of the nearest positioned parent. */
  placement?: BadgePlacement
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

export type BadgeProps = Omit<ViewProps, 'style'> &
  BadgeOwnProps &
  Omit<ViewStyleProps, keyof BadgeOwnProps | keyof ViewProps>
