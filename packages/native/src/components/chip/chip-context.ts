import { createContext } from 'react'
import type { ChipRadius, ChipSelectMode, ChipSize, ChipVariant } from './chip.type'
import type { ThemeColor } from '../../types'

export type ChipGroupContextValue = {
  variant: ChipVariant
  themeColor: ThemeColor
  size: ChipSize
  radius: ChipRadius
  isDisabled: boolean
  isSelectable: boolean
  selectMode: ChipSelectMode
  selectedValues: string[]
  onToggle: (value: string) => void
}

export const ChipGroupContext = createContext<ChipGroupContextValue | null>(null)
