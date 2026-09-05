import type { ReactNode } from 'react'
import type { ViewProps } from 'react-native'
import type { ViewStyleProps } from '../../system/style-props'
import type { RadiusKey, Size } from '../../theme/theme.type'

export type SurfaceSlot = 'root'

/**
 * Four grounds, descending. `primary` is the theme's surface, `secondary` and `tertiary`
 * the two under it, `ghost` nothing at all.
 *
 * It is a **ladder rather than an intent**: a surface reports nothing, it is the thing
 * other reporting sits on. Stacking one on another is how a layout says "this belongs
 * inside that", and three levels is as deep as that reading survives.
 */
export type SurfaceVariant = 'primary' | 'secondary' | 'tertiary' | 'ghost'

export type SurfaceSize = Size

type SurfaceOwnProps = {
  children?: ReactNode
  variant?: SurfaceVariant
  size?: SurfaceSize
  radius?: RadiusKey
  /** The tint (R7) — a raw value, never a token. */
  color?: string
  /**
   * Whether the ground is lifted off what is behind it.
   *
   * `primary` is by default and the quieter three are not: a shadow under a ground that
   * barely differs from the page reads as dirt rather than as height.
   */
  isElevated?: boolean
  asChild?: boolean
}

export type SurfaceProps = SurfaceOwnProps &
  Omit<ViewProps, keyof SurfaceOwnProps> &
  Omit<ViewStyleProps, keyof SurfaceOwnProps | keyof ViewProps>
