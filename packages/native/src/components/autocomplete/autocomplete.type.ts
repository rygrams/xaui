import type { ReactNode } from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import type { Radius, Size, ThemeColor } from '../../types'

export type AutocompleteVariant =
  | 'outlined'
  | 'flat'
  | 'light'
  | 'faded'
  | 'underlined'

export type AutocompleteLabelPlacement =
  | 'inside'
  | 'outside'
  | 'outside-left'
  | 'outside-top'

export type AutocompleteMenuTrigger = 'focus' | 'input' | 'manual'

type AutocompleteCustomAppearance = {
  /**
   * Custom styles for the container
   */
  container?: ViewStyle

  /**
   * Custom styles for the text
   */
  text?: TextStyle
}

type AutocompleteItemCustomAppearance = {
  /**
   * Custom styles for the container
   */
  container?: ViewStyle

  /**
   * Custom styles for the text
   */
  text?: TextStyle
}

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
  fullWidth?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
  isReadOnly?: boolean
  isClearable?: boolean
  allowsCustomValue?: boolean
  forceSelection?: boolean
  allowsEmptyCollection?: boolean
  disableLocalFilter?: boolean
  disableAnimation?: boolean
  inputValue?: string
  defaultInputValue?: string
  menuTrigger?: AutocompleteMenuTrigger
  customAppearance?: AutocompleteCustomAppearance
} & AutocompletePrivateProps &
  AutocompleteEvents

export type AutocompletePrivateProps = {
  _isRequired?: boolean
}

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
  customAppearance?: AutocompleteItemCustomAppearance
  onSelected?: () => void
}
