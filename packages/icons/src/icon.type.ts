import type { ThemeColor } from './types'

export type IconVariant = 'baseline' | 'filled' | 'duotone' | 'round-outlined' | 'square-outlined' | 'round-filled' | 'square-filled'

export type IconProps = {
  /**
   * Icon variant
   * @default 'outline'
   */
  variant?: IconVariant
  /**
   * Icon size in pixels
   * @default 24
   */
  size?: number
  /**
   * Icon color - can be a theme color or custom RGB string
   * @default 'default'
   */
  color?: ThemeColor | string
  /**
   * Whether to animate the icon
   * @default false
   */
  isAnimated?: boolean
}
