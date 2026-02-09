import type { ReactNode } from 'react'
import type { ViewStyle, TextStyle } from 'react-native'

export type ExpansionPanelItemEvents = {
  onSelected?: (isSelected: boolean) => void
}

export type ExpansionPanelItemCustomAppearance = {
  /**
   * Custom styles for the base container
   */
  base?: ViewStyle

  /**
   * Custom styles for the header container
   */
  heading?: ViewStyle

  /**
   * Custom styles for the trigger button
   */
  trigger?: ViewStyle

  /**
   * Custom styles for the title text
   */
  title?: TextStyle

  /**
   * Custom styles for the subtitle text
   */
  subtitle?: TextStyle

  /**
   * Custom styles for the content container
   */
  content?: ViewStyle

  /**
   * Custom styles for the start content container
   */
  startContent?: ViewStyle

  /**
   * Custom styles for the indicator
   */
  indicator?: ViewStyle
}

export type ExpansionPanelItemProps = {
  /**
   * Unique key for the expansion-panel item
   */
  itemKey?: string

  /**
   * Content to display when expansion-panel item is expanded
   */
  children: ReactNode

  /**
   * Title displayed in the expansion-panel header
   */
  title: ReactNode

  /**
   * Optional subtitle displayed below the title
   */
  subtitle?: ReactNode

  /**
   * Content displayed at the start of the header (left side)
   */
  startContent?: ReactNode

  /**
   * Custom indicator for the expanded/collapsed state
   * @default ChevronRight icon
   */
  indicator?: ReactNode

  /**
   * Custom appearance styles for all expansion-panel item parts
   */
  customAppearance?: ExpansionPanelItemCustomAppearance
} & ExpansionPanelItemEvents
