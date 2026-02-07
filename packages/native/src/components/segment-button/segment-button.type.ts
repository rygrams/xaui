import { ReactNode } from 'react'
import type { ViewStyle, TextStyle } from 'react-native'
import type { Size, ThemeColor } from '../../types'

export type SegmentButtonVariant = 'solid' | 'outlined' | 'flat' | 'light' | 'faded'

export type ElevationLevel = 0 | 1 | 2 | 3 | 4

export type SegmentButtonRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type SegmentButtonSelectionMode = 'single' | 'multiple'

export type SegmentItem = {
  /**
   * Unique key for the segment
   */
  key: string
  /**
   * Label text for the segment
   */
  label: string
  /**
   * Optional icon to display in the segment
   */
  icon?: ReactNode
  /**
   * Whether the segment is disabled
   * @default false
   */
  isDisabled?: boolean
}

type SegmentButtonCustomAppearance = {
  /**
   * Custom styles for the outer container
   */
  container?: ViewStyle
  /**
   * Custom styles for individual segment buttons
   */
  segment?: ViewStyle
  /**
   * Custom styles for the selected segment
   */
  selectedSegment?: ViewStyle
  /**
   * Custom styles for segment label text
   */
  text?: TextStyle
  /**
   * Custom styles for selected segment label text
   */
  selectedText?: TextStyle
}

export type SegmentButtonProps = {
  /**
   * Array of segment items to render
   */
  segments: SegmentItem[]
  /**
   * The currently selected key(s).
   * Use a string for single-select, string array for multi-select.
   */
  selected: string | string[]
  /**
   * Callback fired when selection changes.
   * Returns a string for single-select mode, string array for multi-select.
   */
  onSelectionChange: (selected: string | string[]) => void
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
   * Custom appearance styles for segment button parts
   */
  customAppearance?: SegmentButtonCustomAppearance
}
