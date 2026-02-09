import type { ReactNode } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type AppBarVariant = 'docked' | 'floating'

export type AppBarProps = {
  /**
   * AppBar layout variant.
   * - docked: full-width app bar
   * - floating: rounded app bar that does not span full screen width
   * @default 'docked'
   */
  variant?: AppBarVariant
  /**
   * Elevation intensity.
   * @default 0
   */
  elevation?: number
  /**
   * Theme color used for the app bar surface.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * AppBar content.
   */
  children?: ReactNode
  /**
   * Custom style for the app bar surface.
   */
  style?: StyleProp<ViewStyle>
}

export type AppBarSlotProps = {
  /**
   * Slot content.
   */
  children?: ReactNode
  /**
   * Custom style for this slot.
   */
  style?: StyleProp<ViewStyle>
}

export type AppBarStartContentProps = AppBarSlotProps
export type AppBarContentProps = AppBarSlotProps
export type AppBarEndContentProps = AppBarSlotProps
