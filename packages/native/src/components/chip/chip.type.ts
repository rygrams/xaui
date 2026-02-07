import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { ThemeColor } from '../../types'

export type ChipVariant =
  | 'solid'
  | 'bordered'
  | 'light'
  | 'flat'
  | 'faded'
  | 'shadow'
  | 'dot'

export type ChipSize = 'sm' | 'md' | 'lg'
export type ChipRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'
export type ChipSelectMode = 'single' | 'multiple'

type ChipCustomAppearance = {
  /**
   * Custom styles for the chip container
   */
  container?: ViewStyle
  /**
   * Custom styles for the chip text
   */
  text?: TextStyle
  /**
   * Custom styles for the close button
   */
  closeButton?: ViewStyle
  /**
   * Custom styles for the dot indicator
   */
  dot?: ViewStyle
}

export type ChipProps = {
  /**
   * The content to display inside the chip.
   */
  children: ReactNode
  /**
   * The visual variant of the chip.
   * @default 'solid'
   */
  variant?: ChipVariant
  /**
   * The theme color of the chip.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The size of the chip.
   * @default 'md'
   */
  size?: ChipSize
  /**
   * The border radius of the chip.
   * @default 'full'
   */
  radius?: ChipRadius
  /**
   * Avatar or image to display at the start.
   */
  avatar?: ReactNode
  /**
   * Content to display at the start of the chip.
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the chip.
   */
  endContent?: ReactNode
  /**
   * Whether the chip is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom appearance styles for chip parts.
   */
  customAppearance?: ChipCustomAppearance
  /**
   * Callback fired when the close button is pressed.
   * When provided, a close button is rendered.
   */
  onClose?: () => void
  /**
   * Callback fired when the chip is pressed.
   */
  onPress?: () => void
}

export type ChipItemProps = {
  /**
   * Unique key for the chip item within a group.
   */
  value: string
  /**
   * The content to display inside the chip item.
   */
  children: ReactNode
  /**
   * The visual variant of the chip item.
   * Overrides the group variant if set.
   */
  variant?: ChipVariant
  /**
   * The theme color of the chip item.
   * Overrides the group color if set.
   */
  themeColor?: ThemeColor
  /**
   * Avatar or image to display at the start.
   */
  avatar?: ReactNode
  /**
   * Content to display at the start of the chip.
   */
  startContent?: ReactNode
  /**
   * Content to display at the end of the chip.
   */
  endContent?: ReactNode
  /**
   * Whether the chip item is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Custom appearance styles for chip parts.
   */
  customAppearance?: ChipCustomAppearance
}

export type ChipGroupProps = {
  /**
   * ChipItem children.
   */
  children: ReactNode
  /**
   * Whether chips in the group are selectable.
   * @default false
   */
  isSelectable?: boolean
  /**
   * Selection mode when isSelectable is true.
   * @default 'single'
   */
  selectMode?: ChipSelectMode
  /**
   * The visual variant applied to all chips.
   * @default 'solid'
   */
  variant?: ChipVariant
  /**
   * The theme color applied to all chips.
   * @default 'default'
   */
  themeColor?: ThemeColor
  /**
   * The size applied to all chips.
   * @default 'md'
   */
  size?: ChipSize
  /**
   * The border radius applied to all chips.
   * @default 'full'
   */
  radius?: ChipRadius
  /**
   * Whether all chips in the group are disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Controlled selected values.
   */
  selectedValues?: string[]
  /**
   * Default selected values for uncontrolled mode.
   */
  defaultSelectedValues?: string[]
  /**
   * Callback fired when the selection changes.
   */
  onSelectionChange?: (values: string[]) => void
  /**
   * Spacing between chips.
   * @default 8
   */
  spacing?: number
  /**
   * Custom appearance styles for the group container.
   */
  customAppearance?: {
    container?: ViewStyle
  }
}
