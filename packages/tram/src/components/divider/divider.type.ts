import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { TramSize } from '../../theme/tram-tokens'

export type DividerSlot = 'root'

export type DividerOrientation = 'horizontal' | 'vertical'

/** The thickness — 1, 2, 3. No `xs`: the thinnest Tram line is already one point. */
export type DividerSize = TramSize

/**
 * Native's props, on the Tram scale. No `variant`, as in Native — a rule has nothing for a
 * drawing to name — and no `accent`: a line in the accent is a `color`, read as ink.
 */
type DividerOwnProps = {
  /** Which way the rule runs. It takes the other axis from its parent. */
  orientation?: DividerOrientation
  /** How thick: 1 (default), 2 — the `Button`'s line — or 3, the theme's border. */
  size?: DividerSize
  /** A raw tint, never a token. It is drawn as given, not faded. */
  color?: string
  /** The child element becomes the rule and keeps its thickness and ink. */
  asChild?: boolean
  style?: StyleProp<ViewStyle>
  /** Only meaningful under `asChild`. */
  children?: ReactNode
}

export type DividerProps = Omit<ViewProps, 'style'> &
  DividerOwnProps &
  Omit<ViewStyleProps, keyof DividerOwnProps | keyof ViewProps>
