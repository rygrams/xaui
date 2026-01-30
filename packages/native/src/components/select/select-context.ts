import { createContext } from 'react'
import type { Size, ThemeColor } from '../../types'

export type SelectContextValue = {
  size: Size
  themeColor: ThemeColor
  isDisabled: boolean
}

export const SelectContext = createContext<SelectContextValue | null>(null)
