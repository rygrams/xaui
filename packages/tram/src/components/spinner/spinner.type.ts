import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

/** The ring, and the five dots that run round it. */
export type SpinnerSlot = 'root' | 'dot'

export type SpinnerSize = TramSize

/**
 * The Native `Spinner` with Tram's vocabulary: **no `variant`** — the dots are the accent,
 * as the progress bar's bubbles are — and `accent` added. A spinner in the page's ink is
 * `color={theme.colors.foreground}`.
 *
 * No `asChild`, as in Native: the five dots are nodes a caller's element could not receive.
 */
type SpinnerOwnProps = {
  /** The ring's diameter — 20, 32, 48 — and the dots that go with it. */
  size?: SpinnerSize
  /** One of the twenty named accents, in its true colour: a dot is a fill. */
  accent?: TramAccentName
  /** A raw tint, never a token. It wins over `accent`. */
  color?: string
  /**
   * `false` stops the run and mounts no worklet: the five stand evenly round the ring, so
   * a list switched off this way keeps its height.
   */
  animation?: boolean
  style?: StyleProp<ViewStyle>
}

export type SpinnerProps = Omit<ViewProps, 'style'> &
  SpinnerOwnProps &
  Omit<ViewStyleProps, keyof SpinnerOwnProps | keyof ViewProps>
