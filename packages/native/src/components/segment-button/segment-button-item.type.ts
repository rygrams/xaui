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
   * Content to display at the start of the segment item
   */
  startContent?: ReactNode
  /**
   * @deprecated Use `startContent` instead
   */
  icon?: ReactNode
  /**
   * Content to display at the end of the segment item
   */
  endContent?: ReactNode
  /**
   * Custom indicator shown when the segment item is selected
   */
  checkIndicator?: ReactNode
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
