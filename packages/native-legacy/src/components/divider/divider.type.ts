import type { ThemeColor } from '../../types'

export type DividerOrientation = 'horizontal' | 'vertical'

export type DividerProps = {
  /**
   * The size (thickness) of the divider in pixels.
   * @default 1
   */
  size?: number
  /**
   * The theme color of the divider.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Custom color for the divider.
   * If provided, this will override themeColor.
   */
  color?: string
  /**
   * The orientation of the divider.
   * @default 'horizontal'
   */
  orientation?: DividerOrientation
}
