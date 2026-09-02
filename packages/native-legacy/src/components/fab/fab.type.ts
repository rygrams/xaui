import { ReactNode } from 'react'
import type { ViewStyle, GestureResponderEvent } from 'react-native'
import type { ThemeColor } from '../../types'
import type { ButtonRadius, ElevationLevel } from '../button/button.type'

export type FabVariant = 'solid' | 'flat' | 'outlined'

export type FabSize = 'sm' | 'md' | 'lg'

type FabCustomAppearance = {
  /**
   * Custom styles for the outer container
   */
  container?: ViewStyle
  /**
   * Custom styles for the fab button
   */
  fab?: ViewStyle
}

export type FabProps = {
  /**
   * The icon to display in the FAB.
   */
  icon: ReactNode
  /**
   * Optional text label for an extended FAB.
   * When provided, the FAB renders as an extended FAB with icon + label.
   */
  label?: ReactNode
  /**
   * The theme color of the FAB.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The visual variant of the FAB.
   * @default 'solid'
   */
  variant?: FabVariant
  /**
   * The size of the FAB.
   * @default 'md'
   */
  size?: FabSize
  /**
   * Custom border radius for the FAB.
   * Overrides the default size-based border radius.
   */
  radius?: ButtonRadius
  /**
   * Whether the FAB is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the FAB is in a loading state.
   * @default false
   */
  isLoading?: boolean
  /**
   * Android elevation level from 0 to 4.
   * Does not apply to `outlined` and `light` variants.
   * @default 0
   */
  elevation?: ElevationLevel
  /**
   * Custom appearance styles for FAB parts.
   */
  customAppearance?: FabCustomAppearance
  /**
   * Callback fired when the FAB is pressed.
   */
  onPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when the FAB is long pressed.
   */
  onLongPress?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when the FAB press starts.
   */
  onPressIn?: (event: GestureResponderEvent) => void
  /**
   * Callback fired when the FAB press ends.
   */
  onPressOut?: (event: GestureResponderEvent) => void
}
