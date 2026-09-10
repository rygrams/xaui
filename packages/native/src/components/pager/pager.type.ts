import type { ReactNode } from 'react'
import type { ScrollViewProps, StyleProp, ViewProps, ViewStyle } from 'react-native'
import type Animated from 'react-native-reanimated'
import type { AnimatedRef, SharedValue } from 'react-native-reanimated'
import type { ViewStyleProps } from '../../system/style-props'
import type { Size } from '../../theme/theme.type'

export type PagerSlot =
  | 'root'
  | 'content'
  | 'page'
  | 'indicator'
  | 'dot'
  | 'dotActive'

/**
 * Which way the pages travel. `horizontal` is the onboarding flow and the gallery;
 * `vertical` is the full-screen feed.
 *
 * It is the axis rather than a direction, so it needs no RTL branch: a horizontal pager
 * mirrors with its scroll view, which is React Native's own behaviour.
 */
export type PagerOrientation = 'horizontal' | 'vertical'

/**
 * Three, and none of them an intent — a pager reports nothing, it is a way of arranging
 * what does. They name **which colour the current dot takes**, because the dots are the
 * only thing this component paints:
 *
 * - `primary` — the accent. The onboarding flow's answer.
 * - `secondary` — the neutral foreground, for a pager on a plain page.
 * - `tertiary` — the raised surface, which on a light theme is white: the pager over a
 *   photograph, where an accent dot disappears into whatever is behind it.
 *
 * `ghost` is absent rather than forgotten. A dot with no fill is not a dot, which is the
 * reason `InputOTP` has no `ghost` either — a box that is not a box is not a box.
 */
export type PagerVariant = 'primary' | 'secondary' | 'tertiary'

export type PagerSize = Size

type PagerOwnProps = {
  variant?: PagerVariant
  /** The dots' diameter and the gap between them. Never a page's size. */
  size?: PagerSize
  /** A raw value (R7) for the current dot. The pages are yours and it never reaches them. */
  color?: string
  /** @default 'horizontal' */
  orientation?: PagerOrientation
  /** Which page is shown. Present means controlled. */
  index?: number
  /** Where it starts when uncontrolled. */
  defaultIndex?: number
  onIndexChange?: (index: number) => void
  /** Locks the swipe and the dots. */
  isDisabled?: boolean
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

/** R14 — the pager's own props, `View`'s, and every `ViewStyle` key neither claims. */
export type PagerProps = PagerOwnProps &
  Omit<ViewProps, keyof PagerOwnProps | 'style'> &
  Omit<ViewStyleProps, keyof PagerOwnProps>

/** `ScrollView`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type PagerContentProps = Omit<ScrollViewProps, 'style' | 'children'> &
  Omit<ViewStyleProps, keyof ScrollViewProps> & {
    style?: StyleProp<ViewStyle>
    children?: ReactNode
  }

/** `View`'s own props win over the `ViewStyle` keys of the same name (R14). */
export type PagerViewSlotProps = Omit<ViewProps, 'style'> &
  Omit<ViewStyleProps, keyof ViewProps> & {
    style?: StyleProp<ViewStyle>
    children?: ReactNode
  }

export type PagerDotProps = PagerViewSlotProps & {
  /** Which page this dot stands for. */
  index: number
}

/** How big the track measured — a page is exactly this, on both axes. */
export type PagerTrackSize = {
  width: number
  height: number
}

/** R5 — resolved styles and measured numbers, never a token for a slot to resolve again. */
export type PagerContextValue = {
  contentStyle: StyleProp<ViewStyle>
  pageStyle: StyleProp<ViewStyle>
  indicatorStyle: StyleProp<ViewStyle>
  /**
   * One colour for every dot. What tells the current one from the rest is its opacity, which
   * the dot animates itself — so there is no second colour in here to keep in contrast with
   * the first, and no pair that can collapse into one.
   */
  dotStyle: StyleProp<ViewStyle>
  orientation: PagerOrientation
  /** The settled page. */
  index: number
  /** How many pages the track was given, counted by the track itself. */
  count: number
  setCount: (count: number) => void
  /**
   * The track's own size, measured — **the track's, not the root's**. The indicator sits in
   * the flow under the pages, so the root is taller than the box a page has to fill, and a
   * page sized to the root would overflow it by exactly the dots.
   *
   * Zero until it has laid out, which is why the track draws nothing before then.
   */
  track: PagerTrackSize
  setTrack: (size: PagerTrackSize) => void
  /** How far one page travels — the track's size on the paging axis. */
  step: number
  /** Where the track is, live, on the UI thread. */
  offset: SharedValue<number>
  /** Moves the track and lets its own settle report back. */
  goTo: (index: number) => void
  /** What the track calls when it crosses onto another page. */
  onSettle: (index: number) => void
  trackRef: AnimatedRef<Animated.ScrollView>
  isDisabled: boolean
}
