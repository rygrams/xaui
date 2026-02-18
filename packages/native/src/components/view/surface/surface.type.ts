import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../../types'

export type SurfaceBackgroundColor = ThemeColor | 'background' | 'foreground'

export type SurfaceProps = {
  /**
   * Content rendered inside the surface container.
   */
  children: ReactNode
  /**
   * Theme-based background color key.
   * - Semantic keys (primary, secondary, etc.) use their `.background` tone.
   * - `background` / `foreground` use the raw theme color values.
   * @default 'background'
   */
  backgroundColor?: SurfaceBackgroundColor
  /**
   * Uniform padding inside the surface.
   */
  padding?: number
  /**
   * Border radius token.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Whether the surface should take full width.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Additional container styles.
   */
  style?: StyleProp<ViewStyle>
}
