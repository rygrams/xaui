import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'
import type { ViewStyleProps } from '@xaui/native/system'
import type { RadiusKey } from '@xaui/native/theme'
import type { TramAccentName, TramSize } from '../../theme/tram-tokens'

export type SurfaceSlot = 'root'

/**
 * The Native ladder, kept by name: a surface reports nothing, so its variant already says
 * how the ground is drawn — which is what a Tram variant says.
 *
 * | Variant     | Drawn as                                   |
 * | ----------- | ------------------------------------------ |
 * | `primary`   | the discreet surface, a grey off the page  |
 * | `secondary` | the next grey, for a surface inside one    |
 * | `tertiary`  | the page itself, inside the theme's line   |
 *
 * No shadow on any of them: Tram has no depth.
 */
export type SurfaceVariant = 'primary' | 'secondary' | 'tertiary'

export type SurfaceSize = TramSize

type SurfaceOwnProps = {
  children?: ReactNode
  variant?: SurfaceVariant
  /** Padding and gap. Never a height: a surface is as tall as what it holds. */
  size?: SurfaceSize
  /** Overrides the Tram corner. The scale is the theme's, so it stays within 2. */
  radius?: RadiusKey
  /**
   * One of the twenty named accents. It fills a `primary` or a `secondary` with its true
   * colour, and draws the line of a `tertiary` as the mode's ink.
   */
  accent?: TramAccentName
  /** A raw tint, never a token. It lands where `accent` does, and wins over it. */
  color?: string
  asChild?: boolean
}

/**
 * Native's `isElevated` is not here: a Tram surface is never lifted off the page.
 */
export type SurfaceProps = SurfaceOwnProps &
  Omit<ViewProps, keyof SurfaceOwnProps> &
  Omit<ViewStyleProps, keyof SurfaceOwnProps | keyof ViewProps>
