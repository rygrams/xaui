<<<<<<< HEAD:packages/icons/src/icon.type.ts
=======
import type { ThemeColor } from '../../types'

>>>>>>> 2422169 (refactor: Update and refactor various UI components, their hooks, types, and tests across native and hybrid packages.):packages/native/src/components/icon/icon.type.ts
export type IconVariant =
  | 'baseline'
  | 'filled'
  | 'duotone'
  | 'round-outlined'
  | 'square-outlined'
  | 'round-filled'
  | 'square-filled'

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
   * @default 'black'
   */
  color?: string
  /**
   * Whether to animate the icon
   * @default false
   */
  isAnimated?: boolean
}
