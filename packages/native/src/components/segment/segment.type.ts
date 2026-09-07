import type { ReactNode } from 'react'
import type {
  PressableProps,
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { IndicatorRect } from '../../hooks/use-sliding-indicator'
import type { TextStyleProps, ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type SegmentSlot =
  | 'root'
  | 'indicator'
  | 'item'
  | 'separator'
  | 'label'
  | 'labelSelected'

export type SegmentSize = Exclude<Size, 'xs'>

/** One: a segment is a shape, and it is the only shape a segment has. */
export type SegmentVariant = 'default'

/** Where an option sits, so the pill knows where to slide. */
export type SegmentRect = IndicatorRect

type SegmentOwnProps = {
  children?: ReactNode
  size?: SegmentSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  /**
   * Whether a hairline is drawn between the options the pill is nowhere near.
   *
   * Off by default: the pill already says which option is chosen, and the rules are what a
   * segment adds when its options are a long enough list to need dividing. Both edges of
   * the pill stay clear — see `hasLeadingSeparator`.
   */
  hasSeparator?: boolean
  isDisabled?: boolean
  asChild?: boolean
}

export type SegmentProps = SegmentOwnProps &
  Omit<ViewProps, keyof SegmentOwnProps> &
  Omit<ViewStyleProps, keyof SegmentOwnProps | keyof ViewProps>

/** What an option's render function is handed, so it can paint its own chosen state. */
export type SegmentItemRenderState = {
  isSelected: boolean
  isPressed: boolean
  isDisabled: boolean
}

type SegmentItemOwnProps = {
  value: string
  children?: ReactNode | ((state: SegmentItemRenderState) => ReactNode)
  isDisabled?: boolean
  asChild?: boolean
}

export type SegmentItemProps = SegmentItemOwnProps &
  Omit<PressableProps, keyof SegmentItemOwnProps> &
  Omit<ViewStyleProps, keyof SegmentItemOwnProps | keyof PressableProps>

type SegmentLabelOwnProps = { children?: ReactNode }

export type SegmentLabelProps = SegmentLabelOwnProps &
  Omit<TextProps, keyof SegmentLabelOwnProps> &
  Omit<TextStyleProps, keyof SegmentLabelOwnProps | keyof TextProps>

/** R5 — resolved style ids and the state the slots read. */
export type SegmentContextValue = {
  itemStyle: StyleProp<ViewStyle>
  separatorStyle: StyleProp<ViewStyle>
  labelStyle: StyleProp<TextStyle>
  labelSelectedStyle: StyleProp<TextStyle>
  value: string | undefined
  hasSeparator: boolean
  isDisabled: boolean
  select: (value: string) => void
  /** Every option's measured rectangle, keyed by value. The pill reads one. */
  rects: Readonly<Record<string, SegmentRect>>
  setRect: (value: string, rect: SegmentRect) => void
}

/** One option's own state, for the label inside it. */
export type SegmentItemContextValue = SegmentItemRenderState
