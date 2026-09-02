import { createContext, useContext } from 'react'
import type { ListProps, ListSelectionMode } from './list.type'

export type ListContextValue = {
  selectionMode: ListSelectionMode
  selectedKeys: string[]
  isPressable: boolean
  isSelectable: boolean
  themeColor: NonNullable<ListProps['themeColor']>
  size: NonNullable<ListProps['size']>
  showDivider: boolean
  toggleSelection: (key: string) => void
  isSelected: (key: string) => boolean
}

export const ListContext = createContext<ListContextValue | null>(null)

export const useListContext = () => {
  return useContext(ListContext)
}
