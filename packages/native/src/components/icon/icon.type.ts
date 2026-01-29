import type { ViewStyle } from 'react-native'

export type IconVariant =
  | 'thin'
  | 'stroke'
  | 'solid'
  | 'contrast'
  | 'duo-stroke'
  | 'duo-solid'

export type IconProps = {
  /**
   * The size of the icon in pixels.
   * @default 24
   */
  size?: number
  /**
   * The primary color of the icon.
   * @default '#000000'
   */
  color?: string
  /**
   * The secondary color for duo variants.
   * @default '#666666'
   */
  secondaryColor?: string
  /**
   * The style variant of the icon.
   * @default 'stroke'
   */
  variant?: IconVariant
  /**
   * Custom style for the icon container.
   */
  style?: ViewStyle
}
