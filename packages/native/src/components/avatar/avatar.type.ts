import type { ReactNode } from 'react'
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type AvatarSize = Size | number

export type AvatarProps = {
  /**
   * Avatar image source URL.
   */
  src?: string
  /**
   * Avatar name used for initials fallback.
   */
  name?: string
  /**
   * Custom icon rendered when no image is available.
   */
  icon?: ReactNode
  /**
   * Custom fallback rendered when no image is available.
   */
  fallback?: ReactNode
  /**
   * Avatar size preset or custom number.
   * @default 'md'
   */
  size?: AvatarSize
  /**
   * Avatar radius.
   * @default 'full'
   */
  radius?: Radius
  /**
   * Theme color for avatar background and text.
   */
  themeColor?: ThemeColor
  /**
   * Show border around avatar.
   */
  isBordered?: boolean
  /**
   * Disabled state.
   */
  isDisabled?: boolean
  /**
   * Show fallback content when image is missing or fails.
   * @default false
   */
  showFallback?: boolean
  /**
   * Custom initials generator.
   */
  getInitials?: (name: string) => string
  /**
   * Style for the container.
   */
  style?: ViewStyle
  /**
   * Style for the image.
   */
  imageStyle?: ImageStyle
  /**
   * Style for the fallback text.
   */
  textStyle?: TextStyle
}

export type AvatarGroupProps = {
  children?: ReactNode
  /**
   * Max avatars to display before showing count.
   */
  max?: number
  /**
   * Total avatars count if different from children length.
   */
  total?: number
  /**
   * Shared avatar size.
   */
  size?: AvatarSize
  /**
   * Shared avatar radius.
   */
  radius?: Radius
  /**
   * Shared theme color.
   */
  themeColor?: ThemeColor
  /**
   * Show border around avatars.
   */
  isBordered?: boolean
  /**
   * Disabled state for all avatars.
   */
  isDisabled?: boolean
  /**
   * Render avatars in a grid layout.
   */
  isGrid?: boolean
  /**
   * Custom renderer for the count avatar.
   */
  renderCount?: (count: number) => ReactNode
  /**
   * Style for the group container.
   */
  style?: ViewStyle
}
