import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type AutocompleteVariant = 'outlined' | 'flat' | 'light' | 'faded' | 'underlined'

export type AutocompleteLabelPlacement =
  | 'inside'
  | 'outside'
  | 'outside-left'
  | 'outside-top'

export type AutocompleteMenuTrigger = 'focus' | 'input' | 'manual'

export type AutocompleteProps = {
  children: ReactNode
  variant?: AutocompleteVariant
  themeColor?: ThemeColor
  size?: Size
  radius?: Radius
  placeholder?: string
  labelPlacement?: AutocompleteLabelPlacement
  label?: ReactNode
  description?: ReactNode
  errorMessage?: ReactNode
  startContent?: ReactNode
  endContent?: ReactNode
  selectorIcon?: ReactNode
  clearIcon?: ReactNode
  maxListboxHeight?: number
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  _isRequired?: boolean
  isReadOnly?: boolean
  isClearable?: boolean
  allowsCustomValue?: boolean
  allowsEmptyCollection?: boolean
  disableAnimation?: boolean
  disableSelectorIconRotation?: boolean
  selectedKey?: string | null
  defaultSelectedKey?: string | null
  inputValue?: string
  defaultInputValue?: string
  disabledKeys?: string[]
  menuTrigger?: AutocompleteMenuTrigger
  style?: ViewStyle
  textStyle?: TextStyle
} & AutocompleteEvents

export type AutocompleteEvents = {
  onClose?: () => void
  onOpenChange?: (isOpen: boolean) => void
  onSelectionChange?: (key: string | null) => void
  onInputChange?: (value: string) => void
  onClear?: () => void
  onFocus?: () => void
  onBlur?: () => void
}

export type AutocompleteItemProps = {
  label: ReactNode
  value: string
  description?: ReactNode
  startContent?: ReactNode
  endContent?: ReactNode
  selectedIcon?: ReactNode
  isDisabled?: boolean
  isSelected?: boolean
  isReadOnly?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
  onSelected?: () => void
}
