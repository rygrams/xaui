import { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { Size, ThemeColor } from '../../types'

export type SegmentButtonVariant = 'outlined' | 'flat' | 'light' | 'faded'

export type ElevationLevel = 0 | 1 | 2 | 3 | 4

export type SegmentButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type SegmentButtonSelectionMode = 'single' | 'multiple'

export type SegmentButtonProps = {
  /**
   * SegmentButtonItem children
   */
  children: ReactNode
  /**
   * The currently selected key(s) (controlled mode).
   * Use a string for single-select, string array for multi-select.
   */
  selected?: string | string[]
  /**
   * Default selected key(s) for uncontrolled mode.
   * Use a string for single-select, string array for multi-select.
   */
  defaultSelected?: string | string[]
  /**
   * Callback fired when selection changes.
   * Returns a string for single-select mode, string array for multi-select.
   */
  onSelectionChange?: (selected: string | string[]) => void
  /**
   * Selection mode: single or multiple
   * @default 'single'
   */
  selectionMode?: SegmentButtonSelectionMode
  /**
   * The theme color of the segment button
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * The variant of the segment button
   * @default 'outlined'
   */
  variant?: SegmentButtonVariant
  /**
   * The size of the segment button
   * @default 'md'
   */
  size?: Size
  /**
   * The border radius of the segment button
   * @default 'full'
   */
  radius?: SegmentButtonRadius
  /**
   * Whether the segment button should take the full width of its container
   * @default false
   */
  fullWidth?: boolean
  /**
   * Whether the entire segment button group is disabled
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether to show a checkmark icon on selected segments
   * @default true
   */
  showCheckmark?: boolean
  /**
   * Android elevation level from 0 to 4.
   * Does not apply to `outlined` and `light` variants.
   * @default 0
   */
  elevation?: ElevationLevel
  /**
   * Custom styles for the outer container
   */
  customAppearance?: {
    container?: ViewStyle
  }
}
