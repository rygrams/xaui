import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'

export type ExpansionPanelVariant = 'light' | 'bordered' | 'splitted'
export type ExpansionPanelSelectionMode = 'toggle' | 'multiple'

export type ExpansionPanelEvents = {
  onSelectionChange?: (selectedKeys: string[]) => void
}

type ExpansionPanelCustomAppearance = {
  /**
   * Custom styles for the container
   */
  container?: ViewStyle

  /**
   * Custom styles for individual items
   */
  item?: ViewStyle
}

export type ExpansionPanelProps = {
  /**
   * List of ExpansionPanelItem components
   */
  children: ReactNode

  /**
   * Visual variant of the expansion-panel
   * @default 'light'
   */
  variant?: ExpansionPanelVariant

  /**
   * Selection behavior mode
   * - toggle: Only one expansion-panel item can be expanded at a time
   * - multiple: Multiple expansion-panel items can be expanded simultaneously
   * @default 'toggle'
   */
  selectionMode?: ExpansionPanelSelectionMode

  /**
   * Show dividers between expansion-panel items
   * @default false
   */
  showDivider?: boolean

  /**
   * Hide the collapse/expand indicator
   * @default false
   */
  hideIndicator?: boolean

  /**
   * Whether the expansion-panel should take full width
   * @default true
   */
  fullWidth?: boolean

  /**
   * Controlled expanded keys
   */
  expandedKeys?: string[]

  /**
   * Default expanded keys for uncontrolled mode
   * Items with these keys will be expanded by default
   */
  defaultExpandedKeys?: string[]

  /**
   * Keys of disabled expansion-panel items
   */
  disabledKeys?: string[]

  /**
   * Disable animations
   * @default false
   */
  disableAnimation?: boolean

  /**
   * Make the expansion-panel items more compact
   * @default false
   */
  isCompact?: boolean

  /**
   * Custom appearance styles for all expansion-panel parts
   */
  customAppearance?: ExpansionPanelCustomAppearance
} & ExpansionPanelEvents
