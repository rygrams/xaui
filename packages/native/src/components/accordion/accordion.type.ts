import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type AccordionVariant = 'light' | 'bordered' | 'splitted'
export type AccordionSelectionMode = 'toggle' | 'multiple'

export type AccordionEvents = {
  onSelectionChange?: (selectedKeys: string[]) => void
}

export type AccordionProps = {
  /**
   * List of AccordionItem components
   */
  children: ReactNode

  /**
   * Visual variant of the accordion
   * @default 'light'
   */
  variant?: AccordionVariant

  /**
   * Selection behavior mode
   * - toggle: Only one accordion item can be expanded at a time
   * - multiple: Multiple accordion items can be expanded simultaneously
   * @default 'toggle'
   */
  selectionMode?: AccordionSelectionMode

  /**
   * Show dividers between accordion items
   * @default false
   */
  showDivider?: boolean

  /**
   * Hide the collapse/expand indicator
   * @default false
   */
  hideIndicator?: boolean

  /**
   * Whether the accordion should take full width
   * @default true
   */
  fullWidth?: boolean

  /**
   * Controlled selected keys
   */
  selectedKeys?: string[]

  /**
   * Default selected keys for uncontrolled mode
   */
  defaultSelectedKeys?: string[]

  /**
   * Keys of disabled accordion items
   */
  disabledKeys?: string[]

  /**
   * Disable animations
   * @default false
   */
  disableAnimation?: boolean

  /**
   * Make the accordion items more compact
   * @default false
   */
  isCompact?: boolean

  /**
   * Custom styles for the container
   */
  containerStyle?: ViewStyle

  /**
   * Custom styles for individual items
   */
  itemStyle?: ViewStyle
} & AccordionEvents
