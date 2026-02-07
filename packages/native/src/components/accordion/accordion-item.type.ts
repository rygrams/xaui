import type { ReactNode } from 'react'
import type { ViewStyle, TextStyle } from 'react-native'

export type AccordionItemEvents = {
  onSelected?: (isSelected: boolean) => void
}

export type AccordionItemCustomAppearance = {
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
   * Custom appearance styles for all accordion item parts
   */
  customAppearance?: AccordionItemCustomAppearance
} & AccordionItemEvents
