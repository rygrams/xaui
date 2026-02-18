import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../../types'

export type SurfaceThemeColor = ThemeColor | 'background' | 'foreground'

export type SurfaceProps = {
  /**
   * Content rendered inside the surface container.
   */
  children: ReactNode
  /**
   * Theme-based color key used for background.
   * - Semantic keys (primary, secondary, etc.) use their `.background` tone.
   * - `background` / `foreground` use raw theme values.
   * @default 'background'
   */
  themeColor?: SurfaceThemeColor
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
   * Additional container styles.
   */
  style?: StyleProp<ViewStyle>
}
