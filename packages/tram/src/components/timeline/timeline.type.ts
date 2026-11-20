import type { ReactNode } from 'react'
import type {
  StyleProp,
  TextProps,
  TextStyle,
  ViewProps,
  ViewStyle,
} from 'react-native'
import type { TimelineDensity, TimelineStatus } from '@xaui/native'
import type { TextStyleProps, ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type { TimelineDensity, TimelineStatus }

export type TimelineSlot =
  | 'root'
  | 'item'
  | 'leading'
  | 'leadingLabel'
  | 'leadingCaption'
  | 'rail'
  | 'marker'
  | 'connector'
  | 'content'
  | 'title'
  | 'description'

export type TimelineSize = TramSize

type TimelineOwnProps = {
  /** The tile — 60, 76, 92 — and the type in it. */
  size?: TimelineSize
  /** The air under an entry: 16 or 28. @default 'comfortable' */
  density?: TimelineDensity
  /** One of the twenty named accents, for the tiles of `default` entries. */
  accent?: TramAccentName
  /** A raw tint for the tiles of `default` entries. Wins over `accent`. */
  color?: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/**
 * Its own props, `View`'s, and its `ViewStyle` keys. **No `itemAlign`**: the tile opens
 * its entry, at the top, always.
 */
export type TimelineProps = TimelineOwnProps &
  Omit<ViewProps, keyof TimelineOwnProps> &
  Omit<ViewStyleProps, keyof TimelineOwnProps | keyof ViewProps>

type TimelineItemOwnProps = {
  /** What happened — it paints the tile. @default 'default' */
  status?: TimelineStatus
  children?: ReactNode
}

export type TimelineItemProps = TimelineItemOwnProps &
  Omit<ViewProps, keyof TimelineItemOwnProps> &
  Omit<ViewStyleProps, keyof TimelineItemOwnProps | keyof ViewProps>

type TimelineLeadingOwnProps = {
  /** The tile's large line, Light: the day, an hour, a number. */
  children?: ReactNode
  /** The small line under it: the month, the minutes. */
  caption?: ReactNode
}

export type TimelineLeadingProps = TimelineLeadingOwnProps &
  Omit<ViewProps, keyof TimelineLeadingOwnProps> &
  Omit<ViewStyleProps, keyof TimelineLeadingOwnProps | keyof ViewProps>

type TimelineConnectorOwnProps = {
  /** Kept for Native's markup. Only the line below is drawn. @default 'below' */
  edge?: 'above' | 'below'
  /** Draw it under the last entry too — a timeline that goes on past the screen. */
  force?: boolean
}

export type TimelineConnectorProps = TimelineConnectorOwnProps &
  Omit<ViewProps, keyof TimelineConnectorOwnProps> &
  Omit<ViewStyleProps, keyof TimelineConnectorOwnProps | keyof ViewProps>

export type TimelineViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

export type TimelineTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/** One entry's tile: its fill, and the ink that reads on it. */
export type TimelineTilePaint = { fill: string; ink: string }

export type TimelineContextValue = {
  itemStyle: StyleProp<ViewStyle>
  leadingStyle: StyleProp<ViewStyle>
  leadingLabelStyle: StyleProp<TextStyle>
  leadingCaptionStyle: StyleProp<TextStyle>
  railStyle: StyleProp<ViewStyle>
  markerStyle: StyleProp<ViewStyle>
  connectorStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  /** A paint per status, decided once — an entry picks rather than resolving. */
  paints: Record<TimelineStatus, TimelineTilePaint>
  /** The tile's side, which is where the line below it starts and how far in it runs. */
  tile: number
}

export type TimelineItemContextValue = {
  status: TimelineStatus
  isFirst: boolean
  isLast: boolean
  /** Whether a `Leading` tile opens this entry; without one the rail draws a mark. */
  hasLeading: boolean
  /** What a `Leading` calls while it is mounted. */
  registerLeading: () => () => void
}
