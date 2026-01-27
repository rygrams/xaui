import { createContext } from 'react'
import type { SelectSize } from './select.type'
import type { ThemeColor } from '../../types'

export type SelectContextValue = {
  size: SelectSize
  themeColor: ThemeColor
  isDisabled: boolean
}

export const SelectContext = createContext<SelectContextValue | null>(null)
