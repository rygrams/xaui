import type { ReactNode } from 'react'

export type SelectThemeColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'danger'
  | 'warning'
  | 'success'
  | 'default'

export type SelectVariant = 'flat' | 'outlined' | 'faded' | 'underlined' | 'light'

export type SelectSize = 'sm' | 'md' | 'lg'

export type SelectRadius = 'none' | 'sm' | 'md' | 'lg' | 'full'

export type SelectLabelPlacement = 'inside' | 'outside' | 'outside-left' | 'outside-top'

export type SelectSelectionMode = 'single' | 'multiple'

export type SelectProps = {
  children: ReactNode
  selectionMode?: SelectSelectionMode
  selectedKeys?: string[]
  disabledKeys?: string[]
  defaultSelectedKeys?: string[]
  variant?: SelectVariant
  themeColor?: SelectThemeColor
  size?: SelectSize
  radius?: SelectRadius
  placeholder?: string
  labelPlacement?: SelectLabelPlacement
  label?: ReactNode
  hint?: ReactNode
  errorMessage?: ReactNode
  startContent?: ReactNode
  endContent?: ReactNode
  selectorIcon?: ReactNode
  maxListboxHeight?: number
  fullWidth?: boolean
  isOpened?: boolean
  isDisabled?: boolean
  isInvalid?: boolean
} & SelectEvents

export type SelectEvents = {
  onClose?: () => void
  onOpenChange?: (isOpen: boolean) => void
  onSelectionChange?: (keys: string[]) => void
  onClear?: () => void
}

export type SelectItemProps = {
  title: ReactNode
  description?: ReactNode
  startContent?: ReactNode
  endContent?: ReactNode
  selectedIcon?: ReactNode
  isDisabled?: boolean
  isSelected?: boolean
  isReadOnly?: boolean
  onSelected?: () => void
}
