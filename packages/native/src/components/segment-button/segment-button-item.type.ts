import { ReactNode } from 'react'
import type { ViewStyle, TextStyle } from 'react-native'

type SegmentButtonItemCustomAppearance = {
  /**
   * Custom styles for the segment container
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

export type SegmentButtonItemProps = {
  /**
   * Unique key for the segment item
   */
  itemKey: string
  /**
   * Label text for the segment
   */
  label: string
  /**
   * Optional icon to display in the segment
   */
  icon?: ReactNode
  /**
   * Whether the segment item is disabled
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom appearance styles for this segment item
   */
  customAppearance?: SegmentButtonItemCustomAppearance
}
