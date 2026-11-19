import type { ReactNode } from 'react'
import type { StyleProp, ViewProps, ViewStyle } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type BadgeSlot = 'root' | 'label'

/**
 * The `Button`'s four drawings, in the accent — or in `color`:
 *
 * | Variant     | Drawn as                                       |
 * | ----------- | ---------------------------------------------- |
 * | `contained` | filled with the true colour, the count cut in  |
 * | `flat`      | filled with its soft slice                     |
 * | `outline`   | the `Button`'s line and the count, as ink      |
 * | `text`      | the count alone — a Metro tile's               |
 *
 * **Not Native's eleven names**, as on the `Button` and the `Avatar`: a variant says how
 * the box is drawn, and a status is a colour — `accent="red"` for what Native calls
 * `danger`, `green` for `success`, `amber` for `warning`.
 */
export type BadgeVariant = 'contained' | 'flat' | 'outline' | 'text'

/** 16, 20, 24 tall; the dot 6, 8, 10 a side. */
export type BadgeSize = TramSize

/** Which corner of the positioned parent the badge sits in — flush, not astride it. */
export type BadgePlacement = 'top-end' | 'top-start' | 'bottom-end' | 'bottom-start'

type BadgeOwnProps = {
  /** `contained` by default — the accent, where Native's default is `danger`. */
  variant?: BadgeVariant
  size?: BadgeSize
  /** Overrides the sharp rectangle: up to the Tram corner of 2, or `full` for a pill. */
  radius?: RadiusKey
  /** One of the twenty named accents, painted as the `Button` paints it. */
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
