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

export type TimelineSlot =
  | 'root'
  | 'item'
  | 'leading'
  | 'rail'
  | 'marker'
  | 'markerRing'
  | 'connector'
  | 'content'
  | 'title'
  | 'description'

/**
 * What an entry *is*, which is not the same thing as an emphasis.
 *
 * A timeline reports the state of each step, so this is the one place in the library where a
 * per-item prop names an intent — and it is called `status` rather than `variant` for exactly
 * that reason: `variant` is how loud something is, and these say what happened.
 *
 * `current` is the one that is not a colour: it is the step being worked on, drawn as a ring
 * rather than a filled dot, so a reader finds where they are without counting.
 */
export type TimelineStatus =
  | 'default'
  | 'muted'
  | 'current'
  | 'success'
  | 'warning'
  | 'danger'

export type TimelineSize = Extract<Size, 'sm' | 'md' | 'lg'>

/** How much air between two entries. */
export type TimelineDensity = 'compact' | 'comfortable'

/**
 * Where the marker sits against its content.
 *
 * `start` puts it level with the first line of the title, which is what a list of events
 * wants. `center` centres it against the whole entry, which is what a list of two-line cards
 * wants — and the only difference between them is whether the rail's upper segment is a
 * fixed inset or a share of the height.
 */
export type TimelineAlign = 'start' | 'center'

type TimelineOwnProps = {
  /** The marker, the rail's width and the type. */
  size?: TimelineSize
  /** @default 'comfortable' */
  density?: TimelineDensity
  /** The default for every entry. An entry's own `align` wins. @default 'start' */
  itemAlign?: TimelineAlign
  /** A raw tint (R7). It lands on a `default` and a `current` marker. */
  color?: string
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the component's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type TimelineProps = TimelineOwnProps &
  AsChildProps &
  Omit<ViewProps, keyof TimelineOwnProps> &
  Omit<ViewStyleProps, keyof TimelineOwnProps | keyof ViewProps>

type TimelineItemOwnProps = {
  /** @default 'default' */
  status?: TimelineStatus
  /** Overrides the root's `itemAlign` for this entry. */
  align?: TimelineAlign
  children?: ReactNode
}

export type TimelineItemProps = TimelineItemOwnProps &
  Omit<ViewProps, keyof TimelineItemOwnProps> &
  Omit<ViewStyleProps, keyof TimelineItemOwnProps | keyof ViewProps>

type TimelineConnectorOwnProps = {
  /** Which half of the rail. Set by `Timeline.Rail`; you only give it composing your own. */
  edge?: 'above' | 'below'
  /**
   * Draw it even at the end it would normally be left off.
   *
   * The first entry has nothing above it and the last has nothing below it, so those two
   * segments are omitted — a line running off the top of a list is a list that has been cut.
   * `force` is for a timeline that continues past what is on screen and should say so.
   */
  force?: boolean
}

export type TimelineConnectorProps = TimelineConnectorOwnProps &
  Omit<ViewProps, keyof TimelineConnectorOwnProps> &
  Omit<ViewStyleProps, keyof TimelineConnectorOwnProps | keyof ViewProps>

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type TimelineViewProps = ViewProps &
  Omit<ViewStyleProps, keyof ViewProps> & { children?: ReactNode }

/** `Text`'s own props win over the `TextStyle` keys of the same name (R14). */
export type TimelineTextProps = TextProps &
  Omit<TextStyleProps, keyof TextProps> & { children?: ReactNode }

/** R5 — resolved styles, plus the two numbers the rail's arithmetic needs. */
export type TimelineContextValue = {
  itemStyle: StyleProp<ViewStyle>
  leadingStyle: StyleProp<TextStyle>
  railStyle: StyleProp<ViewStyle>
  connectorStyle: StyleProp<ViewStyle>
  contentStyle: StyleProp<ViewStyle>
  titleStyle: StyleProp<TextStyle>
  descriptionStyle: StyleProp<TextStyle>
  /** A marker per status, resolved once — an item picks rather than resolving its own (R5). */
  markerStyles: Record<TimelineStatus, StyleProp<ViewStyle>>
  /**
   * Values, not styles: the rail places the marker by arithmetic, and how far down it sits
   * on a `start` entry is the title's own half-line.
   */
  rail: { width: number; marker: number; inset: number }
  align: TimelineAlign
  /** Values a marker of your own reads — an `Icon` takes props, not styles. */
  icon: { size: number | undefined; color: string | undefined }
}

/** What one entry publishes to the rail inside it. */
export type TimelineItemContextValue = {
  status: TimelineStatus
  align: TimelineAlign
  /** Whether it is the first or the last, which is what the two end segments read. */
  isFirst: boolean
  isLast: boolean
}
