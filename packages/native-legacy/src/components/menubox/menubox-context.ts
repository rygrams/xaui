import { createContext, useContext } from 'react'
import type { MenuBoxProps } from './menubox.type'

export type MenuBoxContextValue = {
  size: NonNullable<MenuBoxProps['size']>
  radius: NonNullable<MenuBoxProps['radius']>
  themeColor: NonNullable<MenuBoxProps['themeColor']>
  backgroundColor: string
  itemCount: number
  spacing: NonNullable<MenuBoxProps['spacing']>
  getItemIndex: (itemKey: string) => number
}

export const MenuBoxContext = createContext<MenuBoxContextValue | null>(null)

export const useMenuBoxContext = () => {
  return useContext(MenuBoxContext)
}
