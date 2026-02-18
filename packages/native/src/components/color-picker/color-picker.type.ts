import type { ReactNode } from 'react'
import type { ViewStyle } from 'react-native'
import type { Radius, ThemeColor } from '../../types'
import type {
  InputTriggerLabelPlacement,
  InputTriggerSize,
  InputTriggerVariant,
} from '../input-trigger/input-trigger.type'

export type ColorGroup = {
  /**
   * Display name of the color group.
   */
  name: string
  /**
   * Array of hex color strings.
   */
  colors: string[]
}

export type ColorPickerProps = {
  /**
   * Currently selected color (hex string).
   */
  value?: string
  /**
   * Placeholder text shown when no color is selected.
   * @default 'Pick a color...'
   */
  placeholder?: string
  /**
   * Label displayed above or inside the trigger.
   */
  label?: ReactNode
  /**
   * Position of the label relative to the trigger.
   * @default 'outside'
   */
  labelPlacement?: InputTriggerLabelPlacement
  /**
   * Helper text displayed below the trigger.
   */
  description?: ReactNode
  /**
   * Error message when isInvalid is true.
   */
  errorMessage?: ReactNode
  /**
   * Custom color groups. If not provided, uses the built-in Tailwind palette.
   */
  colorGroups?: ColorGroup[]
  /**
   * Title displayed at the top of the color sheet.
   * @default 'Pick a color'
   */
  sheetTitle?: string
  /**
   * Theme color for selected state highlight and trigger.
   * @default 'primary'
   */
  themeColor?: ThemeColor
  /**
   * Visual variant of the trigger.
   * @default 'flat'
   */
  variant?: InputTriggerVariant
  /**
   * Size of the trigger.
   * @default 'md'
   */
  size?: InputTriggerSize
  /**
   * Border radius.
   * @default 'md'
   */
  radius?: Radius
  /**
   * Controlled open state.
   */
  isOpened?: boolean
  /**
   * Whether the trigger is disabled.
   * @default false
   */
  isDisabled?: boolean
  /**
   * Whether the trigger is in an invalid state.
   * @default false
   */
  isInvalid?: boolean
  /**
   * Whether the trigger takes the full available width.
   * @default true
   */
  fullWidth?: boolean
  /**
   * Custom style for the bottom sheet container.
   */
  sheetStyle?: ViewStyle
  /**
   * Size of each color swatch in the palette.
   * @default 28
   */
  swatchSize?: number
} & ColorPickerEvents

export type ColorPickerEvents = {
  /**
   * Called when the selected color changes.
   *
   * Note: This handler is named `onColorChange` instead of the more generic
   * `onValueChange` (used by other picker components) to emphasize that the
   * value is specifically a color string (e.g. `#RRGGBB`).
   */
  onColorChange?: (color: string) => void
  /**
   * Called when the sheet opens or closes.
   */
  onOpenChange?: (isOpen: boolean) => void
  /**
   * Called when the sheet closes.
   */
  onClose?: () => void
}
