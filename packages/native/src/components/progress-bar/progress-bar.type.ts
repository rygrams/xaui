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
import type { RadiusKey, Size } from '../../theme/theme.type'

export type ProgressBarSlot =
  | 'root'
  | 'header'
  | 'label'
  | 'value'
  | 'track'
  | 'fill'

/**
 * Five of the ten, and the five that are left out say what this is. A bar reports how far
 * along something is, so `primary` and `secondary` are the two emphases it has, and the
 * three intents are the ones a caller reaches for when the number itself is the news — a
 * quota nearly spent, a payment that failed halfway.
 *
 * `tertiary` and `ghost` are gone with them: a fill with no fill is not a progress bar.
 * The `*-soft` pairs are gone too — the track already is the soft half of every one of
 * these, and a soft fill on a soft track is one bar you cannot read.
 */
export type ProgressBarVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'

/** Three, and `size` here is the rail's **thickness** and the header's type. Never width. */
export type ProgressBarSize = Exclude<Size, 'xs'>

type ProgressBarOwnProps = {
  variant?: ProgressBarVariant
  /** The rail's thickness and the header's type. A bar's width is its parent's business. */
  size?: ProgressBarSize
  /** Overrides the corner, which is `full` on both the rail and the fill. */
  radius?: RadiusKey
  /** A raw tint (`'#7c3aed'`), never a token (R7). It lands on the fill. */
  color?: string
  /** How far along. Clamped into `[minValue, maxValue]`. @default 0 */
  value?: number
  /** @default 0 */
  minValue?: number
  /** @default 100 */
  maxValue?: number
  /**
   * How `ProgressBar.Value` reads the fraction. Anything `Intl.NumberFormat` takes — a
   * currency, a unit, more decimals. @default { style: 'percent' }
   */
  formatOptions?: Intl.NumberFormatOptions
  /** Dims the bar. There is nothing to press, so nothing else changes. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the bar's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type ProgressBarProps = ProgressBarOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof ProgressBarOwnProps> &
  Omit<ViewStyleProps, keyof ProgressBarOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type ProgressBarViewSlotProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** The fill, plus the one thing only it has: whether it animates to its new width. */
export type ProgressBarFillProps = ProgressBarViewSlotProps & {
  /** `false` snaps to the new width — for a value the caller is already animating. */
  animation?: boolean
}

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type ProgressBarTextSlotProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/**
 * R5 — resolved styles, plus the two values no slot can compute: how far along the bar is,
 * and how that fraction reads as text.
 */
export type ProgressBarContextValue = {
  headerStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  valueStyle: StyleProp<TextStyle>
  trackStyle: StyleProp<ViewStyle>
  fillStyle: StyleProp<ViewStyle>
  /** 0 to 1. The fill's width, and what `Value` formats. */
  fraction: number
  /** The caller's own number, unclamped — what a non-percentage format reads. */
  value: number
  formatOptions: Intl.NumberFormatOptions | undefined
  isDisabled: boolean
}
