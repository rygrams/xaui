import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type BadgeVariant = 'solid' | 'flat' | 'faded' | 'shadow'
export type BadgeSize = 'sm' | 'md' | 'lg'
export type BadgeShape = 'rectangle' | 'circle'
export type BadgePlacement = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

export type BadgeProps = {
  /**
   * Content rendered inside the badge.
   */
  content?: ReactNode
  /**
   * The badge color.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The badge variant.
   * @default 'solid'
   */
  variant?: BadgeVariant
  /**
   * The badge size.
   * @default 'md'
   */
  size?: BadgeSize
  /**
   * The badge shape.
   * @default 'rectangle'
   */
  shape?: BadgeShape
  /**
   * Placement relative to children.
   * @default 'top-right'
   */
  placement?: BadgePlacement
  /**
   * Show outline around badge.
   * @default true
   */
  showOutline?: boolean
  /**
   * Disable outline around badge.
   * @default false
   */
  disableOutline?: boolean
  /**
   * Hide the badge.
   * @default false
   */
  isInvisible?: boolean
  /**
   * Render dot style badge.
   * @default false
   */
  isDot?: boolean
  /**
   * Render badge as one character size.
   * @default false
   */
  isOneChar?: boolean
  /**
   * Disable badge animation.
   * @default false
   */
  disableAnimation?: boolean
  /**
   * Badge wrapper style.
   */
  style?: ViewStyle
  /**
   * Badge style.
   */
  badgeStyle?: ViewStyle
  /**
   * Badge text style.
   */
  textStyle?: TextStyle
  /**
   * Wrapped component.
   */
  children?: ReactNode
}
