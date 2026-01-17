import { createContext } from 'react'
import type { SelectSize, SelectThemeColor } from './select-types'

export type SelectContextValue = {
  size: SelectSize
  themeColor: SelectThemeColor
  isDisabled: boolean
}

export const SelectContext = createContext<SelectContextValue | null>(null)
