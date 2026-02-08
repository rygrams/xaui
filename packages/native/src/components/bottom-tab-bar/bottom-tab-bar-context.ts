import { createContext, useContext } from 'react'
import type { BottomTabBarSize } from './bottom-tab-bar.type'
import type { ThemeColor } from '../../types'

export type BottomTabBarContextValue = {
  selectedKey?: string
  onSelectionChange?: (key: string) => void
  isDisabled: boolean
  showLabel: boolean
  size: BottomTabBarSize
  themeColor: ThemeColor
  indicatorColor?: string
  activeColor?: string
  inactiveColor?: string
}

export const BottomTabBarContext = createContext<BottomTabBarContextValue | null>(
  null
)

export const useBottomTabBarContext = () => {
  return useContext(BottomTabBarContext)
}
