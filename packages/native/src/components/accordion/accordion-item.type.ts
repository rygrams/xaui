import type { ReactNode } from 'react'
import type { ViewStyle, TextStyle } from 'react-native'

export type AccordionItemEvents = {
  onSelected?: (isSelected: boolean) => void
}

export type AccordionItemProps = {
  /**
   * Unique key for the accordion item
   */
  itemKey?: string

  /**
   * Content to display when accordion item is expanded
   */
  children: ReactNode

  /**
   * Title displayed in the accordion header
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
   * Custom styles for the base container
   */
  baseStyle?: ViewStyle

  /**
   * Custom styles for the header container
   */
  headingStyle?: ViewStyle

  /**
   * Custom styles for the trigger button
   */
  triggerStyle?: ViewStyle

  /**
   * Custom styles for the title text
   */
  titleStyle?: TextStyle

  /**
   * Custom styles for the subtitle text
   */
  subtitleStyle?: TextStyle

  /**
   * Custom styles for the content container
   */
  contentStyle?: ViewStyle

  /**
   * Custom styles for the start content container
   */
  startContentStyle?: ViewStyle

  /**
   * Custom styles for the indicator
   */
  indicatorStyle?: ViewStyle
} & AccordionItemEvents
