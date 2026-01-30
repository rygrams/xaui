import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type SelectVariant = 'outlined' | 'flat' | 'light' | 'faded' | 'underlined'

export type SelectLabelPlacement = 'inside' | 'outside' | 'outside-left' | 'outside-top'
export type SelectSelectionMode = 'single' | 'multiple'

export type SelectProps = {
  /**
   * Select items.
   */
  children: ReactNode
  /**
   * Selection mode for the list.
   * @default 'single'
   */
  selectionMode?: SelectSelectionMode
  /**
   * Controlled selected keys.
   */
  selectedKeys?: string[]
  /**
   * Disabled item keys.
   */
  disabledKeys?: string[]
  /**
   * Default selected keys (uncontrolled).
   */
  defaultSelectedKeys?: string[]
  /**
   * Variant of the select trigger.
   * @default 'flat'
   */
  variant?: SelectVariant
  /**
   * Theme color for the select.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * Size of the select.
   * @default 'md'
   */
  size?: Size
  /**
   * Border radius of the select.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Placeholder for empty value.
   */
  placeholder?: string
  /**
   * Label placement.
   * @default 'outside'
   */
  labelPlacement?: SelectLabelPlacement
  /**
   * Label content.
   */
  label?: ReactNode
  /**
   * Helper text below the select.
   */
  hint?: ReactNode
  /**
   * Error message when invalid.
   */
  errorMessage?: ReactNode
  /**
   * Content before the value.
   */
  startContent?: ReactNode
  /**
   * Content after the value.
   */
  endContent?: ReactNode
  /**
   * Custom selector icon.
   */
  selectorIcon?: ReactNode
  /**
   * Max listbox height.
   * @default 280
   */
  maxListboxHeight?: number
  /**
   * Full width select.
   * @default false
   */
  fullWidth?: boolean
  /**
   * Controlled open state.
   */
  isOpened?: boolean
  /**
   * Disable the select.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Mark as invalid.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Style for the trigger container.
   */
  style?: ViewStyle
  /**
   * Style for the value text.
   */
  textStyle?: TextStyle
} & SelectEvents

export type SelectEvents = {
  /**
   * Fired when the listbox closes.
   */
  onClose?: () => void
  /**
   * Fired when open state changes.
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Fired when selection changes.
   */
  onSelectionChange?: (keys: string[]) => void
  /**
   * Fired when the selection is cleared.
   */
  onClear?: () => void
}

export type SelectItemProps = {
  /**
   * Label for the item.
   */
  label: ReactNode
  /**
   * Unique value for the item.
   */
  value: string
  /**
   * Optional description.
   */
  description?: ReactNode
  /**
   * Content before the label.
   */
  startContent?: ReactNode
  /**
   * Content after the label.
   */
  endContent?: ReactNode
  /**
   * Custom selected icon.
   */
  selectedIcon?: ReactNode
  /**
   * Disable the item.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Select the item.
   * @default false
   */
  isSelected?: boolean
  /**
   * Read-only item.
   * @default false
   */
  isReadOnly?: boolean
  /**
   * Style for the item container.
   */
  style?: ViewStyle
  /**
   * Style for the label text.
   */
  textStyle?: TextStyle
  /**
   * Callback fired when the item is selected.
   */
  onSelected?: () => void
}
